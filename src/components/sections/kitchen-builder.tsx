"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  X,
  ArrowRight,
  CheckCircle,
  ArrowsOutLineHorizontal,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IsoKitchen } from "@/components/kitchen/iso-kitchen";
import { formatByPhone, isValidByPhone } from "@/lib/phone";
import {
  MODULE_TYPES,
  FACADES,
  COUNTERS,
  HARDWARE,
  DEFAULT_KITCHEN,
  LAYOUT_PRESETS,
  priceRange,
  moduleType,
  moduleAddCost,
  facadeById,
  counterById,
  hardwareById,
  type KitchenState,
  type ModuleKind,
} from "@/lib/kitchen";
import { cn } from "@/lib/utils";

const nf = new Intl.NumberFormat("ru-RU");
const WIDTHS = [45, 60, 90];
const MAX_MODULES = 9;

export function KitchenBuilder() {
  const uid = useRef(100);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [k, setK] = useState<KitchenState>(DEFAULT_KITCHEN);
  const [highlight, setHighlight] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flash = (id: string) => {
    setHighlight(id);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setHighlight(null), 1100);
  };

  const applyPreset = (kinds: ModuleKind[], wall: boolean) => {
    setK((s) => ({
      ...s,
      wall,
      modules: kinds.map((kind) => ({
        uid: `u${uid.current++}`,
        kind,
        width: 60,
      })),
    }));
    setHighlight(null);
  };

  const pr = priceRange(k);
  // точность: 0 (широкий коридор) .. 1 (узкий)
  const precision = Math.min(
    1,
    Math.max(0, (0.34 - pr.spread) / (0.34 - 0.08)),
  );

  const addModule = (kind: ModuleKind) =>
    setK((s) => {
      if (s.modules.length >= MAX_MODULES) return s;
      const id = `u${uid.current++}`;
      flash(id);
      return { ...s, modules: [...s.modules, { uid: id, kind, width: 60 }] };
    });

  const removeModule = (id: string) =>
    setK((s) => ({ ...s, modules: s.modules.filter((m) => m.uid !== id) }));

  const cycleWidth = (id: string) => {
    flash(id);
    setK((s) => ({
      ...s,
      modules: s.modules.map((m) =>
        m.uid === id
          ? {
              ...m,
              width: WIDTHS[(WIDTHS.indexOf(m.width) + 1) % WIDTHS.length],
            }
          : m,
      ),
    }));
  };

  const setFacade = (id: string) =>
    setK((s) => ({ ...s, facadeId: id, decided: { ...s.decided, facade: true } }));
  const setCounter = (id: string) =>
    setK((s) => ({ ...s, counterId: id, decided: { ...s.decided, counter: true } }));
  const setHardware = (id: string) =>
    setK((s) => ({ ...s, hardwareId: id, decided: { ...s.decided, hardware: true } }));
  const toggleWall = () =>
    setK((s) => ({ ...s, wall: !s.wall, decided: { ...s.decided, wall: true } }));

  const canSubmit = isValidByPhone(phone) && !sending && k.modules.length > 0;

  const summary = () => {
    const mods = k.modules
      .map((m) => `${moduleType(m.kind).label} ${m.width}`)
      .join(", ");
    return [
      `Модули: ${mods || "—"}`,
      `Фасад: ${facadeById(k.facadeId).name}`,
      `Столешница: ${counterById(k.counterId).name}`,
      `Фурнитура: ${hardwareById(k.hardwareId).name}`,
      `Верхние шкафы: ${k.wall ? "да" : "нет"}`,
    ].join(" · ");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      if (k.modules.length === 0) setError("Добавьте хотя бы один модуль");
      else setError("Введите корректный номер телефона");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("source", "Конструктор кухни");
      fd.append("details", summary());
      fd.append("estimate", `${nf.format(pr.min)} – ${nf.format(pr.max)} BYN`);
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="quiz" className="scroll-mt-24 bg-sand py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Конструктор"
          title="Соберите свою кухню и узнайте цену"
          subtitle="Добавляйте модули, выбирайте материалы и фурнитуру — стоимость пересчитывается вживую, а диапазон сужается с каждой деталью."
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {/* Сцена + цена */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-3xl border border-stone bg-gradient-to-b from-white to-sand p-3 shadow-soft">
              <div className="aspect-[16/11] w-full">
                <IsoKitchen state={k} highlightUid={highlight ?? undefined} />
              </div>
              {k.modules.length === 0 && (
                <p className="absolute inset-0 grid place-items-center text-sm text-muted">
                  Добавьте модули справа →
                </p>
              )}
            </div>

            {/* Цена */}
            <div className="rounded-3xl bg-espresso p-6 text-cream sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-cream/55">
                  Ориентировочная стоимость
                </span>
                <span className="text-xs text-cream/55">
                  точность {Math.round(precision * 100)}%
                </span>
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                {pr.empty ? (
                  <span className="text-cream/50">— </span>
                ) : (
                  <>
                    {nf.format(pr.min)} – {nf.format(pr.max)}
                  </>
                )}{" "}
                <span className="text-cream/55">BYN</span>
              </p>
              {/* Полоса точности */}
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream/15">
                <motion.div
                  className="h-full rounded-full bg-clay"
                  initial={false}
                  animate={{ width: `${Math.round(precision * 100)}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-2 text-xs text-cream/55">
                Чем больше деталей — тем точнее расчёт. Финальную цену зафиксируем
                после бесплатного замера.
              </p>
            </div>
          </div>

          {/* Управление */}
          <div className="flex flex-col gap-6 rounded-3xl border border-stone bg-paper p-6 sm:p-7">
            {/* Пресеты */}
            <Control title="Раскладка" hint="быстрый старт">
              <div className="flex flex-wrap gap-2">
                {LAYOUT_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.kinds, p.wall)}
                    className="rounded-xl border border-stone bg-paper px-4 py-2 text-sm font-medium text-ink transition-all hover:border-clay/40 hover:bg-sand/60 active:scale-[0.98]"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </Control>

            {/* Модули */}
            <Control title="Модули" hint={`${k.modules.length}/${MAX_MODULES}`}>
              {k.modules.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {k.modules.map((m) => (
                    <span
                      key={m.uid}
                      className="inline-flex items-center gap-1.5 rounded-full border border-stone bg-sand/60 py-1 pl-3 pr-1 text-xs"
                    >
                      <span className="font-medium text-ink">
                        {moduleType(m.kind).label}
                      </span>
                      {moduleType(m.kind).resizable ? (
                        <button
                          type="button"
                          onClick={() => cycleWidth(m.uid)}
                          className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-muted ring-1 ring-stone transition-colors hover:text-clay"
                          title="Изменить ширину"
                        >
                          <ArrowsOutLineHorizontal className="h-3 w-3" />
                          {m.width}
                        </button>
                      ) : (
                        <span className="rounded-full bg-paper px-2 py-0.5 text-muted ring-1 ring-stone">
                          {m.width}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeModule(m.uid)}
                        aria-label="Удалить модуль"
                        className="grid h-5 w-5 place-items-center rounded-full text-muted transition-colors hover:bg-clay-soft hover:text-clay-dark"
                      >
                        <X weight="bold" className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {MODULE_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => addModule(t.id)}
                    disabled={k.modules.length >= MAX_MODULES}
                    className="flex flex-col items-start gap-0.5 rounded-xl border border-stone bg-paper px-3 py-2.5 text-left transition-all hover:border-clay/40 hover:bg-sand/60 active:scale-[0.98] disabled:opacity-40"
                  >
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                      <Plus weight="bold" className="h-3.5 w-3.5 text-clay" />
                      {t.label}
                    </span>
                    <span className="pl-5 text-xs text-muted">
                      +{nf.format(moduleAddCost(k, t.id))} BYN
                    </span>
                  </button>
                ))}
              </div>
            </Control>

            {/* Фасад */}
            <Control title="Фасад" hint={facadeById(k.facadeId).name}>
              <div className="flex flex-wrap gap-2.5">
                {FACADES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFacade(f.id)}
                    title={f.name}
                    aria-label={f.name}
                    className={cn(
                      "h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-paper transition-all",
                      k.facadeId === f.id
                        ? "ring-clay scale-110"
                        : "ring-stone hover:ring-clay/40",
                    )}
                    style={{ background: f.color }}
                  />
                ))}
              </div>
            </Control>

            {/* Столешница */}
            <Control title="Столешница" hint={counterById(k.counterId).name}>
              <div className="flex flex-wrap gap-2">
                {COUNTERS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCounter(c.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-xs font-medium transition-all",
                      k.counterId === c.id
                        ? "border-clay bg-clay-soft text-ink"
                        : "border-stone bg-paper text-muted hover:border-clay/40",
                    )}
                  >
                    <span
                      className="h-5 w-5 rounded-full ring-1 ring-stone"
                      style={{ background: c.color }}
                    />
                    {c.name}
                    <span className="text-muted/70">{c.perMeter}/м</span>
                  </button>
                ))}
              </div>
            </Control>

            {/* Фурнитура */}
            <Control title="Фурнитура" hint={hardwareById(k.hardwareId).note}>
              <div className="grid grid-cols-3 gap-2">
                {HARDWARE.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setHardware(h.id)}
                    className={cn(
                      "rounded-xl border px-2 py-2 text-center transition-all",
                      k.hardwareId === h.id
                        ? "border-clay bg-clay-soft text-ink"
                        : "border-stone bg-paper text-muted hover:border-clay/40",
                    )}
                  >
                    <span className="block text-sm font-medium text-ink">
                      {h.name}
                    </span>
                    <span className="block text-xs text-muted">
                      {h.mult > 1 ? `+${Math.round((h.mult - 1) * 100)}%` : "база"}
                    </span>
                  </button>
                ))}
              </div>
            </Control>

            {/* Верхние шкафы */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-ink">
                  Верхние шкафы
                </p>
                <p className="text-xs text-muted">
                  навесные шкафы над рабочей зоной
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={k.wall}
                onClick={toggleWall}
                className={cn(
                  "relative h-7 w-12 rounded-full transition-colors",
                  k.wall ? "bg-clay" : "bg-stone",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all",
                    k.wall ? "left-6" : "left-1",
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Форма заявки */}
        <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-stone bg-paper p-6 shadow-soft sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-clay-soft text-clay">
                <CheckCircle weight="fill" className="h-8 w-8" />
              </span>
              <h3 className="font-display text-xl font-extrabold text-ink">
                Заявка принята{name ? `, ${name}` : ""}!
              </h3>
              <p className="max-w-md text-sm text-muted">
                Сохранили вашу конфигурацию и предварительную стоимость{" "}
                <span className="font-semibold text-ink">
                  {nf.format(pr.min)} – {nf.format(pr.max)} BYN
                </span>
                . Дизайнер перезвонит в течение 15 минут и подготовит точную
                смету.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h3 className="font-display text-xl font-extrabold text-ink">
                  Получить точную смету
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Пришлём детальный расчёт по вашей конфигурации и 3D-проект.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    className="h-12 flex-1 rounded-xl border border-stone bg-paper px-4 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-clay"
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatByPhone(e.target.value))}
                    placeholder="+375 (__) ___-__-__"
                    className="h-12 flex-1 rounded-xl border border-stone bg-paper px-4 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-clay"
                  />
                </div>
                {error && <p className="mt-2 text-sm text-clay-dark">{error}</p>}
              </div>

              <button
                type="button"
                onClick={submit}
                disabled={sending}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-clay px-7 font-display font-semibold text-white shadow-soft transition-all hover:bg-clay-dark hover:gap-3 disabled:opacity-50"
              >
                {sending ? "Отправляем…" : "Отправить"}
                {!sending && <ArrowRight weight="bold" className="h-5 w-5" />}
              </button>

              <p className="text-xs leading-relaxed text-muted lg:col-span-2">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-clay-dark"
                >
                  политикой обработки персональных данных
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function Control({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-stone/70 pb-6 last:border-0 last:pb-0">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="font-display font-semibold text-ink">{title}</h3>
        {hint && <span className="truncate text-xs text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
