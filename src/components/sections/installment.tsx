"use client";

import { useState } from "react";
import {
  Wallet,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const points = [
  "Без первоначального взноса",
  "Без процентов и переплат",
  "Оформление за 15 минут по паспорту",
  "Можно оформить прямо на замере",
];

/** Доступные сроки рассрочки, мес. */
const terms = [6, 12, 18, 24] as const;

/** Границы примерной стоимости кухни, BYN. */
const PRICE_MIN = 2000;
const PRICE_MAX = 12000;
const PRICE_STEP = 100;

/** Разделитель разрядов: 4 800 → "4 800". */
function formatByn(value: number) {
  return value.toLocaleString("ru-RU").replace(/,/g, " ");
}

export function Installment() {
  const [price, setPrice] = useState(4800);
  const [term, setTerm] = useState<(typeof terms)[number]>(24);

  const monthly = Math.round(price / term);
  const sliderPct = ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <section id="installment" className="scroll-mt-24 bg-paper py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-clay text-white shadow-lift">
            {/* Декор */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-clay-dark/40 blur-3xl"
            />

            <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              {/* ── Левая колонка: оффер ── */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ring-white/20">
                  <Wallet weight="fill" className="h-3.5 w-3.5" />
                  Рассрочка 0%
                </span>

                <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] sm:text-[2.6rem]">
                  Кухня мечты сейчас —<br className="hidden sm:block" /> оплата
                  частями потом
                </h2>

                <p className="mt-4 max-w-md text-white/85">
                  Рассрочка до 24 месяцев без переплат. Платите комфортными
                  частями и пользуйтесь новой кухней уже сегодня.
                </p>

                <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle
                        weight="fill"
                        className="mt-0.5 h-5 w-5 shrink-0 text-white/90"
                      />
                      <span className="text-white/90">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button
                    href="#quiz"
                    variant="light"
                    size="lg"
                    className="bg-white text-clay hover:bg-cream"
                  >
                    Оставить заявку
                    <ArrowRight weight="bold" className="h-5 w-5" />
                  </Button>
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/75">
                    <ShieldCheck weight="fill" className="h-4 w-4" />
                    Без скрытых комиссий
                  </span>
                </div>
              </div>

              {/* ── Правая колонка: калькулятор-превью ── */}
              <div className="rounded-[1.75rem] bg-white p-5 text-ink shadow-card ring-1 ring-black/5 dark:bg-espresso-2 dark:ring-white/10 sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-semibold text-ink">
                    Рассчитать платёж
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-soft px-2.5 py-1 text-[0.7rem] font-semibold text-clay-dark">
                    переплата 0 BYN
                  </span>
                </div>

                {/* Стоимость кухни — слайдер */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="price"
                      className="text-xs font-medium text-muted"
                    >
                      Стоимость кухни
                    </label>
                    <span className="font-display text-sm font-semibold text-ink">
                      {formatByn(price)} BYN
                    </span>
                  </div>
                  <input
                    id="price"
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    aria-label="Стоимость кухни"
                    className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-clay [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-clay [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
                    style={{
                      background: `linear-gradient(to right, var(--color-clay) ${sliderPct}%, var(--color-stone) ${sliderPct}%)`,
                    }}
                  />
                </div>

                {/* Срок рассрочки — чипы */}
                <div className="mt-6">
                  <p className="text-xs font-medium text-muted">
                    Срок рассрочки
                  </p>
                  <div
                    role="radiogroup"
                    aria-label="Срок рассрочки"
                    className="mt-3 grid grid-cols-4 gap-2"
                  >
                    {terms.map((t) => {
                      const active = t === term;
                      return (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setTerm(t)}
                          className={
                            "rounded-xl py-2.5 text-sm font-semibold transition-colors duration-150 " +
                            (active
                              ? "bg-clay text-white shadow-soft"
                              : "bg-sand text-ink hover:bg-clay-soft")
                          }
                        >
                          {t}
                          <span className="block text-[0.65rem] font-medium opacity-70">
                            мес
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Итог: ежемесячный платёж */}
                <div className="mt-6 rounded-2xl bg-paper p-5 ring-1 ring-stone/70">
                  <p className="text-xs font-medium text-muted">
                    Ежемесячный платёж
                  </p>
                  <p className="mt-1 font-display text-4xl font-extrabold tracking-tight text-clay">
                    {formatByn(monthly)}{" "}
                    <span className="text-lg font-bold text-ink">BYN / мес</span>
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                    <Clock weight="fill" className="h-4 w-4 text-clay" />
                    Точный расчёт — на бесплатном замере, за 15 минут
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
