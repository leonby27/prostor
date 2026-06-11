import Link from "next/link";
import { site } from "@/lib/site";

export function FooterNew({
  altVersionHref = "/",
  altVersionLabel = "Классическая версия сайта",
}: {
  altVersionHref?: string;
  altVersionLabel?: string;
} = {}) {
  return (
    <footer className="border-t border-stone">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-display text-2xl font-extrabold text-ink">
              {site.brand}
              <span className="text-clay">.</span>
            </p>
            <p className="mt-1 text-sm text-muted">{site.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.address}
              <br />
              {site.hours}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="text-sm">
              <p className="font-semibold uppercase tracking-[0.16em] text-muted">
                Связаться
              </p>
              <a href={site.phone.href} className="mt-3 block font-semibold text-ink">
                {site.phone.display}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="mt-1.5 block text-muted hover:text-ink"
              >
                {site.email}
              </a>
              <div className="mt-3 flex gap-4">
                <a
                  href={site.messengers.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-clay"
                >
                  Telegram
                </a>
                <a
                  href={site.messengers.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-clay"
                >
                  Instagram
                </a>
                <a href={site.messengers.viber} className="text-muted hover:text-clay">
                  Viber
                </a>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold uppercase tracking-[0.16em] text-muted">
                Версии
              </p>
              <Link
                href={altVersionHref}
                className="mt-3 block text-muted hover:text-ink"
              >
                {altVersionLabel}
              </Link>
              <Link href="/privacy" className="mt-1.5 block text-muted hover:text-ink">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-stone pt-6 text-xs leading-relaxed text-muted/70">
          {site.legal.company} · {site.legal.unp} · {site.legal.registration}.{" "}
          {site.legal.regNote}. Расчёты на сайте ориентировочные и не являются
          публичной офертой.
        </p>
      </div>
    </footer>
  );
}
