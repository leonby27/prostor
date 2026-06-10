import { cn } from "@/lib/utils";
import { Container } from "./container";

type Tone = "paper" | "sand" | "espresso";

const toneClasses: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  espresso: "bg-espresso text-cream",
};

/** Вертикальная секция с фоном-тоном и стандартными вертикальными отступами. */
export function Section({
  id,
  tone = "paper",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 sm:py-28",
        toneClasses[tone],
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
