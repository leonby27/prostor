import { CountUp } from "@/components/ui/count-up";
import { trustStats } from "@/lib/content";

/** Ряд ключевых цифр со счётчиками на хайрлайнах. */
export function Stats() {
  return (
    <section className="border-b border-stone">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {trustStats.map((s, i) => (
          <div
            key={s.label}
            className={`border-stone px-5 py-10 sm:px-8 sm:py-14 ${
              i > 0 ? "border-l max-lg:[&:nth-child(3)]:border-l-0" : ""
            } max-lg:[&:nth-child(n+3)]:border-t`}
          >
            <p className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
