import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Стандартная «шапка» секции: надзаголовок, заголовок, подзаголовок. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
            isLight ? "text-clay" : "text-clay-dark",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "max-w-3xl text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-[2.75rem]",
          isLight ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            isLight ? "text-cream/70" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
