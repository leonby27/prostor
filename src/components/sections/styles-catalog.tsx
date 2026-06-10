import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { styles, type Style } from "@/lib/content";
import { cn } from "@/lib/utils";

export function StylesCatalog() {
  return (
    <Section id="styles" tone="paper">
      <SectionHeading
        eyebrow="Стили"
        title="Найдём стиль под ваш интерьер"
        subtitle="От лаконичного минимализма до тёплой классики — подберём решение, которое подходит именно вам."
      />

      <RevealGroup className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {styles.map((s, i) => (
          <RevealItem
            key={s.id}
            className={cn(i === 0 && "col-span-2 lg:row-span-2")}
          >
            <StyleCard style={s} large={i === 0} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function StyleCard({ style, large }: { style: Style; large?: boolean }) {
  return (
    <a
      href="#quiz"
      className={cn(
        "group relative block h-full overflow-hidden rounded-2xl",
        large ? "min-h-[18rem] lg:min-h-[28rem]" : "min-h-[12rem] lg:min-h-[13.5rem]",
      )}
    >
      <Image
        src={style.image}
        alt={`Кухня в стиле «${style.name}»`}
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <h3
            className={cn(
              "font-display font-bold text-white",
              large ? "text-2xl sm:text-3xl" : "text-lg",
            )}
          >
            {style.name}
          </h3>
          <p
            className={cn(
              "mt-1 text-white/75",
              large ? "max-w-md text-sm" : "hidden text-xs sm:block",
            )}
          >
            {style.description}
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-clay group-hover:rotate-45">
          <ArrowUpRight weight="bold" className="h-5 w-5" />
        </span>
      </div>
    </a>
  );
}
