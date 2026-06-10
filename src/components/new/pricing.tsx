import { Check } from "@phosphor-icons/react/dist/ssr";
import { SectionTitleNew } from "./section-title";
import { tariffs } from "@/lib/content";

export function PricingNew() {
  return (
    <section id="pricing" className="pt-24 sm:pt-32">
      <SectionTitleNew
        eyebrow="Цены"
        title="Три честные комплектации"
        subtitle="Замер, 3D-проект, доставка и монтаж уже в цене — в любой из них."
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-3">
        {tariffs.map((t) => {
          const featured = t.featured;
          return (
            <article
              key={t.id}
              className={`flex flex-col rounded-2xl border p-8 ${
                featured
                  ? "border-cream bg-cream text-espresso"
                  : "border-stone bg-sand"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`font-display text-xl font-extrabold ${
                    featured ? "text-espresso" : "text-ink"
                  }`}
                >
                  {t.name}
                </h3>
                {featured && (
                  <span className="rounded-full bg-clay px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    выбирают чаще
                  </span>
                )}
              </div>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  featured ? "text-espresso/70" : "text-muted"
                }`}
              >
                {t.tagline}
              </p>

              <p className="mt-6 font-display">
                <span
                  className={`text-5xl font-extrabold tracking-tight ${
                    featured ? "text-espresso" : "text-ink"
                  }`}
                >
                  {t.price}
                </span>
                <span
                  className={`ml-2 text-sm ${
                    featured ? "text-espresso/60" : "text-muted"
                  }`}
                >
                  {t.priceNote}
                </span>
              </p>

              <ul className="mt-7 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                      featured ? "text-espresso/85" : "text-ink/85"
                    }`}
                  >
                    <Check
                      weight="bold"
                      className="mt-0.5 h-4 w-4 shrink-0 text-clay"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#quiz"
                className={`mt-8 inline-flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${
                  featured
                    ? "bg-clay text-white hover:bg-clay-dark"
                    : "border border-stone text-ink hover:border-clay/50 hover:text-clay"
                }`}
              >
                Рассчитать в этой комплектации
              </a>
            </article>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-7xl px-5 text-sm text-muted sm:px-8">
        В любой комплектации замер, 3D-проект, доставка и монтаж уже в цене.
        Точную стоимость зафиксируем в договоре после бесплатного замера.
      </p>
    </section>
  );
}
