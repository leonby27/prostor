import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Логотип «Простор»: знак-кухня + вордмарк. */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const textColor = tone === "light" ? "text-cream" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="grid h-9 w-9 place-items-center rounded-xl bg-clay text-white shadow-soft"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect
            x="3.5"
            y="4.5"
            width="17"
            height="15"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 4.5v15M3.5 12h17"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="9" cy="8.2" r="0.9" fill="currentColor" />
          <circle cx="15" cy="8.2" r="0.9" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tight",
            textColor,
          )}
        >
          {site.brand}
        </span>
        <span
          className={cn(
            "text-[0.625rem] font-medium uppercase tracking-[0.22em]",
            tone === "light" ? "text-cream/55" : "text-muted",
          )}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
