import {
  Phone,
  EnvelopeSimple,
  MapPin,
  Clock,
  TelegramLogo,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ViberIcon } from "@/components/ui/brand-icons";
import { site, nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <Container className="pt-16 pb-28 sm:py-20">
        {/* Колонки */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Кухни на заказ от производителя. Рисуем, делаем и собираем сами —
              по всему Минску и Беларуси.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={site.messengers.viber}
                aria-label="Viber"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-[#7360f2]"
              >
                <ViberIcon className="h-5 w-5" />
              </a>
              <a
                href={site.messengers.telegram}
                aria-label="Telegram"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-[#2aabee]"
              >
                <TelegramLogo weight="fill" className="h-5 w-5" />
              </a>
              <a
                href={site.messengers.instagram}
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-[#d62976]"
              >
                <InstagramLogo weight="fill" className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream/50">
              Навигация
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-cream/75 transition-colors hover:text-clay"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream/50">
              Контакты
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-cream/75">
              <li className="flex items-start gap-2.5">
                <Phone weight="duotone" className="mt-0.5 h-4 w-4 text-clay" />
                <a href={site.phone.href} className="hover:text-clay">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <EnvelopeSimple
                  weight="duotone"
                  className="mt-0.5 h-4 w-4 text-clay"
                />
                <a href={`mailto:${site.email}`} className="hover:text-clay">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock weight="duotone" className="mt-0.5 h-4 w-4 text-clay" />
                {site.hours}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream/50">
              Адрес
            </h3>
            <p className="mt-4 flex items-start gap-2.5 text-sm text-cream/75">
              <MapPin weight="duotone" className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
              {site.address}
            </p>
          </div>
        </div>

        {/* Юр-реквизиты */}
        <div className="mt-14 border-t border-cream/10 pt-8">
          <p className="text-xs leading-relaxed text-cream/45">
            {site.legal.company} · {site.legal.unp}. {site.legal.registration}.{" "}
            {site.legal.regNote}. Работаем по договору. Гарантия{" "}
            {site.guaranteeYears} лет. Информация на сайте носит справочный
            характер и не является публичной офертой.
          </p>
          <div className="mt-5 flex flex-col items-start justify-between gap-3 text-xs text-cream/45 sm:flex-row sm:items-center">
            <p>
              © {2026} {site.brand}. Кухни на заказ в Минске и по всей Беларуси.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="transition-colors hover:text-clay"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
