import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { materials } from "@/lib/content";

export function Materials() {
  return (
    <Section tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Фото */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[4/3] lg:aspect-[4/4.6]">
            <Image
              src="/images/project-green.jpg"
              alt="Кухня с островом: фасады, столешница и фурнитура"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Список */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Материалы и фурнитура"
            title="Из чего сделана ваша кухня"
            subtitle="Берём только то, что служит годами: сертифицированные плиты, надёжную фурнитуру и долговечные столешницы. На скрытом не экономим."
          />

          <RevealGroup className="mt-8 flex flex-col gap-5">
            {materials.map((m) => (
              <RevealItem key={m.title}>
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-paper text-clay shadow-soft ring-1 ring-stone">
                    <m.icon weight="duotone" className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {m.text}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
