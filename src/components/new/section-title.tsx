/** Издательский заголовок секции: номер · рубрика / крупный титул. */
export function SectionTitleNew({
  num,
  eyebrow,
  title,
  className = "",
}: {
  num: string;
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>
      <div className="flex items-baseline gap-4 border-b border-stone pb-5">
        <span className="font-display text-sm font-bold text-clay">{num}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-8 max-w-3xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-6xl">
        {title}
      </h2>
    </div>
  );
}
