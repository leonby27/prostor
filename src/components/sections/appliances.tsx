import Image from "next/image";
import { Wrench, Wallet, Gift } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { applianceBrands } from "@/lib/content";

const perks = [
  { icon: Wrench, text: "Установим и подключим технику сами" },
  { icon: Wallet, text: "Можно включить в общую рассрочку 0%" },
  { icon: Gift, text: "Часть техники — в подарок по акции" },
];

export function Appliances() {
  return (
    <Section tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Техника"
            title="Встроенная техника проверенных брендов"
            subtitle="Подберём и установим духовые шкафы, варочные панели, вытяжки и мойки — кухня приедет к вам полностью готовой."
          />

          <ul className="mt-8 flex flex-col gap-4">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-clay-soft text-clay">
                  <p.icon weight="duotone" className="h-5 w-5" />
                </span>
                <span className="text-ink/85">{p.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            {applianceBrands.map((b) => (
              <span
                key={b}
                className="font-display text-lg font-bold tracking-tight text-ink/35"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/appliance.jpg"
              alt="Встраиваемая кухонная техника"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
