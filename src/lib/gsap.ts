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
 * Простое появление блока при скролле: все элементы проявляются разом,
 * один триггер на весь блок (по умолчанию — их общий контейнер).
 *
 * Почему так, а не `ScrollTrigger.batch` на каждый элемент: при per-card
 * триггерах нижний ряд карточек ждёт, пока до него доскроллишь, и внутри
 * одного блока карточки оказываются в разной фазе. Один триггер на блок
 * убирает эту «ступенчатость». Конечное состояние задано явно (opacity 1),
 * инлайн-стили снимаются (`clearProps`) — контент не застрянет скрытым.
 *
 * Вызывать внутри gsap.context() — триггер снимется при revert.
 */
export function staggerReveal(
  elements: Element[],
  { y = 20, x = 0, trigger }: { y?: number; x?: number; trigger?: Element } = {},
) {
  if (!elements.length) return;
  const triggerEl = trigger ?? elements[0].parentElement ?? elements[0];
  gsap.set(elements, { opacity: 0, y, x });
  ScrollTrigger.create({
    trigger: triggerEl,
    start: "top 85%",
    once: true,
    onEnter: () =>
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
        clearProps: "opacity,transform",
      }),
  });
}

export { gsap, ScrollTrigger };
