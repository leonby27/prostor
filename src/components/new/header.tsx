"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Phone } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const anchors = [
  { label: "Работы", href: "#works" },
  { label: "Цены", href: "#pricing" },
  { label: "Процесс", href: "#process" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Вопросы", href: "#faq" },
];

export function HeaderNew() {
  const bar = useRef<HTMLDivElement>(null);

  // Тонкая медная полоса прогресса чтения страницы.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !bar.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone/60 bg-paper/80 backdrop-blur-md">
      <div
        ref={bar}
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-clay"
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">
            Простор
          </span>
          <span className="rounded-full border border-clay/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-clay">
            new
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {a.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 text-sm font-semibold text-ink sm:flex"
          >
            <Phone weight="duotone" className="h-4 w-4 text-clay" />
            {site.phone.display}
          </a>
          <a
            href="#lead"
            className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
          >
            Бесплатный замер
          </a>
          <Link
            href="/"
            className="hidden text-xs text-muted underline-offset-4 transition-colors hover:text-ink hover:underline md:block"
            title="Классическая версия"
          >
            v1
          </Link>
        </div>
      </div>
    </header>
  );
}
