import { SectionTitleNew } from "./section-title";
import { advantages } from "@/lib/content";

/** Классический ряд преимуществ: 4 карточки с иконками. */
export function AdvantagesNew() {
  return (
    <section className="pt-24 sm:pt-32">
      <SectionTitleNew
        eyebrow="Почему мы"
        title="Делаем сами — отвечаем сами"
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {advantages.map((a) => (
          <article
            key={a.title}
            className="rounded-2xl border border-stone bg-sand p-7 transition-all duration-300 hover:border-clay/30 hover:shadow-card"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-soft text-clay">
              <a.icon weight="duotone" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ink">
              {a.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
