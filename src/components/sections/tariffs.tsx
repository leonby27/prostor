import { CheckCircle, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { tariffs, type Tariff } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Tariffs() {
  return (
    <Section id="tariffs" tone="paper">
      <SectionHeading
        eyebrow="Тарифы"
        title="Честные цены, без «приходите — рассчитаем»"
        subtitle="Три комплектации под разный бюджет. Точную цену зафиксируем после бесплатного замера — и больше она не вырастет."
      />

      <RevealGroup className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {tariffs.map((t) => (
          <RevealItem key={t.id}>
            <TariffCard tariff={t} />
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-8 text-center text-sm text-muted">
        Цены указаны за погонный метр без учёта техники. Точная стоимость
        зависит от размеров и материалов.
      </p>
    </Section>
  );
}

function TariffCard({ tariff }: { tariff: Tariff }) {
  const featured = tariff.featured;
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl p-8 transition-transform duration-300",
        featured
          ? "bg-espresso text-cream shadow-lift lg:-translate-y-3"
          : "border border-stone bg-paper text-ink shadow-soft",
      )}
    >
      {featured && (
        <span className="absolute right-7 top-7 rounded-full bg-clay px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Хит продаж
        </span>
      )}

      <h3
        className={cn(
          "font-display text-xl font-bold",
          featured ? "text-cream" : "text-ink",
        )}
      >
        {tariff.name}
      </h3>
      <p
        className={cn(
          "mt-2 min-h-[2.5rem] text-sm leading-relaxed",
          featured ? "text-cream/70" : "text-muted",
        )}
      >
        {tariff.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-display text-4xl font-extrabold",
            featured ? "text-cream" : "text-ink",
          )}
        >
          {tariff.price}
        </span>
        <span
          className={cn(
            "text-sm",
            featured ? "text-cream/60" : "text-muted",
          )}
        >
          BYN / м.п.
        </span>
      </div>

      <a
        href="#quiz"
        className={cn(
          "mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full font-display font-semibold transition-all hover:gap-3 active:scale-[0.98]",
          featured
            ? "bg-clay text-white hover:bg-clay-dark"
            : "bg-espresso text-cream hover:bg-[#332e28]",
        )}
      >
        Рассчитать
        <ArrowRight weight="bold" className="h-4 w-4" />
      </a>

      <ul className="mt-8 flex flex-col gap-3.5">
        {tariff.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <CheckCircle
              weight="fill"
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                featured ? "text-clay" : "text-clay",
              )}
            />
            <span className={featured ? "text-cream/85" : "text-ink/80"}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
