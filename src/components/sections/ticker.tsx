import { promos } from "@/lib/content";

function Row({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 font-display text-sm font-bold uppercase tracking-[0.14em] text-cream/90 sm:text-base">
            {t}
          </span>
          <span aria-hidden className="text-clay">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

/** Бегущая промо-строка. Чистый CSS (keyframes в globals), без JS. */
export function Ticker() {
  const items = promos.map((p) => p.title);

  return (
    <div
      className="marquee-mask mt-16 overflow-hidden border-y border-stone bg-espresso py-4"
      aria-label={items.join(" · ")}
    >
      <div
        className="marquee"
        style={{ "--marquee-duration": "28s" } as React.CSSProperties}
      >
        <Row items={items} />
        <Row items={items} />
      </div>
    </div>
  );
}
