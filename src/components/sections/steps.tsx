import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { steps } from "@/lib/content";

export function Steps() {
  return (
    <Section tone="paper">
      <SectionHeading
        eyebrow="Как мы работаем"
        title="От заявки до готовой кухни — 6 шагов"
        subtitle="Прозрачный процесс без сюрпризов. Вы знаете, что происходит на каждом этапе."
      />

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <RevealItem key={s.title}>
            <div className="group relative h-full rounded-2xl border border-stone bg-paper p-7 transition-all duration-300 hover:border-clay/30 hover:shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-soft text-clay transition-colors group-hover:bg-clay group-hover:text-white">
                  <s.icon weight="duotone" className="h-6 w-6" />
                </span>
                <span className="font-display text-5xl font-extrabold leading-none text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
