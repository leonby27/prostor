"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Clock, MapPin, Ruler } from "@phosphor-icons/react";
import { SectionTitleNew } from "./section-title";
import { projects } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* Фолбэк-фото для проектов без своего кадра — подбираем по стилю. */
const fallbackImage: Record<string, string> = {
  p4: "/images/style-neoclassic.jpg",
  p5: "/images/project-green.jpg",
  p6: "/images/style-minimal.jpg",
};

export function WorksNew() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Десктоп: секция закрепляется, лента работ едет горизонтально по скроллу.
  // Мобайл/планшет: обычный горизонтальный свайп со snap — pin там неудобен.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      const distance = () => t.scrollWidth - t.clientWidth;
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="works" className="overflow-hidden pt-24 sm:pt-32">
      {/* Алиас для ссылки «Смотреть работы» (#gallery) из общего квиза */}
      <span id="gallery" aria-hidden />
      <SectionTitleNew
        num="01"
        eyebrow="Наши работы"
        title="Кухни, которые уже готовят ужины"
      />

      <div className="mt-12 lg:mt-16">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 [scrollbar-width:none] sm:px-8 lg:snap-none lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => {
            const img = p.image ?? fallbackImage[p.id];
            return (
              <article
                key={p.id}
                className="group relative w-[82vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-stone bg-sand sm:w-[58vw] lg:w-[44vw] xl:w-[38vw]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 82vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-espresso-2 font-display text-muted">
                      {p.style}
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-espresso/70 px-3 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")} · {p.style}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-full bg-clay px-3.5 py-1.5 font-display text-sm font-bold text-white">
                    {p.price}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 p-5">
                  <h3 className="w-full font-display text-lg font-bold leading-snug text-ink">
                    {p.title}
                  </h3>
                  {p.location && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                      <MapPin weight="fill" className="h-3.5 w-3.5 text-clay/80" />
                      {p.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <Ruler weight="duotone" className="h-4 w-4 text-clay/80" />
                    {p.size}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <Clock weight="duotone" className="h-4 w-4 text-clay/80" />
                    {p.term}
                  </span>
                </div>
              </article>
            );
          })}

          {/* Финальная карточка-CTA в ленте */}
          <a
            href="#lead"
            className="grid w-[82vw] shrink-0 snap-start place-items-center rounded-2xl border border-clay/40 bg-clay-soft p-10 text-center transition-colors hover:border-clay sm:w-[58vw] lg:w-[30vw]"
          >
            <span>
              <span className="block font-display text-2xl font-extrabold text-ink sm:text-3xl">
                Хочу такую же
              </span>
              <span className="mt-3 block text-sm text-muted">
                Бесплатный замер и 3D-проект — увидите свою кухню до заказа
              </span>
              <span className="mt-6 inline-block rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white">
                Начать с замера
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
