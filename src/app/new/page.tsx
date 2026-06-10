import type { Metadata } from "next";
import { HeaderNew } from "@/components/new/header";
import { HeroNew } from "@/components/new/hero";
import { TickerNew } from "@/components/new/ticker";
import { StatsNew } from "@/components/new/stats";
import { WorksNew } from "@/components/new/works";
import { PricingNew } from "@/components/new/pricing";
import { QuizNew } from "@/components/new/quiz";
import { ProcessNew } from "@/components/new/process";
import { ReviewsNew } from "@/components/new/reviews";
import { FaqNew } from "@/components/new/faq";
import { CtaNew } from "@/components/new/cta";
import { FooterNew } from "@/components/new/footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Кухни на заказ — новая версия",
  description:
    "Кухня, в которой хочется жить. Своё производство в Минске, от 900 BYN за метр, рассрочка 0%, гарантия 5 лет.",
  robots: { index: false }, // черновик дизайна — не индексируем, пока сравниваем
};

export default function NewPage() {
  return (
    <div className="v2 min-h-screen bg-paper text-ink">
      {/* Тема v2 до первой отрисовки: по умолчанию тёмная,
          светлая — если пользователь её выбрал (ключ theme-v2). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{if(localStorage.getItem('theme-v2')==='light')document.documentElement.classList.add('v2-light');}catch(e){}})();`,
        }}
      />
      <HeaderNew />
      <main>
        <HeroNew />
        <TickerNew />
        <StatsNew />
        <WorksNew />
        <PricingNew />
        <QuizNew />
        <ProcessNew />
        <ReviewsNew />
        <FaqNew />
        <CtaNew />
      </main>
      <FooterNew />

      {/* Липкий CTA на мобильных — телефон + замер всегда под пальцем */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-stone bg-paper/90 p-3 backdrop-blur-md lg:hidden">
        <a
          href={site.phone.href}
          className="flex h-12 flex-1 items-center justify-center rounded-full border border-stone text-sm font-semibold text-ink"
        >
          Позвонить
        </a>
        <a
          href="#lead"
          className="flex h-12 flex-[1.4] items-center justify-center rounded-full bg-clay text-sm font-semibold text-white"
        >
          Бесплатный замер
        </a>
      </div>
    </div>
  );
}
