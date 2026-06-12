"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CaretLeft,
  Check,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Gift,
  Paperclip,
  X,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { formatByPhone, isValidByPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";

type Option = { id: string; label: string; hint?: string };
type Step = {
  id: string;
  question: string;
  subtitle?: string;
  options: Option[];
};

const steps: Step[] = [
  {
    id: "shape",
    question: "Какая форма кухни вам нужна?",
    subtitle: "Это поможет прикинуть объём работ",
    options: [
      { id: "straight", label: "Прямая", hint: "вдоль одной стены" },
      { id: "corner", label: "Угловая", hint: "Г-образная" },
      { id: "u", label: "П-образная", hint: "вдоль трёх стен" },
      { id: "bar", label: "С барной зоной", hint: "стойка или полуостров" },
    ],
  },
  {
    id: "size",
    question: "Примерная длина кухни?",
    subtitle: "Суммарно по всем стенам, ничего страшного если неточно",
    options: [
      { id: "s", label: "До 3 метров" },
      { id: "m", label: "3 – 4 метра" },
      { id: "l", label: "4 – 6 метров" },
      { id: "xl", label: "Более 6 метров" },
    ],
  },
  {
    id: "facade",
    question: "Из чего фасады?",
    subtitle: "Главное, что влияет и на вид, и на цену",
    options: [
      { id: "ldsp", label: "ЛДСП", hint: "практично, недорого" },
      { id: "mdf_film", label: "МДФ в плёнке", hint: "мат или глянец" },
      { id: "mdf_plastic", label: "МДФ пластик", hint: "прочный, стойкий" },
      { id: "enamel", label: "Крашеная эмаль", hint: "гладкая, премиум" },
      { id: "wood", label: "Шпон или массив", hint: "натуральное дерево" },
    ],
  },
  {
    id: "facadeType",
    question: "Какие фасады по форме?",
    subtitle: "Гладкие, с фрезеровкой или гнутые",
    options: [
      { id: "straight", label: "Прямые", hint: "гладкие, лаконично" },
      { id: "milled", label: "С фрезеровкой", hint: "рельеф, патина" },
      { id: "radius", label: "Радиусные", hint: "гнутые элементы" },
    ],
  },
  {
    id: "counter",
    question: "Какая столешница?",
    subtitle: "От неё зависит прочность и бюджет",
    options: [
      { id: "ldsp", label: "ЛДСП", hint: "базовый вариант" },
      { id: "stone", label: "Искусственный камень", hint: "бесшовно" },
      { id: "quartz", label: "Кварц или камень", hint: "макс. прочность" },
      { id: "wood", label: "Массив дерева", hint: "тёплая фактура" },
    ],
  },
  {
    id: "backsplash",
    question: "Какой фартук?",
    subtitle: "Стеновая панель над рабочей зоной",
    options: [
      { id: "none", label: "Пока без фартука", hint: "решим позже" },
      { id: "tile", label: "Плитка", hint: "классика" },
      { id: "glass", label: "Стеклянный скинали", hint: "с печатью" },
      { id: "stone", label: "Каменная панель", hint: "в цвет столешницы" },
    ],
  },
  {
    id: "handles",
    question: "Как открываются фасады?",
    subtitle: "Тип ручек или открывание без них",
    options: [
      { id: "knobs", label: "Обычные ручки", hint: "классика" },
      { id: "gola", label: "Профиль-gola", hint: "встроенный, без ручек" },
      { id: "push", label: "Push-to-open", hint: "нажал — открылось" },
    ],
  },
  {
    id: "furniture",
    question: "Какая фурнитура?",
    subtitle: "Механизмы выдвижения и доводчики",
    options: [
      { id: "standard", label: "Стандартная", hint: "надёжная база" },
      { id: "blum", label: "Доводчики Blum", hint: "тихо и плавно" },
      { id: "blum_premium", label: "Blum премиум", hint: "сервоприводы" },
    ],
  },
  {
    id: "extras",
    question: "Добавим удобства?",
    subtitle: "Можно выбрать несколько — или пропустить",
    options: [
      { id: "light", label: "Подсветка рабочей зоны", hint: "+ к цене" },
      { id: "storage", label: "Шкафы до потолка", hint: "+ к цене" },
      { id: "cargo", label: "Выдвижные системы", hint: "карго, магик-корнер" },
      { id: "aventos", label: "Подъёмники Aventos", hint: "на верхние шкафы" },
      { id: "sink", label: "Мойка и смеситель", hint: "подберём и встроим" },
    ],
  },
  {
    id: "timing",
    question: "Когда планируете заказ?",
    options: [
      { id: "now", label: "Уже сейчас" },
      { id: "soon", label: "В течение 1–3 месяцев" },
      { id: "later", label: "Позже, изучаю варианты" },
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const nf = new Intl.NumberFormat("ru-RU");

function labelFor(stepId: string, optId?: string): string | null {
  if (!optId) return null;
  const step = steps.find((s) => s.id === stepId);
  return step?.options.find((o) => o.id === optId)?.label ?? null;
}

// Цены — рыночные ориентиры по РБ (2025), BYN за погонный метр
const FACADE_PM: Record<string, number> = {
  ldsp: 900,
  mdf_film: 1260,
  mdf_plastic: 1500,
  enamel: 1860,
  wood: 2220,
};
const COUNTER_ADD: Record<string, number> = {
  ldsp: 0,
  stone: 216,
  quartz: 384,
  wood: 312,
};
// Форма фасадов — множитель к стоимости фасадов
const FACADE_TYPE_MULT: Record<string, number> = {
  straight: 1.0,
  milled: 1.15,
  radius: 1.4,
};
// Фартук / стеновая панель — надбавка за погонный метр
const BACKSPLASH_ADD: Record<string, number> = {
  none: 0,
  tile: 144,
  glass: 312,
  stone: 504,
};
// Ручки / открывание — множитель ко всей кухне
const HANDLES_MULT: Record<string, number> = {
  knobs: 1.0,
  gola: 1.12,
  push: 1.2,
};
// Фурнитура (механизмы, доводчики) — множитель
const FURNITURE_MULT: Record<string, number> = {
  standard: 1.0,
  blum: 1.08,
  blum_premium: 1.18,
};
const EXTRA_ADD: Record<string, number> = {
  light: 108,
  storage: 168,
  cargo: 180,
  aventos: 144,
  sink: 120,
};
const METERS: Record<string, number> = { s: 2.5, m: 3.5, l: 5, xl: 7.5 };
const SHAPE_MULT: Record<string, number> = {
  straight: 1,
  corner: 1.12,
  u: 1.22,
  island: 1.28,
};

function parseExtras(value?: string): string[] {
  if (!value || value === "none") return [];
  return value.split(",").filter(Boolean);
}

function computeEstimate(answers: Record<string, string>) {
  const fpm = FACADE_PM[answers.facade] ?? 1320;
  const ftype = FACADE_TYPE_MULT[answers.facadeType] ?? 1.1;
  const cadd = COUNTER_ADD[answers.counter] ?? 180;
  const badd = BACKSPLASH_ADD[answers.backsplash] ?? 120;
  const hmult = HANDLES_MULT[answers.handles] ?? 1.05;
  const fmult = FURNITURE_MULT[answers.furniture] ?? 1.04;
  const xadd = parseExtras(answers.extras).reduce(
    (s, e) => s + (EXTRA_ADD[e] ?? 0),
    0,
  );
  const m = METERS[answers.size] ?? 3.5;
  const sm = SHAPE_MULT[answers.shape] ?? 1.1;

  const perMeter = (fpm * ftype + cadd + badd + xadd) * hmult * fmult;
  const base = perMeter * m * sm;

  // Коридор широкий в начале и сужается с каждым ответом
  const MAX_SPREAD = 0.45;
  const MIN_SPREAD = 0.08;
  let spread = MAX_SPREAD;
  if (answers.shape) spread -= 0.04;
  if (answers.size) spread -= 0.06;
  if (answers.facade) spread -= 0.05;
  if (answers.facadeType) spread -= 0.03;
  if (answers.counter) spread -= 0.04;
  if (answers.backsplash) spread -= 0.03;
  if (answers.handles) spread -= 0.04;
  if (answers.furniture) spread -= 0.04;
  if (answers.extras) spread -= 0.02;
  if (answers.timing) spread -= 0.02;
  spread = Math.max(spread, MIN_SPREAD);

  const min = Math.round((base * (1 - spread)) / 50) * 50;
  const max = Math.round((base * (1 + spread)) / 50) * 50;
  const precision = Math.round(
    (1 - (spread - MIN_SPREAD) / (MAX_SPREAD - MIN_SPREAD)) * 100,
  );
  return { min, max, spread, precision };
}

// Сохранённая простая версия квиза (бэкап). Не используется на странице,
// пока активен конструктор. Вернуть можно, заменив импорт на главной.
export function QuizSimple() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extrasSel, setExtrasSel] = useState<string[]>([]);

  const totalSteps = steps.length + 1; // + шаг расчёта/контакта
  const isResult = index === steps.length;
  const progress = Math.round(
    ((index + (submitted ? 1 : 0)) / totalSteps) * 100,
  );

  const estimate = computeEstimate(answers);

  const summary = steps
    .flatMap((s) => {
      if (s.id === "extras") {
        return parseExtras(answers.extras).map((id) => labelFor("extras", id));
      }
      return [labelFor(s.id, answers[s.id])];
    })
    .filter(Boolean) as string[];

  const select = (stepId: string, optionId: string) => {
    setAnswers((a) => ({ ...a, [stepId]: optionId }));
    window.setTimeout(() => setIndex((i) => i + 1), reduce ? 0 : 180);
  };

  // Мультивыбор «доп. опции» — обновляем цену сразу при переключении
  const toggleExtra = (id: string) => {
    const next = extrasSel.includes(id)
      ? extrasSel.filter((x) => x !== id)
      : [...extrasSel, id];
    setExtrasSel(next);
    setAnswers((a) => ({ ...a, extras: next.length ? next.join(",") : "none" }));
  };

  const continueExtras = () => {
    setAnswers((a) => ({ ...a, extras: a.extras || "none" }));
    setIndex((i) => i + 1);
  };

  const back = () => setIndex((i) => Math.max(0, i - 1));

  const canSubmit = isValidByPhone(phone) && !sending;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSending(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("source", "Квиз-калькулятор");
      fd.append("details", summary.join(" · "));
      fd.append(
        "estimate",
        `${nf.format(estimate.min)} – ${nf.format(estimate.max)} BYN`,
      );
      if (file) fd.append("file", file);

      const res = await fetch("/api/lead", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="quiz" className="scroll-mt-24 bg-sand py-20 sm:py-28">
      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-paper shadow-lift lg:grid-cols-[0.82fr_1.18fr]">
          {/* Левая панель */}
          <aside className="relative hidden flex-col justify-between bg-espresso p-8 text-cream lg:flex">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-clay/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-clay">
                Калькулятор
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-cream">
                Узнайте стоимость вашей кухни
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">
                Несколько коротких вопросов — цена видна сразу и уточняется
                с каждым ответом.
              </p>

              {/* Живой диапазон цены в тёмном сайдбаре */}
              <div className="mt-7 rounded-2xl bg-espresso-2 p-5 ring-1 ring-cream/10">
                <div className="flex items-center justify-between text-xs text-cream/50">
                  <span className="uppercase tracking-wider">Ориентировочно</span>
                  <span>точность {estimate.precision}%</span>
                </div>
                <p className="mt-1.5 font-display text-3xl font-extrabold leading-none text-cream">
                  {nf.format(estimate.min)} – {nf.format(estimate.max)}
                  <span className="ml-1 text-xl text-cream/55">BYN</span>
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream/15">
                  <motion.div
                    className="h-full rounded-full bg-clay"
                    initial={false}
                    animate={{ width: `${estimate.precision}%` }}
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                </div>
                <p className="mt-2.5 text-xs text-cream/50">
                  Диапазон сужается с каждым ответом. Расчёт ориентировочный и
                  не является публичной офертой.
                </p>
              </div>
            </div>

            <ul className="mt-8 flex flex-col gap-4">
              {[
                { icon: Clock, text: "Займёт меньше минуты" },
                { icon: ShieldCheck, text: "Бесплатно и ни к чему не обязывает" },
                { icon: Gift, text: "Покажем актуальные акции" },
              ].map((b) => (
                <li key={b.text} className="flex items-center gap-3 text-sm">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cream/10 text-clay">
                    <b.icon weight="duotone" className="h-5 w-5" />
                  </span>
                  <span className="text-cream/80">{b.text}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Правая панель */}
          <div className="flex min-h-[32rem] flex-col p-6 sm:p-10">
            {/* Прогресс */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted">
                <span>
                  {submitted
                    ? "Готово"
                    : `Шаг ${Math.min(index + 1, totalSteps)} из ${totalSteps}`}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-stone">
                <motion.div
                  className="h-full rounded-full bg-clay"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </div>
            </div>

            {/* Живой диапазон цены на мобильном (на десктопе — в сайдбаре) */}
            {!submitted && !isResult && (
              <div className="mb-7 rounded-2xl bg-espresso p-5 text-cream lg:hidden">
                <div className="flex items-center justify-between text-xs text-cream/55">
                  <span className="uppercase tracking-wider">Ориентировочно</span>
                  <span>точность {estimate.precision}%</span>
                </div>
                <p className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
                  {nf.format(estimate.min)} – {nf.format(estimate.max)}{" "}
                  <span className="text-cream/55">BYN</span>
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cream/15">
                  <motion.div
                    className="h-full rounded-full bg-clay"
                    initial={false}
                    animate={{ width: `${estimate.precision}%` }}
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                </div>
                <p className="mt-2 text-xs text-cream/55">
                  Диапазон сужается с каждым ответом. Не оферта.
                </p>
              </div>
            )}

            <div className="relative flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <StepWrapper key="done" reduce={reduce}>
                    <Success name={name} estimate={estimate} />
                  </StepWrapper>
                ) : isResult ? (
                  <StepWrapper key="result" reduce={reduce}>
                    <h3 className="font-display text-2xl font-extrabold text-ink">
                      Ваш предварительный расчёт
                    </h3>

                    {/* Вилка цены */}
                    <div className="mt-4 rounded-2xl bg-espresso p-5 text-cream">
                      <p className="text-xs uppercase tracking-wider text-cream/55">
                        Ориентировочная стоимость
                      </p>
                      <p className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
                        {nf.format(estimate.min)} – {nf.format(estimate.max)}{" "}
                        <span className="text-cream/60">BYN</span>
                      </p>
                      <p className="mt-1.5 text-xs text-cream/55">
                        Точную цену зафиксируем бесплатно после замера. Расчёт
                        не является публичной офертой.
                      </p>
                    </div>

                    {/* Резюме выбора */}
                    {summary.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {summary.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Контакты */}
                    <form onSubmit={submit} className="mt-6 flex flex-col">
                      <p className="text-sm text-muted">
                        Оставьте контакты — пришлём детальный расчёт и 3D-проект,
                        перезвоним в течение 15 минут.
                      </p>
                      <div className="mt-4 flex flex-col gap-4">
                        <Field
                          label="Как вас зовут?"
                          value={name}
                          onChange={setName}
                          placeholder="Имя"
                          type="text"
                        />
                        <Field
                          label="Телефон"
                          value={phone}
                          onChange={(v) => setPhone(formatByPhone(v))}
                          placeholder="+375 (__) ___-__-__"
                          type="tel"
                          required
                          inputMode="tel"
                        />
                        <FileField file={file} onChange={setFile} />
                      </div>

                      {error && (
                        <p className="mt-3 text-sm text-clay-dark">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="mt-6 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 font-display font-semibold text-white shadow-soft transition-all hover:bg-clay-dark hover:gap-3 disabled:pointer-events-none disabled:opacity-40"
                      >
                        {sending ? "Отправляем…" : "Получить точный расчёт"}
                        {!sending && <ArrowRight weight="bold" className="h-5 w-5" />}
                      </button>

                      <p className="mt-4 text-xs leading-relaxed text-muted">
                        Нажимая кнопку, вы соглашаетесь с{" "}
                        <Link
                          href="/privacy"
                          className="underline underline-offset-2 hover:text-clay-dark"
                        >
                          политикой обработки персональных данных
                        </Link>
                        .
                      </p>
                    </form>
                  </StepWrapper>
                ) : steps[index].id === "extras" ? (
                  <StepWrapper key="extras" reduce={reduce}>
                    <ExtrasStep
                      step={steps[index]}
                      selected={extrasSel}
                      onToggle={toggleExtra}
                      onContinue={continueExtras}
                    />
                  </StepWrapper>
                ) : (
                  <StepWrapper key={steps[index].id} reduce={reduce}>
                    <StepContent
                      step={steps[index]}
                      selected={answers[steps[index].id]}
                      onSelect={(opt) => select(steps[index].id, opt)}
                    />
                  </StepWrapper>
                )}
              </AnimatePresence>
            </div>

            {/* Назад */}
            {index > 0 && !submitted && (
              <button
                type="button"
                onClick={back}
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                <CaretLeft weight="bold" className="h-4 w-4" />
                Назад
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepWrapper({
  children,
  reduce,
}: {
  children: React.ReactNode;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ExtrasStep({
  step,
  selected,
  onToggle,
  onContinue,
}: {
  step: Step;
  selected: string[];
  onToggle: (optionId: string) => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <h3 className="font-display text-2xl font-extrabold leading-tight text-ink">
        {step.question}
      </h3>
      {step.subtitle && (
        <p className="mt-2 text-sm text-muted">{step.subtitle}</p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {step.options.map((opt) => {
          const active = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id)}
              className={cn(
                "flex items-center justify-between gap-2 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.99]",
                active
                  ? "border-clay bg-clay-soft"
                  : "border-stone bg-paper hover:border-clay/40 hover:bg-sand/60 dark:border-transparent",
              )}
            >
              <span>
                <span className="block font-display font-semibold text-ink">
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
                  "grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors",
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

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-espresso px-7 font-display font-semibold text-cream transition-all hover:bg-[#332e28] hover:gap-3"
      >
        {selected.length > 0 ? "Далее" : "Пропустить"}
        <ArrowRight weight="bold" className="h-5 w-5" />
      </button>
    </div>
  );
}

function StepContent({
  step,
  selected,
  onSelect,
}: {
  step: Step;
  selected?: string;
  onSelect: (optionId: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-2xl font-extrabold leading-tight text-ink">
        {step.question}
      </h3>
      {step.subtitle && (
        <p className="mt-2 text-sm text-muted">{step.subtitle}</p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3">
        {step.options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={cn(
                "group flex items-center justify-between gap-2 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.98]",
                active
                  ? "border-clay bg-clay-soft"
                  : "border-stone bg-paper hover:border-clay/40 hover:bg-sand/60 dark:border-transparent",
              )}
            >
              <span>
                <span className="block font-display font-semibold text-ink">
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
                    : "border-stone text-transparent group-hover:border-clay/50",
                )}
              >
                <Check weight="bold" className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
  required,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
  required?: boolean;
  inputMode?: "tel" | "text";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-clay-dark"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-stone bg-paper px-4 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-clay"
      />
    </label>
  );
}

function FileField({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  return (
    <div>
      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-clay/30 bg-clay-soft px-4 py-3">
          <span className="flex min-w-0 items-center gap-2 text-sm text-ink">
            <Paperclip weight="bold" className="h-4 w-4 shrink-0 text-clay-dark" />
            <span className="truncate">{file.name}</span>
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Убрать файл"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
          >
            <X weight="bold" className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-stone bg-paper px-4 py-3 text-sm text-muted transition-colors hover:border-clay/40 hover:text-ink">
          <Paperclip weight="bold" className="h-4 w-4 text-clay" />
          Прикрепить план или фото кухни (необязательно)
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
    </div>
  );
}

function Success({
  name,
  estimate,
}: {
  name: string;
  estimate: { min: number; max: number };
}) {
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-clay-soft text-clay">
        <CheckCircle weight="fill" className="h-9 w-9" />
      </span>
      <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
        Заявка принята{name ? `, ${name}` : ""}!
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Предварительно ваша кухня обойдётся в{" "}
        <span className="font-semibold text-ink">
          {nf.format(estimate.min)} – {nf.format(estimate.max)} BYN
        </span>
        . Дизайнер перезвонит в течение 15 минут и подготовит точный расчёт.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="#gallery"
          className="inline-flex h-12 items-center justify-center rounded-full bg-espresso px-6 font-display font-semibold text-cream transition-colors hover:bg-[#332e28]"
        >
          Смотреть работы
        </a>
        <a
          href={site.messengers.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full border border-stone px-6 font-display font-semibold text-ink transition-colors hover:border-clay hover:text-clay"
        >
          Написать в Telegram
        </a>
      </div>
    </div>
  );
}
