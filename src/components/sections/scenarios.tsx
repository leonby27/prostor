"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { scenarios, type Scenario } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const VISIBLE = 6;

export function Scenarios() {
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  const primary = scenarios.slice(0, VISIBLE);
  const extra = scenarios.slice(VISIBLE);

  return (
    <Section tone="sand">
      <SectionHeading
        eyebrow="Кому подходит"
        title="Кухня под вашу задачу"
        subtitle="Подберём решение под вашу ситуацию — от компактной кухни для студии до большого проекта в частном доме."
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {primary.map((s) => (
          <RevealItem key={s.title}>
            <ScenarioCard scenario={s} />
          </RevealItem>
        ))}
      </RevealGroup>

      {extra.length > 0 && (
        <>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="extra"
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {extra.map((s) => (
                    <ScenarioCard key={s.title} scenario={s} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-full border border-stone bg-paper px-6 py-3 text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:border-clay/30 hover:shadow-card dark:border-transparent"
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
        </>
      )}
    </Section>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <a
      href="#quiz"
      className="group flex h-full flex-col rounded-2xl border border-stone bg-paper p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-clay/30 hover:shadow-card dark:border-transparent"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-13 w-13 place-items-center rounded-2xl bg-clay-soft text-clay transition-colors group-hover:bg-clay group-hover:text-white">
          <scenario.icon weight="duotone" className="h-7 w-7" />
        </span>
        <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-clay-dark">
          {scenario.tag}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold text-ink">
        {scenario.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {scenario.text}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-dark transition-all group-hover:gap-2.5">
        Рассчитать кухню
        <ArrowRight weight="bold" className="h-4 w-4" />
      </span>
    </a>
  );
}
