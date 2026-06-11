/** Бренд, контакты, навигация, мессенджеры — единый источник правды. */

export const site = {
  brand: "Простор",
  tagline: "кухни на заказ",
  city: "Минск",
  region: "Доставка и монтаж по всей Беларуси",

  phone: {
    display: "+375 29 123-45-67",
    href: "tel:+375291234567",
  },
  phoneSecondary: {
    display: "+375 33 765-43-21",
    href: "tel:+375337654321",
  },
  email: "hello@prostor.by",

  address: "Минск, ул. Притыцкого, 62 (ТЦ «Простор»), 2 этаж",
  hours: "Ежедневно 10:00 – 20:00",

  messengers: {
    viber: "viber://chat?number=%2B375291234567",
    telegram: "https://t.me/prostor_by",
    instagram: "https://instagram.com/prostor.by",
    whatsapp: "https://wa.me/375291234567",
  },

  guaranteeYears: 5,
  experienceYears: 12,

  // Юридические реквизиты (рыба — заменить на реальные)
  legal: {
    company: "ООО «Простор Мебель»",
    unp: "УНП 000000000",
    registration:
      "Зарегистрировано Мингорисполкомом, свидетельство № 000000 от 01.01.2020",
    regNote:
      "Внесено в Торговый реестр Республики Беларусь",
  },

  cta: {
    primary: "Рассчитать кухню",
    secondary: "Бесплатный замер",
  },
} as const;

/** Якоря навигации (лендинг без раздутого меню — 4–5 пунктов). */
export const nav = [
  { label: "Расчёт", href: "#quiz" },
  { label: "Стили", href: "#styles" },
  { label: "Работы", href: "#gallery" },
  { label: "О нас", href: "#team" },
  { label: "Вопросы", href: "#faq" },
] as const;
