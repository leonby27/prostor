import { Star } from "@phosphor-icons/react/dist/ssr";
import { SectionTitleNew } from "./section-title";
import { reviews, type Review } from "@/lib/content";

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-stone bg-sand p-6">
      <div className="flex" aria-label={`Оценка ${r.rating} из 5`}>
        {Array.from({ length: r.rating }).map((_, i) => (
          <Star key={i} weight="fill" className="h-3.5 w-3.5 text-clay" />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/90">{r.text}</p>
      <footer className="mt-5 flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay-soft font-display text-sm font-bold text-clay">
          {r.name[0]}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">{r.name}</p>
          <p className="text-xs text-muted">
            {r.district}, {r.city} · {r.date}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function ReviewsNew() {
  const shown = reviews.slice(0, 6);

  return (
    <section id="reviews" className="scroll-mt-20 pt-24 sm:pt-32">
      <SectionTitleNew
        eyebrow="Отзывы"
        title="Что говорят на новых кухнях"
        subtitle="4.9 из 5 по 320+ отзывам — с реальными именами, районами и датами установки."
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {shown.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
}
