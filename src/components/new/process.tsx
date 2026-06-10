"use client";

import { useLayoutEffect, useRef } from "react";
import { SectionTitleNew } from "./section-title";
import { steps } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function ProcessNew() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context((self) => {
      // Медная линия «прорисовывается» по мере прокрутки списка.
      gsap.to("[data-process-line]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-process-list]",
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      // Шаги мягко появляются по одному.
      const items = self.selector!("[data-process-item]");
      items.forEach((el: Element) => {
        gsap.from(el, {
          opacity: 0,
          x: -24,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" className="pt-24 sm:pt-32">
      <SectionTitleNew
        num="04"
        eyebrow="Как мы работаем"
        title="Шесть шагов до готовой кухни"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div data-process-list className="relative mt-14 lg:ml-2">
          {/* Рельса и прогресс */}
          <div className="absolute bottom-3 left-[7px] top-3 w-px bg-stone" />
          <div
            data-process-line
            className="absolute bottom-3 left-[7px] top-3 w-px origin-top scale-y-0 bg-clay"
          />

          <ol className="space-y-12 sm:space-y-14">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-process-item
                className="relative grid gap-3 pl-10 sm:grid-cols-[8rem_1fr] sm:gap-8 lg:grid-cols-[12rem_1fr]"
              >
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-clay bg-paper" />
                <div className="flex items-start gap-3 sm:block">
                  <span className="font-display text-sm font-bold text-clay">
                    шаг {i + 1}
                  </span>
                  <s.icon
                    weight="duotone"
                    className="mt-0.5 h-6 w-6 text-muted sm:mt-4 sm:h-8 sm:w-8"
                  />
                </div>
                <div className="max-w-xl">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
