"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SectionTitleNew } from "./section-title";
import { styles, type Style } from "@/lib/content";
import { gsap, prefersReducedMotion, staggerReveal } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function StyleCard({ style, large }: { style: Style; large?: boolean }) {
  return (
    <a
      href="#quiz"
      data-style-card
      className={cn(
        "group relative block h-full overflow-hidden rounded-2xl",
        large
          ? "min-h-[18rem] lg:min-h-[28rem]"
          : "min-h-[12rem] lg:min-h-[13.5rem]",
      )}
    >
      <Image
        src={style.image}
        alt={`Кухня в стиле «${style.name}»`}
        fill
        sizes={
          large
            ? "(max-width: 1024px) 100vw, 66vw"
            : "(max-width: 1024px) 50vw, 33vw"
        }
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      {/* Тёмный градиент фиксирован (не зависит от темы) — текст всегда белый */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <h3
            className={cn(
              "font-display font-bold text-white",
              large ? "text-2xl sm:text-3xl" : "text-lg",
            )}
          >
            {style.name}
          </h3>
          <p
            className={cn(
              "mt-1 text-white/75",
              large ? "max-w-md text-sm" : "hidden text-xs sm:block",
            )}
          >
            {style.description}
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-clay">
          <ArrowUpRight weight="bold" className="h-5 w-5" />
        </span>
      </div>
    </a>
  );
}

export function StylesNew() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context((self) => {
      staggerReveal(self.selector!("[data-style-card]"), { y: 24, stagger: 0.06 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="styles" className="scroll-mt-20 pt-24 sm:pt-32">
      <SectionTitleNew
        eyebrow="Стили"
        title="Найдём стиль под ваш интерьер"
        subtitle="От лаконичного минимализма до тёплой классики — подберём решение, которое подходит именно вам."
      />

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-4 px-5 sm:px-8 lg:grid-cols-3">
        {styles.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              i === 0 && "col-span-2 lg:row-span-2",
              i === styles.length - 1 && "col-span-2 lg:col-span-1",
            )}
          >
            <StyleCard style={s} large={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
