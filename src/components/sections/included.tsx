import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { included } from "@/lib/content";

export function Included() {
  return (
    <Section tone="espresso">
      <div className="flex flex-col items-center gap-4 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Всё включено
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-cream sm:text-4xl">
            Замер, проект, доставка и монтаж —{" "}
            <span className="text-clay">бесплатно</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-cream/65">
            Платите только за кухню. Замер, проект, доставку и сборку берём на
            себя — никаких «сюрпризов» в финальном счёте.
          </p>
        </Reveal>
      </div>

      <RevealGroup className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {included.map((item) => (
          <RevealItem key={item.title}>
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-espresso-2 px-4 py-8 text-center ring-1 ring-cream/5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-clay/15 text-clay">
                <item.icon weight="duotone" className="h-7 w-7" />
              </span>
              <p className="font-display font-semibold text-cream">
                {item.title}
              </p>
              <span className="rounded-full bg-cream/10 px-3 py-0.5 text-xs font-semibold text-cream/80">
                0 BYN
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
