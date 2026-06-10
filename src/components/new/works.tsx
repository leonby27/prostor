"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Ruler } from "@phosphor-icons/react";
import { SectionTitleNew } from "./section-title";
import { projects } from "@/lib/content";
import { gsap, prefersReducedMotion, staggerReveal } from "@/lib/gsap";

/* Фолбэк-фото для проектов без своего кадра — подбираем по стилю. */
const fallbackImage: Record<string, string> = {
  p4: "/images/style-neoclassic.jpg",
  p5: "/images/project-green.jpg",
  p6: "/images/style-minimal.jpg",
};

export function WorksNew() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context((self) => {
      staggerReveal(self.selector!("[data-work-card]"), { y: 26 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="works" className="scroll-mt-20 pt-24 sm:pt-32">
      <SectionTitleNew
        eyebrow="Наши работы"
        title="Кухни, которые уже готовят ужины"
        subtitle="Реальные проекты с ценой и сроком — каждую делали под конкретную квартиру."
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {projects.map((p) => {
          const img = p.image ?? fallbackImage[p.id];
          return (
            <article
              key={p.id}
              data-work-card
              className="group overflow-hidden rounded-2xl border border-stone bg-sand transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {img ? (
                  <Image
                    src={img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-espresso-2 font-display text-muted">
                    {p.style}
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-espresso/70 px-3 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
                  {p.style}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full bg-clay px-3.5 py-1.5 font-display text-sm font-bold text-white">
                  {p.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-snug text-ink">
                  {p.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                  {p.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin weight="fill" className="h-3.5 w-3.5 text-clay/80" />
                      {p.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler weight="duotone" className="h-4 w-4 text-clay/80" />
                    {p.size}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock weight="duotone" className="h-4 w-4 text-clay/80" />
                    {p.term}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#quiz"
          className="inline-flex items-center gap-2 rounded-full border border-stone px-8 py-4 font-semibold text-ink transition-colors hover:border-clay/50 hover:text-clay"
        >
          Хочу такую же кухню
          <ArrowRight weight="bold" className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
