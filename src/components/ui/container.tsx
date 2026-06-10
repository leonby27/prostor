import { cn } from "@/lib/utils";

/** Центрирующий контейнер с единым максимальным размером и боковыми отступами. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
