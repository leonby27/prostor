import {
  MapPin,
  Clock,
  Phone,
  TelegramLogo,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MediaSlot } from "@/components/ui/media-slot";
import { Button } from "@/components/ui/button";
import { ViberIcon } from "@/components/ui/brand-icons";
import { site } from "@/lib/site";

export function Showroom() {
  return (
    <Section id="showroom" tone="sand">
      <SectionHeading
        eyebrow="Контакты"
        title="Приезжайте в шоурум в Минске"
        subtitle="Посмотрите материалы и фасады вживую, обсудите проект с дизайнером за чашкой кофе."
      />

      <Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Фото шоурума */}
          <MediaSlot
            src="/images/showroom.jpg"
            alt="Шоурум «Простор» в Минске"
            label="Фото шоурума"
            aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
            rounded="rounded-3xl"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Инфо + карта */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-stone bg-paper p-7 sm:p-8 dark:border-transparent">
              <ul className="flex flex-col gap-5">
                <ContactRow icon={MapPin} title="Адрес" value={site.address} />
                <ContactRow icon={Clock} title="Режим работы" value={site.hours} />
                <ContactRow
                  icon={Phone}
                  title="Телефон"
                  value={site.phone.display}
                  href={site.phone.href}
                />
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-stone/70 pt-6">
                <span className="text-sm font-medium text-muted">
                  Напишите нам:
                </span>
                <a
                  href={site.messengers.viber}
                  aria-label="Viber"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#7360f2] text-white transition-transform hover:scale-105"
                >
                  <ViberIcon className="h-5 w-5" />
                </a>
                <a
                  href={site.messengers.telegram}
                  aria-label="Telegram"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#2aabee] text-white transition-transform hover:scale-105"
                >
                  <TelegramLogo weight="fill" className="h-5 w-5" />
                </a>
                <a
                  href={site.messengers.instagram}
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] text-white transition-transform hover:scale-105"
                >
                  <InstagramLogo weight="fill" className="h-5 w-5" />
                </a>
              </div>

              <Button href="#quiz" size="lg" className="mt-6 w-full">
                Записаться на визит
              </Button>
            </div>

            {/* Карта */}
            <div className="overflow-hidden rounded-3xl border border-stone shadow-soft dark:border-transparent">
              <iframe
                title="Карта проезда"
                src="https://www.openstreetmap.org/export/embed.html?bbox=27.430%2C53.898%2C27.475%2C53.918&layer=mapnik&marker=53.9080%2C27.4525"
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; weight?: "duotone" }>;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-paper text-clay shadow-soft ring-1 ring-stone">
        <Icon weight="duotone" className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
          {title}
        </span>
        <span className="mt-0.5 block font-medium text-ink">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-4 transition-colors hover:text-clay">
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4">{content}</div>
      )}
    </li>
  );
}
