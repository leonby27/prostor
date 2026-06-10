"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Star } from "@phosphor-icons/react";
import { included } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const HEADLINE = ["Кухня,", "в", "которой", "хочется", "жить"];

export function HeroNew() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context((self) => {
      const words = self.selector!("[data-word]");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Пословный подъём заголовка из-под «линии сгиба».
      tl.from(words, {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.07,
      })
        .from(
          "[data-hero-sub]",
          { opacity: 0, y: 18, duration: 0.6 },
          "-=0.45",
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 },
          "-=0.35",
        )
        // Фото открывается снизу вверх «шторкой».
        .from(
          "[data-hero-media]",
          {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.inOut",
          },
          "-=0.7",
        )
        .from(
          "[data-hero-chip]",
          { opacity: 0, y: 12, duration: 0.4, stagger: 0.06 },
          "-=0.4",
        );

      // Лёгкий параллакс фото при прокрутке.
      gsap.to("[data-hero-img]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Верхняя строка-досье */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <span>Производство — Минск</span>
          <span className="hidden h-px w-10 bg-stone sm:block" />
          <span>12 лет · 2 400+ кухонь</span>
          <span className="hidden h-px w-10 bg-stone sm:block" />
          <span className="inline-flex items-center gap-1.5 text-ink">
            <Star weight="fill" className="h-3.5 w-3.5 text-clay" />
            4.9 из 5 · 320+ отзывов
          </span>
        </div>

        {/* Заголовок-плакат */}
        <h1 className="mt-8 font-display font-extrabold leading-[0.98] tracking-tight text-ink">
          <span className="block text-[13vw] sm:text-[10vw] lg:text-[7.5rem]">
            {HEADLINE.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <span
                  data-word
                  className={`inline-block ${i === 4 ? "text-clay" : ""}`}
                >
                  {w}
                </span>
                {i < HEADLINE.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p
            data-hero-sub
            className="max-w-md text-lg leading-relaxed text-muted"
          >
            Нарисуем проект, сделаем на своём производстве и аккуратно соберём
            у вас дома. От <span className="font-semibold text-ink">900 BYN</span>{" "}
            за погонный метр, рассрочка 0% на 24 месяца.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              data-hero-cta
              href="#quiz"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              Рассчитать кухню
              <ArrowRight weight="bold" className="h-5 w-5" />
            </a>
            <a
              data-hero-cta
              href="#works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone px-8 py-4 text-base font-semibold text-ink transition-colors hover:border-clay/50 hover:text-clay"
            >
              Смотреть работы
              <ArrowDown weight="bold" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Фото на всю ширину с чипами «всё включено» */}
      <div
        data-hero-media
        className="relative mt-14 h-[52vh] overflow-hidden sm:h-[64vh]"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <div data-hero-img className="absolute inset-0 -top-[12%] h-[124%]">
          <Image
            src="/images/openplan.jpg"
            alt="Кухня с открытой планировкой и барной зоной — наша работа"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-transparent to-paper/30" />

        <div className="absolute inset-x-0 bottom-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2.5 px-5 sm:px-8">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/80">
              В цене кухни:
            </span>
            {included.map((item) => (
              <span
                key={item.title}
                data-hero-chip
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-espresso/60 px-4 py-2 text-sm font-medium text-cream backdrop-blur-md"
              >
                <item.icon weight="duotone" className="h-4 w-4 text-clay" />
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
