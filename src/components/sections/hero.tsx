"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  SealPercent,
  Star,
} from "@phosphor-icons/react";
import { included } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const BULLETS = [
  "Замер и 3D-проект — бесплатно",
  "Рассрочка 0% до 24 месяцев",
  "Гарантия 5 лет делом, не строчкой",
];

export function Hero({ worksHref = "#gallery" }: { worksHref?: string }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      // Спокойное каскадное появление: слева текст, справа фото.
      // set → to с явным финалом и clearProps: контент не может
      // «застрять» скрытым, если кадры анимации задержатся.
      gsap.set("[data-hero-fade]", { opacity: 0, y: 22 });
      gsap.set("[data-hero-photo]", { opacity: 0, scale: 0.97 });
      gsap.set("[data-hero-chip]", { opacity: 0, y: 10 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to("[data-hero-fade]", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.09,
          clearProps: "opacity,transform",
        })
        .to(
          "[data-hero-photo]",
          { opacity: 1, scale: 1, duration: 0.7, clearProps: "opacity,transform" },
          "-=0.5",
        )
        .to(
          "[data-hero-chip]",
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            clearProps: "opacity,transform",
          },
          "-=0.3",
        );

      // Едва заметный параллакс фото при прокрутке.
      gsap.to("[data-hero-img]", {
        yPercent: 8,
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
    <section ref={root} id="top" className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Текст */}
          <div className="max-w-xl">
            <span
              data-hero-fade
              className="inline-flex items-center gap-2 rounded-full border border-stone bg-sand px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              <SealPercent weight="fill" className="h-4 w-4 text-clay" />
              Производство в Минске · 12 лет
            </span>

            <h1
              data-hero-fade
              className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Кухня, в которой хочется <span className="text-clay">жить</span>
            </h1>

            <p data-hero-fade className="mt-6 text-lg leading-relaxed text-muted">
              Нарисуем проект, сделаем на своём производстве и аккуратно
              соберём у вас дома. От{" "}
              <span className="font-semibold text-ink">900 BYN</span> за
              погонный метр.
            </p>

            <ul data-hero-fade className="mt-6 space-y-2.5">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-ink/90">
                  <CheckCircle
                    weight="fill"
                    className="h-5 w-5 shrink-0 text-clay"
                  />
                  {b}
                </li>
              ))}
            </ul>

            <div data-hero-fade className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quiz"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-clay-dark"
              >
                Рассчитать кухню
                <ArrowRight weight="bold" className="h-5 w-5" />
              </a>
              <a
                href={worksHref}
                className="inline-flex items-center justify-center rounded-full border border-stone px-8 py-4 text-base font-semibold text-ink transition-colors hover:border-clay/50 hover:text-clay"
              >
                Смотреть работы
              </a>
            </div>

            <div
              data-hero-fade
              className="mt-9 flex items-center gap-3 text-sm text-muted"
            >
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} weight="fill" className="h-4 w-4 text-clay" />
                ))}
              </span>
              <span>
                <span className="font-semibold text-ink">4.9 из 5</span> · 320+
                отзывов · 2 400+ кухонь
              </span>
            </div>
          </div>

          {/* Фото */}
          <div data-hero-photo className="relative">
            <div className="relative aspect-[4/4.4] overflow-hidden rounded-3xl shadow-lift sm:aspect-[4/4]">
              <div data-hero-img className="absolute inset-0 -top-[8%] h-[116%]">
                <Image
                  src="/images/openplan.jpg"
                  alt="Кухня с открытой планировкой — наша работа"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/70 to-transparent" />

              {/* Чипы «в цене кухни» */}
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                {included.map((item) => (
                  <span
                    key={item.title}
                    data-hero-chip
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-sm"
                  >
                    <item.icon weight="duotone" className="h-3.5 w-3.5 text-clay" />
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
