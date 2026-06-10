"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Единая точка входа для GSAP на клиенте.
 *
 * Best-practice для Next.js App Router:
 * - ScrollTrigger регистрируется один раз, только в браузере;
 * - анимации запускаем внутри `gsap.context(..., scope)` и чистим
 *   через `ctx.revert()` в cleanup эффекта — это снимает все ScrollTrigger'ы
 *   и инлайновые стили, что важно при HMR и размонтировании;
 * - при `prefers-reduced-motion` движение не запускаем (см. `prefersReducedMotion`).
 */

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Надёжное каскадное появление элементов при скролле.
 *
 * Почему так, а не `gsap.from` с одним триггером на контейнер:
 * - конечное состояние задано явно (`to` → opacity 1) и после завершения
 *   инлайн-стили снимаются (`clearProps`) — контент не может «застрять»
 *   полупрозрачным, даже если кадры анимации задержались;
 * - `ScrollTrigger.batch` вешает триггер на каждый элемент — ряды ниже
 *   экрана появляются, когда пользователь до них доходит, а не играют
 *   вслепую вместе с первым рядом.
 *
 * Вызывать внутри gsap.context() — триггеры снимутся при revert.
 */
export function staggerReveal(
  elements: Element[],
  {
    y = 24,
    x = 0,
    stagger = 0.08,
  }: { y?: number; x?: number; stagger?: number } = {},
) {
  if (!elements.length) return;
  gsap.set(elements, { opacity: 0, y, x });
  ScrollTrigger.batch(elements, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger,
        overwrite: true,
        clearProps: "opacity,transform",
      }),
  });
}

export { gsap, ScrollTrigger };
