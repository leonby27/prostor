"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Счётчик, который «накручивается» от 0 при попадании в зону видимости.
 *
 * Принимает строку из контента как есть («2 400+», «от 25 дней», «5 лет»):
 * вычленяет числовую часть, анимирует её, а префикс/суффикс сохраняет.
 * Разряды форматируются неразрывным пробелом (ru-RU).
 * При prefers-reduced-motion сразу показывает финальное значение.
 */

function parse(value: string) {
  const match = value.match(/\d[\d\s ]*\d|\d/);
  if (!match) return null;
  const raw = match[0];
  const target = parseInt(raw.replace(/[\s ]/g, ""), 10);
  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index! + raw.length),
    target,
  };
}

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parse(value);

  useLayoutEffect(() => {
    if (!parsed || prefersReducedMotion() || !ref.current) return;
    const el = ref.current;
    const counter = { v: 0 };
    el.textContent = parsed.prefix + fmt(0) + parsed.suffix;

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        v: parsed.target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = parsed.prefix + fmt(Math.round(counter.v)) + parsed.suffix;
        },
      });
    }, ref);

    // Если уже видим при монтировании — ScrollTrigger сам стартует.
    ScrollTrigger.refresh();
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SSR/без-JS/reduced-motion: сразу финальное значение.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
