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

export { gsap, ScrollTrigger };
