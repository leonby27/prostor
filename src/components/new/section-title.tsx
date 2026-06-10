/** Классический заголовок секции: надзаголовок, титул, подзаголовок — по центру. */
export function SectionTitleNew({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-3xl px-5 text-center sm:px-8 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
