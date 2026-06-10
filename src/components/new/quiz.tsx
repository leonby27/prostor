"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CaretLeft,
  Check,
  CheckCircle,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { SectionTitleNew } from "./section-title";
import { site } from "@/lib/site";
import { formatByPhone, isValidByPhone } from "@/lib/phone";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/* ============================================================
   Квиз v2 — «соберите кухню за шесть ответов».
   Собственная версия для тёмного издательского лендинга:
   крупный тип, живая цена с накруткой, резюме-фраза,
   короче и быстрее квиза основной версии.
   ============================================================ */

type Option = {
  id: string;
  label: string;
  hint?: string;
  /** Слово для резюме-фразы («угловая», «с фасадами из эмали»…) */
  phrase?: string;
};

type QStep = {
  id: string;
  /** Короткая тема шага для рельсы прогресса */
  topic: string;
  question: string;
  multi?: boolean;
  options: Option[];
};

const QUIZ: QStep[] = [
  {
    id: "shape",
    topic: "форма",
    question: "Какой формы будет кухня?",
    options: [
      { id: "straight", label: "Прямая", hint: "вдоль одной стены", phrase: "прямая" },
      { id: "corner", label: "Угловая", hint: "Г-образная", phrase: "угловая" },
      { id: "u", label: "П-образная", hint: "вдоль трёх стен", phrase: "П-образная" },
      { id: "island", label: "С островом", hint: "отдельная зона", phrase: "с островом" },
    ],
  },
  {
    id: "size",
    topic: "длина",
    question: "Сколько примерно метров?",
    options: [
      { id: "s", label: "До 3 м", phrase: "до 3 метров" },
      { id: "m", label: "3–4 м", phrase: "3–4 метра" },
      { id: "l", label: "4–6 м", phrase: "4–6 метров" },
      { id: "xl", label: "Больше 6 м", phrase: "больше 6 метров" },
    ],
  },
  {
    id: "facade",
    topic: "фасады",
    question: "Из чего сделать фасады?",
    options: [
      { id: "ldsp", label: "ЛДСП", hint: "практично и недорого", phrase: "фасады ЛДСП" },
      { id: "film", label: "МДФ в плёнке", hint: "мат или глянец", phrase: "фасады МДФ" },
      { id: "enamel", label: "Эмаль", hint: "гладкая, премиум", phrase: "фасады в эмали" },
      { id: "wood", label: "Шпон и массив", hint: "натуральное дерево", phrase: "фасады из дерева" },
    ],
  },
  {
    id: "counter",
    topic: "столешница",
    question: "Какая столешница?",
    options: [
      { id: "ldsp", label: "ЛДСП", hint: "базовый вариант", phrase: "столешница ЛДСП" },
      { id: "stone", label: "Искусственный камень", hint: "бесшовные стыки", phrase: "столешница из камня" },
      { id: "quartz", label: "Кварц", hint: "максимальная прочность", phrase: "кварцевая столешница" },
      { id: "wood", label: "Массив дерева", hint: "тёплая фактура", phrase: "деревянная столешница" },
    ],
  },
  {
    id: "extras",
    topic: "удобства",
    question: "Что добавить для удобства?",
    multi: true,
    options: [
      { id: "light", label: "Подсветка рабочей зоны", phrase: "подсветка" },
      { id: "tall", label: "Шкафы до потолка", phrase: "шкафы до потолка" },
      { id: "cargo", label: "Выдвижные системы", hint: "карго, магик-корнер", phrase: "выдвижные системы" },
      { id: "sink", label: "Мойка и смеситель", phrase: "мойка в комплекте" },
      { id: "tech", label: "Встроенная техника", phrase: "встроенная техника" },
    ],
  },
  {
    id: "timing",
    topic: "сроки",
    question: "Когда планируете заказывать?",
    options: [
      { id: "now", label: "Уже сейчас" },
      { id: "soon", label: "В течение пары месяцев" },
      { id: "later", label: "Пока присматриваюсь" },
    ],
  },
];

/* --- Цена: те же рыночные ориентиры (BYN/м.п.), модель своя --- */

const FACADE_PM: Record<string, number> = {
  ldsp: 900,
  film: 1280,
  enamel: 1860,
  wood: 2200,
};
const COUNTER_ADD: Record<string, number> = {
  ldsp: 0,
  stone: 220,
  quartz: 380,
  wood: 310,
};
const EXTRA_ADD: Record<string, number> = {
  light: 110,
  tall: 170,
  cargo: 180,
  sink: 120,
  tech: 420,
};
const METERS: Record<string, number> = { s: 2.5, m: 3.5, l: 5, xl: 7 };
const SHAPE_MULT: Record<string, number> = {
  straight: 1,
  corner: 1.12,
  u: 1.22,
  island: 1.3,
};

const nf = new Intl.NumberFormat("ru-RU");

type Answers = Record<string, string[]>;

