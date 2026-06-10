import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { advantages } from "@/lib/content";

export function Advantages() {
  return (
    <Section tone="paper">
      <SectionHeading
        eyebrow="Почему мы"
        title="С нами спокойно"
        subtitle="Делаем кухни, которые служат годами, и берём на себя всё — от замера до последнего винта. Вам остаётся выбрать цвет."
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {advantages.map((a) => (
          <RevealItem key={a.title}>
            <div className="group h-full rounded-2xl border border-stone bg-sand/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay/30 hover:bg-white hover:shadow-card dark:hover:bg-stone/40">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-clay-soft text-clay transition-colors group-hover:bg-clay group-hover:text-white">
                <a.icon weight="duotone" className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {a.text}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
