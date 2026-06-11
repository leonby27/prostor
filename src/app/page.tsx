import { Header } from "@/components/sections/header";
import { HeroNew } from "@/components/new/hero";
import { TickerNew } from "@/components/new/ticker";
import { StatsNew } from "@/components/new/stats";
import { Scenarios } from "@/components/sections/scenarios";
import { Advantages } from "@/components/sections/advantages";
import { Promos } from "@/components/sections/promos";
import { Included } from "@/components/sections/included";
import { StylesCatalog } from "@/components/sections/styles-catalog";
import { QuizSimple } from "@/components/sections/quiz-simple";
import { Gallery } from "@/components/sections/gallery";
import { Materials } from "@/components/sections/materials";
import { Appliances } from "@/components/sections/appliances";
import { Steps } from "@/components/sections/steps";
import { Team } from "@/components/sections/team";
import { Reviews } from "@/components/sections/reviews";
import { Showroom } from "@/components/sections/showroom";
import { Faq } from "@/components/sections/faq";
import { CtaNew } from "@/components/new/cta";
import { FooterNew } from "@/components/new/footer";
import { FloatingActions } from "@/components/sections/floating-actions";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: `${site.brand} — кухни на заказ`,
  description:
    "Кухни на заказ от производителя в Минске. Бесплатный замер и 3D-проект, рассрочка 0%, гарантия 5 лет.",
  url: "https://prostor.by",
  telephone: site.phone.display,
  email: site.email,
  priceRange: "900–2200 BYN/м.п.",
  areaServed: "BY",
  openingHours: "Mo-Su 10:00-20:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Притыцкого, 62",
    addressLocality: "Минск",
    addressCountry: "BY",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.908, longitude: 27.4525 },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "320",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <HeroNew worksHref="#gallery" />
        <TickerNew />
        <StatsNew />
        <Scenarios />
        <Advantages />
        <Promos />
        <Included />
        <StylesCatalog />
        <QuizSimple />
        <Gallery />
        <Reviews />
        <Materials />
        <Appliances />
        <Steps />
        <Team />
        <Showroom />
        <Faq />
        <CtaNew source="Лендинг (главная)" />
      </main>
      <FooterNew />
      <FloatingActions />
    </>
  );
}
