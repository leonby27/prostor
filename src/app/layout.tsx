import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prostor.by"),
  title: {
    default: "Простор — кухни на заказ в Минске и по всей Беларуси",
    template: "%s · Простор",
  },
  description:
    "Кухни на заказ от производителя. Бесплатный замер и 3D-проект, рассрочка 0%, гарантия 5 лет. Доставка и сборка по всей Беларуси.",
  keywords: [
    "кухни на заказ",
    "кухни Минск",
    "кухни в рассрочку",
    "кухни от производителя",
    "Беларусь",
  ],
  openGraph: {
    title: "Простор — кухни на заказ в Беларуси",
    description:
      "Бесплатный замер и 3D-проект, рассрочка 0%, гарантия 5 лет. Производство в Минске.",
    locale: "ru_BY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Ставим тему до первой отрисовки: по умолчанию светлая,
            тёмная — только если пользователь явно её выбрал. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