function computeEstimate(answers: Answers) {
  const one = (id: string) => answers[id]?.[0];
  const perMeter =
    (FACADE_PM[one("facade") ?? ""] ?? 1300) +
    (COUNTER_ADD[one("counter") ?? ""] ?? 180) +
    (answers.extras ?? []).reduce((s, e) => s + (EXTRA_ADD[e] ?? 0), 0);
  const base =
    perMeter * (METERS[one("size") ?? ""] ?? 3.5) * (SHAPE_MULT[one("shape") ?? ""] ?? 1.1);

  // Вилка: широкая в начале, сужается с ответами
  const answered = QUIZ.filter((s) => answers[s.id]?.length).length;
  const spread = Math.max(0.4 - answered * 0.055, 0.1);
  const round = (n: number) => Math.round(n / 50) * 50;
  return {
    min: round(base * (1 - spread)),
    max: round(base * (1 + spread)),
    precision: Math.round((1 - (spread - 0.1) / 0.3) * 100),
  };
}

/** Резюме-фраза: «Угловая кухня · 3–4 метра · фасады МДФ · подсветка» */
function buildPhrase(answers: Answers): string[] {
  return QUIZ.flatMap((s) =>
    (answers[s.id] ?? []).flatMap((id) => {
      const p = s.options.find((o) => o.id === id)?.phrase;
      return p ? [p] : [];
    }),
  );
}

/* --- Живая цена: цифры накручиваются GSAP-твином при изменении --- */

function LivePrice({ min, max }: { min: number; max: number }) {
  const minRef = useRef<HTMLSpanElement>(null);
  const maxRef = useRef<HTMLSpanElement>(null);
  const shown = useRef({ min, max });

  useEffect(() => {
    const apply = () => {
      if (minRef.current)
        minRef.current.textContent = nf.format(Math.round(shown.current.min));
      if (maxRef.current)
        maxRef.current.textContent = nf.format(Math.round(shown.current.max));
    };
    if (prefersReducedMotion()) {
      shown.current = { min, max };
      apply();
      return;
    }
    const tween = gsap.to(shown.current, {
      min,
      max,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: apply,
    });
    return () => {
      tween.kill();
    };
  }, [min, max]);

  return (
    <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
      <span ref={minRef}>{nf.format(min)}</span>
      <span className="text-muted"> – </span>
      <span ref={maxRef}>{nf.format(max)}</span>
      <span className="ml-2 text-xl text-muted">BYN</span>
    </p>
  );
}

/* --- Панель цены (sticky на десктопе) --- */

function PricePanel({
  answers,
  compact,
}: {
  answers: Answers;
  compact?: boolean;
}) {
  const est = computeEstimate(answers);
  const phrase = buildPhrase(answers);

  return (
    <div
      className={cn(
        "rounded-2xl border border-stone bg-sand p-6 sm:p-7",
        !compact && "lg:sticky lg:top-24",
      )}
    >
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        <span>Ориентировочно</span>
        <span className="text-clay">точность {est.precision}%</span>
      </div>
      <div className="mt-3">
        <LivePrice min={est.min} max={est.max} />
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-stone">
        <div
          className="h-full rounded-full bg-clay transition-all duration-500"
          style={{ width: `${est.precision}%` }}
        />
      </div>

      <p className="mt-5 min-h-[3lh] text-sm leading-relaxed text-muted">
        {phrase.length === 0 ? (
          "Отвечайте — здесь будет собираться ваша кухня."
        ) : (
          <>
            Ваша кухня:{" "}
            {phrase.map((p, i) => (
              <span key={p}>
                <span className="font-medium text-ink">{p}</span>
                {i < phrase.length - 1 && <span className="text-clay"> · </span>}
              </span>
            ))}
          </>
        )}
      </p>

      <p className="mt-4 border-t border-stone pt-4 text-xs leading-relaxed text-muted/80">
        Вилка сужается с каждым ответом. Точную цену зафиксируем после
        бесплатного замера — расчёт не является публичной офертой.
      </p>
    </div>
  );
}

/* --- Сам квиз --- */

const EASE = [0.22, 1, 0.36, 1] as const;

