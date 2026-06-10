"use client";

import { useLayoutEffect, useRef } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { steps } from "@/lib/content";

export function Steps() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context((self) => {
      const cards = self.selector!("[data-step-card]");
      const numbers = self.selector!("[data-step-num]");

      // Появление карточек со стаггером при входе секции в зону видимости.
      gsap.from(cards, {
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      // Scroll-scrubbed параллакс крупных номеров — лёгкая глубина.
      numbers.forEach((num: Element, i: number) => {
        gsap.to(num, {
          yPercent: -22 - (i % 3) * 6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section tone="paper">
      <SectionHeading
        eyebrow="Как мы работаем"
        title="От заявки до готовой кухни — 6 шагов"
        subtitle="Прозрачный процесс без сюрпризов. Вы знаете, что происходит на каждом этапе."
      />

      <div
        ref={root}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {steps.map((s, i) => (
          <div key={s.title} data-step-card>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-stone bg-paper p-7 transition-all duration-300 hover:border-clay/30 hover:shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-soft text-clay transition-colors group-hover:bg-clay group-hover:text-white">
                  <s.icon weight="duotone" className="h-6 w-6" />
                </span>
                <span
                  data-step-num
                  className="font-display text-5xl font-extrabold leading-none text-stone"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
