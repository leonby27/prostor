"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { SectionTitleNew } from "./section-title";
import { promos, type Promo } from "@/lib/content";
import { gsap, prefersReducedMotion, staggerReveal } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/* Тона под палитру v2: акцентная глиняная карточка + тёмные/песочные. */
const toneStyles: Record<
  Promo["tone"],
  { card: string; badge: string; title: string; sub: string; cta: string }
> = {
  clay: {
    card: "bg-clay text-white",
    badge: "bg-white/20 text-white",
    title: "text-white",
    sub: "text-white/85",
    cta: "bg-white text-clay hover:bg-cream",
  },
  espresso: {
    card: "bg-espresso-2 text-cream ring-1 ring-cream/10",
    badge: "bg-clay text-white",
    title: "text-cream",
    sub: "text-cream/70",
    cta: "bg-clay text-white hover:bg-clay-dark",
  },
  sand: {
    card: "bg-sand text-ink border border-stone",
    badge: "bg-clay-soft text-clay",
    title: "text-ink",
    sub: "text-muted",
    cta: "bg-clay text-white hover:bg-clay-dark",
  },
};

function PromoCard({ promo }: { promo: Promo }) {
  const t = toneStyles[promo.tone];
  return (
    <article
      data-promo-card
      className={cn(
        "relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl p-7",
        t.card,
      )}
    >
      {promo.image && (
        <>
          <Image
            src={promo.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
        </>
      )}

      <promo.icon
        weight="duotone"
        className={cn(
          "pointer-events-none absolute -right-3 -top-3 h-28 w-28 opacity-[0.12]",
          t.title,
        )}
      />

      <div className="relative">
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
            t.badge,
          )}
        >
          {promo.badge}
        </span>
        <h3
          className={cn(
            "mt-4 font-display text-2xl font-extrabold leading-tight",
            t.title,
          )}
        >
          {promo.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed", t.sub)}>{promo.text}</p>
      </div>

      <a
        href="#quiz"
        className={cn(
          "relative mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full px-5 font-display text-sm font-semibold transition-all hover:gap-3",
          t.cta,
        )}
      >
        {promo.cta}
        <ArrowRight weight="bold" className="h-4 w-4" />
      </a>
    </article>
  );
}

export function PromosNew() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context((self) => {
      staggerReveal(self.selector!("[data-promo-card]"), { y: 24 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="promos" className="scroll-mt-20 pt-24 sm:pt-32">
      <SectionTitleNew
        eyebrow="Акции"
        title="Сейчас выгодно"
        subtitle="Несколько предложений, которые помогут сэкономить. Действуют ограниченное время — лучше не тянуть."
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8">
        {promos.map((p) => (
          <PromoCard key={p.id} promo={p} />
        ))}
      </div>
    </section>
  );
}
