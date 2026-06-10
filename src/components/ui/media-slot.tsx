import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Слот под изображение.
 * - Если передан `src` — рендерит оптимизированное фото (next/image, fill, object-cover).
 * - Если `src` нет — показывает аккуратную брендовую заглушку с подписью.
 * Заменить заглушку на реальное фото = добавить один файл/URL в данные.
 */
export function MediaSlot({
  src,
  alt = "",
  label = "Фото",
  className,
  aspect = "aspect-[4/3]",
  rounded = "rounded-2xl",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  overlayClassName,
  children,
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  aspect?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
  /** Доп. слой поверх (бейджи, текст в hero и т.п.) */
  overlayClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-sand",
        aspect,
        rounded,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Placeholder label={label} />
      )}
      {children && (
        <div className={cn("absolute inset-0", overlayClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sand via-stone/50 to-stone text-ink"
      aria-hidden
    >
      {/* Тонкий узор-сетка */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, currentColor 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper/80 text-clay shadow-soft ring-1 ring-stone">
          <PhotoIcon className="h-6 w-6" />
        </span>
        <span className="text-sm font-medium text-muted">{label}</span>
      </div>
    </div>
  );
}

function PhotoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 16l-4.5-4.5L7 21" />
    </svg>
  );
}
