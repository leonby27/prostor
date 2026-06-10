import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { trustStats, brands } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="border-y border-stone bg-paper">
      <Container className="py-10 sm:py-12">
        {/* Цифры */}
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {trustStats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <dt className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Бренды */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-stone/70 pt-8 sm:flex-row sm:justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Работаем с проверенными брендами
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {brands.map((b) => (
                <span
                  key={b}
                  className="font-display text-lg font-bold tracking-tight text-ink/35"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
