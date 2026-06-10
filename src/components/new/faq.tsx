import { Plus } from "@phosphor-icons/react/dist/ssr";
import { SectionTitleNew } from "./section-title";
import { faq } from "@/lib/content";

/** Аккордеон на нативных details/summary — доступно и без JS. */
export function FaqNew() {
  return (
    <section id="faq" className="pt-24 sm:pt-32">
      <SectionTitleNew num="06" eyebrow="Вопросы" title="Спрашивают перед заказом" />

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <div className="divide-y divide-stone border-y border-stone">
          {faq.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                  {item.q}
                </h3>
                <Plus
                  weight="bold"
                  className="h-5 w-5 shrink-0 text-clay transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-3xl pb-7 leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
