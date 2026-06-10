"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { SectionTitleNew } from "./section-title";
import { scenarios, type Scenario } from "@/lib/content";
import { gsap, prefersReducedMotion, staggerReveal } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const VISIBLE = 6;

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <a
      href="#quiz"
      data-scenario-card
      className="group flex h-full flex-col rounded-2xl border border-stone bg-sand p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay/30 hover:shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-soft text-clay transition-colors group-hover:bg-clay group-hover:text-white">
          <scenario.icon weight="duotone" className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold text-clay">
          {scenario.tag}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-ink">
        {scenario.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {scenario.text}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay transition-all group-hover:gap-2.5">
        Рассчитать кухню
        <ArrowRight weight="bold" className="h-4 w-4" />
      </span>
    </a>
  );
}

export function ScenariosNew() {
  const root = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  const primary = scenarios.slice(0, VISIBLE);
  const extra = scenarios.slice(VISIBLE);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context((self) => {
      staggerReveal(self.selector!("[data-scenario-card]"), { y: 24 });
    }, root);
    return () => ctx.revert();
  }, [expanded]);

  return (
    <section ref={root} id="scenarios" className="scroll-mt-20 pt-24 sm:pt-32">
      <SectionTitleNew
        eyebrow="Кому подходит"
        title="Кухня под вашу задачу"
        subtitle="Подберём решение под вашу ситуацию — от компактной кухни для студии до большого проекта в частном доме."
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {primary.map((s) => (
          <ScenarioCard key={s.title} scenario={s} />
        ))}
        {expanded &&
          extra.map((s) => <ScenarioCard key={s.title} scenario={s} />)}
      </div>

      {extra.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-full border border-stone bg-sand px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-clay/30"
          >
            {expanded ? "Свернуть" : `Показать ещё ${extra.length}`}
            <CaretDown
              weight="bold"
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                expanded && "rotate-180",
              )}
            />
          </button>
        </div>
      )}
    </section>
  );
}
