import { Star } from "@phosphor-icons/react/dist/ssr";
import { SectionTitleNew } from "./section-title";
import { reviews, type Review } from "@/lib/content";

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="w-[20rem] shrink-0 rounded-2xl border border-stone bg-sand p-6 sm:w-[24rem]">
      <div className="flex" aria-label={`Оценка ${r.rating} из 5`}>
        {Array.from({ length: r.rating }).map((_, i) => (
          <Star key={i} weight="fill" className="h-3.5 w-3.5 text-clay" />
        ))}
      </div>
      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink/90">
        {r.text}
      </p>
      <footer className="mt-4 flex items-center gap-3">
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

/** Две встречные ленты отзывов. CSS-marquee, на hover — пауза. */
export function ReviewsNew() {
  const rowA = reviews.slice(0, 8);
  const rowB = reviews.slice(8);

  return (
    <section id="reviews" className="pt-24 sm:pt-32">
      <SectionTitleNew
        num="05"
        eyebrow="Отзывы · 4.9 из 5"
        title="Что говорят на новых кухнях"
      />

      <div className="mt-12 space-y-5">
        {[
          { row: rowA, reverse: false, duration: "80s" },
          { row: rowB, reverse: true, duration: "92s" },
        ].map(({ row, reverse, duration }, i) => (
          <div key={i} className="v2-marquee-mask overflow-hidden">
            <div
              className={`v2-marquee gap-5 pr-5 ${reverse ? "v2-marquee--reverse" : ""}`}
              style={{ "--marquee-duration": duration } as React.CSSProperties}
            >
              {[...row, ...row].map((r, j) => (
                <ReviewCard key={`${r.id}-${j}`} r={r} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
