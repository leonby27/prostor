import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных компании «Простор».",
};

const sections = [
  {
    h: "1. Общие положения",
    p: "Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта. Оставляя заявку, вы соглашаетесь с условиями настоящей Политики.",
  },
  {
    h: "2. Какие данные мы собираем",
    p: "Мы собираем имя и номер телефона, которые вы указываете в формах на сайте, а также технические данные (cookies, информацию о посещении) для улучшения работы сайта.",
  },
  {
    h: "3. Цели обработки",
    p: "Данные используются для связи с вами по вашей заявке, подготовки расчёта стоимости, согласования замера и информирования об акциях (с вашего согласия).",
  },
  {
    h: "4. Передача третьим лицам",
    p: "Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Республики Беларусь.",
  },
  {
    h: "5. Хранение и защита",
    p: "Данные хранятся не дольше, чем это необходимо для целей обработки, и защищены организационными и техническими мерами от несанкционированного доступа.",
  },
  {
    h: "6. Ваши права",
    p: "Вы вправе отозвать согласие на обработку персональных данных, запросить их изменение или удаление, написав нам на " +
      site.email +
      ".",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-stone">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" aria-label={site.brand}>
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-clay"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            На главную
          </Link>
        </Container>
      </header>

      <Container className="py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Политика конфиденциальности
          </h1>
          <p className="mt-3 text-muted">
            {site.legal.company} · {site.legal.unp}
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-lg font-bold text-ink">
                  {s.h}
                </h2>
                <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-2xl bg-sand/60 p-5 text-sm text-muted">
            Это типовой образец (рыба). Перед публикацией замените текст на
            юридически выверенную политику в соответствии с Законом Республики
            Беларусь «О защите персональных данных».
          </p>
        </div>
      </Container>
    </div>
  );
}
