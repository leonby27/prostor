"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Star,
  Ruler,
  CheckCircle,
  ArrowRight,
  SealPercent,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // GSAP: лёгкий scroll-параллакс 3D-сцены и декоративного пятна.
  // Контекст со scope чистится в cleanup — снимает все ScrollTrigger'ы.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(visualRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to("[data-hero-blob]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden bg-paper bg-grain pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Декоративное пятно */}
      <div
        aria-hidden
        data-hero-blob
        className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-clay/10 blur-3xl dark:bg-clay/[0.04]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Левая колонка */}
          <div className="max-w-xl">
            <motion.span
              {...fade(0)}
              className="inline-flex items-center gap-2 rounded-full border border-stone bg-paper/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70"
            >
              <SealPercent weight="fill" className="h-4 w-4 text-clay" />
              Производство в Минске · по всей Беларуси
            </motion.span>

            <motion.h1
              {...fade(0.08)}
              className="mt-6 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl md:text-6xl"
            >
              Кухни на заказ
              <br />
              под ваш <span className="text-clay">простор</span>
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="mt-6 text-lg leading-relaxed text-muted"
            >
              Нарисуем, сделаем на своём производстве и соберём у вас дома.
              Замер и 3D-проект — бесплатно, а оплату можно растянуть на 24
              месяца без переплат.
            </motion.p>

            <motion.div
              {...fade(0.24)}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="#quiz" size="lg">
                {site.cta.primary}
                <ArrowRight weight="bold" className="h-5 w-5" />
              </Button>
              <Button href="#gallery" size="lg" variant="outline">
                Смотреть работы
              </Button>
            </motion.div>

            {/* Мини-доверие */}
            <motion.div
              {...fade(0.32)}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      weight="fill"
                      className="h-4 w-4 text-clay"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  <span className="font-semibold text-ink">4.9</span> · 320+
                  отзывов
                </span>
              </div>
              <div className="h-8 w-px bg-stone" />
              <div>
                <p className="font-display text-xl font-extrabold text-ink">
                  от 900 BYN
                </p>
                <p className="text-sm text-muted">за погонный метр</p>
              </div>
            </motion.div>
          </div>

          {/* Правая колонка — фото */}
          <motion.div
            ref={visualRef}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[4/4.2]">
              <Image
                src="/images/hero-kitchen.jpg"
                alt="Современная светлая кухня на заказ"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Плавающая карточка: рейтинг */}
            <motion.div
              {...fade(0.5)}
              className="absolute -left-3 top-6 rounded-2xl border border-stone/70 bg-paper/95 px-4 py-3 shadow-card backdrop-blur-sm sm:left-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay-soft text-clay">
                  <Star weight="fill" className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-base font-extrabold text-ink">
                    4.9 / 5
                  </p>
                  <p className="text-xs text-muted">Рейтинг клиентов</p>
                </div>
              </div>
            </motion.div>

            {/* Плавающая карточка: бесплатный замер */}
            <motion.div
              {...fade(0.62)}
              className="absolute -bottom-4 right-2 max-w-[15rem] rounded-2xl border border-stone/70 bg-paper/95 px-4 py-3 shadow-card backdrop-blur-sm sm:right-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-espresso text-cream">
                  <Ruler weight="duotone" className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">
                    Замер и 3D-проект
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                    <CheckCircle
                      weight="fill"
                      className="h-3.5 w-3.5 text-clay"
                    />
                    бесплатно
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
