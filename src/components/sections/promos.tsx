"use client";

import { useRef } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { promos, type Promo } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Promos() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 420);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="promos" className="scroll-mt-24 bg-sand py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Акции"
            title="Сейчас выгодно"
            subtitle="Несколько предложений, которые помогут сэкономить. Действуют ограниченное время — лучше не тянуть."
            className="max-w-2xl"
          />
          <div className="hidden gap-2 sm:flex">
            <CarouselButton dir={-1} onClick={() => scrollBy(-1)} />
            <CarouselButton dir={1} onClick={() => scrollBy(1)} />
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {promos.map((p) => (
            <PromoCard key={p.id} promo={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CarouselButton({
  dir,
  onClick,
}: {
  dir: 1 | -1;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Дальше" : "Назад"}
      className="grid h-11 w-11 place-items-center rounded-full border border-stone bg-paper text-ink transition-all hover:border-clay hover:text-clay active:scale-95"
    >
      {dir === 1 ? (
        <CaretRight weight="bold" className="h-5 w-5" />
      ) : (
        <CaretLeft weight="bold" className="h-5 w-5" />
      )}
    </button>
  );
}

const toneStyles: Record<
  Promo["tone"],
  { card: string; badge: string; text: string; sub: string; cta: string }
> = {
  clay: {
    card: "bg-clay text-white",
    badge: "bg-white/20 text-white",
    text: "text-white",
    sub: "text-white/85",
    cta: "bg-white text-clay hover:bg-cream",
  },
  espresso: {
    card: "bg-espresso text-cream",
    badge: "bg-clay text-white",
    text: "text-cream",
    sub: "text-cream/70",
    cta: "bg-clay text-white hover:bg-clay-dark",
  },
  sand: {
    card: "bg-paper text-ink border border-stone",
    badge: "bg-clay-soft text-clay",
    text: "text-ink",
    sub: "text-muted",
    cta: "bg-espresso text-cream hover:bg-[#332e28]",
  },
};

function PromoCard({ promo }: { promo: Promo }) {
  const t = toneStyles[promo.tone];
  return (
    <article
      className={cn(
        "relative flex min-h-[19rem] w-[86%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-soft sm:w-[24rem]",
        t.card,
      )}
    >
      {/* Фото-фон (если есть) */}
      {promo.image && (
        <>
          <Image
            src={promo.image}
            alt=""
            fill
            sizes="24rem"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
        </>
      )}

      {/* Иконка-водяной знак */}
      <promo.icon
        weight="duotone"
        className={cn(
          "pointer-events-none absolute -right-3 -top-3 h-28 w-28 opacity-[0.12]",
          t.text,
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
            t.text,
          )}
        >
          {promo.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed", t.sub)}>
          {promo.text}
        </p>
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