export function QuizNew() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isResult = index === QUIZ.length;
  const step = QUIZ[index];
  const est = computeEstimate(answers);

  const pick = (optId: string) => {
    if (step.multi) {
      setAnswers((a) => {
        const cur = a[step.id] ?? [];
        const next = cur.includes(optId)
          ? cur.filter((x) => x !== optId)
          : [...cur, optId];
        return { ...a, [step.id]: next };
      });
      return;
    }
    setAnswers((a) => ({ ...a, [step.id]: [optId] }));
    window.setTimeout(() => setIndex((i) => i + 1), reduce ? 0 : 200);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidByPhone(phone)) {
      setError("Проверьте номер — нужен белорусский формат +375");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          source: "Квиз (версия new)",
          details: buildPhrase(answers).join(" · "),
          estimate: `${nf.format(est.min)} – ${nf.format(est.max)} BYN`,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Не получилось отправить. Позвоните нам или напишите в Telegram.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="quiz" className="scroll-mt-20 pt-24 sm:pt-32">
      <SectionTitleNew
        num="03"
        eyebrow="Расчёт за минуту"
        title="Соберите кухню за шесть ответов"
      />

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        {/* Рельса прогресса: темы шагов */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-stone pb-5">
          {QUIZ.map((s, i) => {
            const done = (answers[s.id]?.length ?? 0) > 0;
            const active = i === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => i <= index && setIndex(i)}
                disabled={i > index}
                className={cn(
                  "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                  active ? "text-clay" : done ? "text-ink" : "text-muted/60",
                  i <= index && !active && "hover:text-clay",
                )}
              >
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-full border text-[10px]",
                    done
                      ? "border-clay bg-clay text-white"
                      : active
                        ? "border-clay text-clay"
                        : "border-stone",
                  )}
                >
                  {done ? <Check weight="bold" className="h-3 w-3" /> : i + 1}
                </span>
                {s.topic}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-16">
          {/* Вопрос */}
          <div className="min-h-[24rem]">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="done"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-clay-soft text-clay">
                    <CheckCircle weight="fill" className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold text-ink sm:text-4xl">
                    Расчёт у дизайнера{name ? `, ${name}` : ""}!
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">
                    Перезвоним в рабочее время, уточним детали и предложим
                    время бесплатного замера. А пока можно посмотреть{" "}
                    <a href="#works" className="font-semibold text-clay underline-offset-4 hover:underline">
                      наши работы
                    </a>
                    .
                  </p>
                  <a
                    href={site.messengers.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-stone px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-clay/50 hover:text-clay"
                  >
                    Написать в Telegram
                    <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                  </a>
                </motion.div>
              ) : isResult ? (
                <motion.form
                  key="contact"
                  onSubmit={submit}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                    последний шаг
                  </p>
                  <h3 className="mt-4 max-w-lg font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                    Куда прислать точный расчёт и 3D-проект?
                  </h3>
                  <div className="mt-8 flex max-w-md flex-col gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как вас зовут"
                      autoComplete="name"
                      className="h-14 rounded-full border border-stone bg-sand px-6 text-ink placeholder:text-muted/60 focus:border-clay focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatByPhone(e.target.value))}
                      placeholder="+375 (29) 000-00-00"
                      autoComplete="tel"
                      inputMode="tel"
                      className="h-14 rounded-full border border-stone bg-sand px-6 text-ink placeholder:text-muted/60 focus:border-clay focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-clay font-semibold text-white transition-colors hover:bg-clay-dark disabled:opacity-60"
                    >
                      {sending ? "Отправляем…" : "Получить точный расчёт"}
                      <ArrowRight weight="bold" className="h-5 w-5" />
                    </button>
                  </div>
                  {error && <p className="mt-3 text-sm text-clay">{error}</p>}
                  <p className="mt-5 max-w-md text-xs leading-relaxed text-muted">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2 hover:text-clay"
                    >
                      политикой обработки персональных данных
                    </Link>
                    .
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key={step.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    вопрос {index + 1} из {QUIZ.length}
                  </p>
                  <h3 className="mt-4 max-w-lg font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                    {step.question}
                  </h3>
                  {step.multi && (
                    <p className="mt-2 text-sm text-muted">
                      Можно несколько — или пропустить
                    </p>
                  )}

                  <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                    {step.options.map((opt) => {
                      const active = (answers[step.id] ?? []).includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => pick(opt.id)}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-2xl border p-5 text-left transition-all duration-200 active:scale-[0.98]",
                            active
                              ? "border-clay bg-clay-soft"
                              : "border-stone bg-sand hover:border-clay/40",
                          )}
                        >
                          <span>
                            <span className="block font-display font-bold text-ink">
                              {opt.label}
                            </span>
                            {opt.hint && (
                              <span className="mt-0.5 block text-xs text-muted">
                                {opt.hint}
                              </span>
                            )}
                          </span>
                          <span
                            className={cn(
                              "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                              active
                                ? "border-clay bg-clay text-white"
                                : "border-stone text-transparent",
                            )}
                          >
                            <Check weight="bold" className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex items-center gap-5">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => setIndex((i) => i - 1)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
                      >
                        <CaretLeft weight="bold" className="h-4 w-4" />
                        Назад
                      </button>
                    )}
                    {step.multi && (
                      <button
                        type="button"
                        onClick={() => setIndex((i) => i + 1)}
                        className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-espresso-2"
                      >
                        {(answers[step.id]?.length ?? 0) > 0
                          ? "Дальше"
                          : "Пропустить"}
                        <ArrowRight weight="bold" className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Живая цена */}
          <div>
            <PricePanel answers={answers} />
          </div>
        </div>
      </div>
    </section>
  );
}
