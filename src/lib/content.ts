import {
  Ruler,
  PencilSimpleLine,
  Truck,
  Wrench,
  ShieldCheck,
  Factory,
  Wallet,
  Medal,
  Gift,
  Tag,
  CubeTransparent,
  CookingPot,
  Drop,
  Handshake,
  ClipboardText,
  Cube,
  House,
  Buildings,
  ArrowsClockwise,
  Key,
  ArrowsIn,
  Couch,
  PaintRoller,
  Plug,
  Package,
  Hammer,
  UsersThree,
  Sun,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { versionedImage } from "@/lib/images";

/* ============================ Доверие ============================ */

export const trustStats: { value: string; label: string }[] = [
  { value: "12 лет", label: "на рынке Беларуси" },
  { value: "2 400+", label: "кухонь установлено" },
  { value: "5 лет", label: "гарантия на мебель" },
  { value: "от 25 дней", label: "срок изготовления" },
];

export const brands: string[] = [
  "Blum",
  "Hettich",
  "EGGER",
  "Kronospan",
  "REHAU",
  "Schock",
];

export const applianceBrands: string[] = [
  "Bosch",
  "Gorenje",
  "Maunfeld",
  "Hansa",
  "Weissgauff",
  "ATLANT",
];

/* ========================== Преимущества ========================== */

export type Advantage = { icon: Icon; title: string; text: string };

export const advantages: Advantage[] = [
  {
    icon: Factory,
    title: "Делаем сами",
    text: "Своё производство в Минске. Отвечаем за каждый шов и не накручиваем цену через посредников.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия 5 лет",
    text: "Если что-то пойдёт не так за 5 лет — приедем и починим. Это гарантия делом, а не строчка в договоре.",
  },
  {
    icon: Wallet,
    title: "Рассрочка 0%",
    text: "Новая кухня сегодня, оплата спокойными частями потом. Без первого взноса, по паспорту, за 15 минут.",
  },
  {
    icon: Medal,
    title: "Фурнитура Blum и Hettich",
    text: "Ящики закрываются мягко и бесшумно даже спустя десять лет. На фурнитуре не экономим.",
  },
];

/* ===================== Сценарии (боли ЦА) ===================== */

export type Scenario = {
  icon: Icon;
  title: string;
  text: string;
  tag: string;
};

export const scenarios: Scenario[] = [
  {
    icon: Buildings,
    title: "Для новостройки",
    text: "Заезжаете в новую квартиру? Учтём расположение стояков и вентиляции, изготовим точно к вашему ремонту.",
    tag: "точно в срок",
  },
  {
    icon: House,
    title: "Для частного дома",
    text: "Нестандартная геометрия и большие площади? Спроектируем удобную кухню под ваши размеры — без компромиссов.",
    tag: "любые размеры",
  },
  {
    icon: ArrowsClockwise,
    title: "Замена старой кухни",
    text: "Старая кухня надоела? Бесплатно демонтируем и вывезем прежнюю, новую соберём по вашим размерам.",
    tag: "демонтаж в подарок",
  },
  {
    icon: Key,
    title: "Для съёмной квартиры",
    text: "Нужно недорого и быстро? Практичная кухня из износостойких материалов по разумной цене.",
    tag: "от 900 BYN/м.п.",
  },
  {
    icon: ArrowsIn,
    title: "Для студии и малогабаритки",
    text: "Мало места? Компактные решения с продуманным хранением — всё под рукой на нескольких метрах.",
    tag: "максимум хранения",
  },
  {
    icon: Couch,
    title: "Кухня-гостиная",
    text: "Объединённое пространство? Кухня красиво продолжит гостиную: барная зона, скрытая техника и аккуратное хранение.",
    tag: "барная зона",
  },
  {
    icon: PaintRoller,
    title: "Новостройка с готовым ремонтом",
    text: "Ремонт уже сделан? Привезём и соберём, не повредив свежую отделку — аккуратно, без штробления и пыли.",
    tag: "без пыли и грязи",
  },
  {
    icon: Plug,
    title: "Перенос розеток и коммуникаций",
    text: "Нужно перенести розетки, воду или вытяжку? Спроектируем кухню с учётом переноса и согласуем схему заранее.",
    tag: "учтём в проекте",
  },
  {
    icon: Package,
    title: "Кухня под ключ с техникой",
    text: "Не хотите бегать по магазинам? Подберём и встроим технику, мойку и смеситель — всё одним заказом.",
    tag: "техника в комплекте",
  },
  {
    icon: Hammer,
    title: "Вторичка и хрущёвка",
    text: "Кривые стены и низкие потолки? Замерим по факту и подгоним кухню так, что неровностей не будет видно.",
    tag: "подгоним по факту",
  },
  {
    icon: UsersThree,
    title: "Для большой семьи",
    text: "Готовите каждый день и на всех? Просторные рабочие зоны и максимум хранения — всему найдётся место.",
    tag: "просторно и удобно",
  },
  {
    icon: Sun,
    title: "Кухня с балконом",
    text: "Присоединили балкон или лоджию? Задействуем каждый метр — рабочую зону или место для завтраков у окна.",
    tag: "каждый метр в дело",
  },
];

/* ============================= Акции ============================= */

export type Promo = {
  id: string;
  badge: string;
  title: string;
  text: string;
  cta: string;
  /** Тон баннера */
  tone: "clay" | "espresso" | "sand";
  icon: Icon;
  /** Фото-фон, если есть (иначе — дизайнерский баннер) */
  image?: string;
};

export const promos: Promo[] = [
  {
    id: "rassrochka",
    badge: "Выгодно",
    title: "Рассрочка 0% до 24 месяцев",
    text: "Без первого взноса и переплат. Оформим за 15 минут по паспорту прямо на замере.",
    cta: "Оформить рассрочку",
    tone: "espresso",
    icon: Wallet,
  },
  {
    id: "technika",
    badge: "Подарок",
    title: "Техника в подарок",
    text: "Закажете кухню от 3 метров — подарим встраиваемую вытяжку или мойку на выбор.",
    cta: "Забрать подарок",
    tone: "clay",
    icon: Gift,
    image: versionedImage("/images/appliance.jpg"),
  },
  {
    id: "skidka",
    badge: "До конца месяца",
    title: "Скидка 10% на проект",
    text: "Решитесь в этом месяце — сделаем скидку 10% на весь гарнитур.",
    cta: "Получить скидку",
    tone: "sand",
    icon: Tag,
  },
  {
    id: "zamer",
    badge: "Бесплатно",
    title: "Замер и 3D-проект — 0 BYN",
    text: "Дизайнер приедет, всё измерит и покажет вашу будущую кухню в 3D. Бесплатно и ни к чему не обязывает.",
    cta: "Вызвать дизайнера",
    tone: "sand",
    icon: PencilSimpleLine,
  },
];

/* ============================ Тарифы ============================ */

export type Tariff = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  featured?: boolean;
};

export const tariffs: Tariff[] = [
  {
    id: "econom",
    name: "Эконом",
    tagline: "Когда нужно надёжно и аккуратно, но без переплат",
    price: "от 900",
    priceNote: "BYN за погонный метр",
    features: [
      "Фасады ЛДСП, кромка ПВХ 2 мм",
      "Столешница ЛДСП 28 мм",
      "Фурнитура с доводчиками",
      "Базовые цвета на выбор",
      "Срок изготовления от 25 дней",
    ],
  },
  {
    id: "optimal",
    name: "Оптимальная",
    tagline: "Золотая середина — её выбирают чаще всего",
    price: "от 1 380",
    priceNote: "BYN за погонный метр",
    featured: true,
    features: [
      "Фасады МДФ: пластик или плёнка",
      "Столешница из искусственного камня",
      "Фурнитура Blum / Hettich",
      "Подсветка рабочей зоны",
      "Более 200 цветов и текстур",
      "Срок изготовления от 30 дней",
    ],
  },
  {
    id: "comfort",
    name: "Комфорт",
    tagline: "Когда хочется по-настоящему своё, без компромиссов",
    price: "от 2 100",
    priceNote: "BYN за погонный метр",
    features: [
      "Фасады: эмаль, шпон или массив",
      "Столешница из кварца или камня",
      "Фурнитура Blum премиум + сенсор",
      "Встроенная техника в комплекте",
      "Дизайн-проект без ограничений",
      "Срок изготовления от 35 дней",
    ],
  },
];

/* ========================= Всё включено ========================= */

export type Included = { icon: Icon; title: string };

export const included: Included[] = [
  { icon: Ruler, title: "Замер" },
  { icon: PencilSimpleLine, title: "Дизайн-проект 3D" },
  { icon: Truck, title: "Доставка" },
  { icon: Wrench, title: "Сборка и монтаж" },
];

/* ============================= Стили ============================= */

export type Style = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const styles: Style[] = [
  {
    id: "modern",
    name: "Современная",
    description: "Гладкие фасады без ручек, минимум деталей",
    image: versionedImage("/images/style-modern.jpg"),
  },
  {
    id: "scandi",
    name: "Скандинавская",
    description: "Светлое дерево, белый и натуральные текстуры",
    image: versionedImage("/images/style-scandi.jpg"),
  },
  {
    id: "neoclassic",
    name: "Неоклассика",
    description: "Сдержанные фрезеровки, латунь и спокойные тона",
    image: versionedImage("/images/style-neoclassic.jpg"),
  },
  {
    id: "classic",
    name: "Классическая",
    description: "Глубокий цвет, рамочные фасады, благородство",
    image: versionedImage("/images/style-classic.jpg"),
  },
  {
    id: "minimal",
    name: "Минимализм",
    description: "Чистые линии, контраст и функциональность",
    image: versionedImage("/images/style-minimal.jpg"),
  },
  {
    id: "loft",
    name: "Лофт",
    description: "Бетон, металл и тёплое дерево, характер индустрии",
    image: versionedImage("/images/style-loft.jpg"),
  },
];

/* =========================== Наши работы =========================== */

export type Project = {
  id: string;
  title: string;
  style: string;
  size: string;
  term: string;
  price: string;
  /** Реальный адрес: ЖК или район — делает проект «живым». */
  location?: string;
  /** Главное фото готовой кухни. ~4:3, от 1200×900. */
  image?: string;
  /** Опц. фото «до» (пустое помещение/старая кухня). Тот же кадр и размер, что image. Включает режим «до/после» на карточке. */
  beforeImage?: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Светлая кухня в современном стиле",
    style: "Современная",
    location: "ЖК «Минск Мир»",
    size: "3,6 м",
    term: "30 дней",
    price: "5 900 BYN",
    image: versionedImage("/images/project-cooking.jpg"),
  },
  {
    id: "p2",
    title: "Открытая планировка с барной зоной",
    style: "Современная",
    location: "ЖК «Маяк Минска»",
    size: "6,0 м",
    term: "38 дней",
    price: "11 200 BYN",
    image: versionedImage("/images/openplan.jpg"),
  },
  {
    id: "p3",
    title: "Кухня-гостиная в новостройке",
    style: "Скандинавская",
    location: "Уручье, Минск",
    size: "4,2 м",
    term: "32 дня",
    price: "6 850 BYN",
    image: versionedImage("/images/hero-kitchen.jpg"),
  },
  {
    id: "p4",
    title: "Неоклассика в спокойных тонах",
    style: "Неоклассика",
    location: "Гродно",
    size: "5,1 м",
    term: "35 дней",
    price: "9 400 BYN",
    image: versionedImage("/images/project-neoclassic.jpg"),
  },
  {
    id: "p5",
    title: "Глубокий зелёный для семьи",
    style: "Классическая",
    location: "д. Боровляны",
    size: "4,8 м",
    term: "34 дня",
    price: "8 700 BYN",
    image: versionedImage("/images/project-family-green.jpg"),
  },
  {
    id: "p6",
    title: "Минимализм для квартиры-студии",
    style: "Минимализм",
    location: "ЖК «Новая Боровая»",
    size: "2,8 м",
    term: "26 дней",
    price: "4 300 BYN",
    image: versionedImage("/images/project-small-studio.jpg"),
  },
];

/* ============================ Материалы ============================ */

export type Material = { icon: Icon; title: string; text: string };

export const materials: Material[] = [
  {
    icon: CubeTransparent,
    title: "Фасады",
    text: "ЛДСП, МДФ в плёнке и пластике, крашеная эмаль, натуральный шпон и массив дуба.",
  },
  {
    icon: Cube,
    title: "Столешницы",
    text: "Искусственный и кварцевый камень, HPL-пластик, массив дерева. Бесшовные стыки.",
  },
  {
    icon: CookingPot,
    title: "Фурнитура",
    text: "Blum и Hettich: доводчики, подъёмники Aventos, выдвижные системы Tandembox.",
  },
  {
    icon: Drop,
    title: "Мойки и смесители",
    text: "Гранитные мойки Schock, нержавеющая сталь, смесители с выдвижным изливом.",
  },
];

/* ============================== Этапы ============================== */

export type Step = { icon: Icon; title: string; text: string };

export const steps: Step[] = [
  {
    icon: ClipboardText,
    title: "Заявка и консультация",
    text: "Обсуждаем задачу, бюджет и сроки. Отвечаем на вопросы по телефону или в мессенджере.",
  },
  {
    icon: Ruler,
    title: "Бесплатный замер",
    text: "Дизайнер приезжает к вам, снимает точные размеры и учитывает все коммуникации.",
  },
  {
    icon: PencilSimpleLine,
    title: "Дизайн-проект и смета",
    text: "Создаём 3D-проект кухни, согласовываем материалы и фиксируем итоговую цену.",
  },
  {
    icon: Handshake,
    title: "Договор",
    text: "Прозрачные условия, сроки и гарантии. Оформляем рассрочку, если нужно.",
  },
  {
    icon: Factory,
    title: "Производство",
    text: "Изготавливаем кухню на собственном производстве из выбранных материалов.",
  },
  {
    icon: Truck,
    title: "Доставка и монтаж",
    text: "Привозим, собираем и подключаем. Убираем за собой — вам остаётся только готовить.",
  },
];

/* ============================== Отзывы ============================== */

export type Review = {
  id: string;
  /** Полное имя — «Ольга Радевич», не «Ольга К.». Так доверяют больше. */
  name: string;
  /** ЖК или район — конкретное место привязывает отзыв к реальности. */
  district: string;
  city: string;
  /** Когда установили — «Март 2025». */
  date: string;
  text: string;
  rating: number;
  /** Фото человека. Квадрат, от 200×200. Нет — покажем инициал. */
  avatar?: string;
  /** Фото ЕГО кухни. ~4:3, от 1000×750. Главный сигнал «настоящее». */
  kitchenPhoto?: string;
  /** Опц. ссылка на видео-отзыв (YouTube/Instagram/файл). */
  video?: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ольга Радевич",
    district: "ЖК «Минск Мир»",
    city: "Минск",
    date: "Март 2025",
    rating: 5,
    text: "Заказывали кухню в новостройку. Дизайнер учёл каждую мелочь, собрали точно в срок. Рассрочка 0% очень выручила — спасибо!",
    // avatar: "/images/reviews/olga.jpg",
    kitchenPhoto: versionedImage("/images/reviews/olga-kitchen.jpg"),
  },
  {
    id: "r2",
    name: "Дмитрий и Анна Кравцовы",
    district: "ЖК «Олимпик Парк»",
    city: "Гродно",
    date: "Январь 2025",
    rating: 5,
    text: "Долго выбирали и не прогадали. Качество фасадов и фурнитуры на высоте, доводчики Blum работают идеально. Доставили даже в область без проблем.",
    // avatar: "/images/reviews/kravtsovy.jpg",
    kitchenPhoto: versionedImage("/images/reviews/kravtsovy-kitchen.jpg"),
  },
  {
    id: "r3",
    name: "Сергей Мельник",
    district: "Центр",
    city: "Брест",
    date: "Ноябрь 2024",
    rating: 5,
    text: "Понравилось, что цену назвали сразу и она не изменилась. 3D-проект помог всё представить заранее. Монтажники аккуратные.",
    // avatar: "/images/reviews/sergey.jpg",
    kitchenPhoto: versionedImage("/images/reviews/sergey-kitchen.jpg"),
  },
  {
    id: "r4",
    name: "Екатерина Вашкевич",
    district: "ЖК «Лебяжий»",
    city: "Минск",
    date: "Сентябрь 2024",
    rating: 5,
    text: "Кухня мечты в неоклассике! Цвет подобрали идеально под интерьер. Через год пользования — ни одного нарекания.",
    // avatar: "/images/reviews/ekaterina.jpg",
    kitchenPhoto: versionedImage("/images/reviews/ekaterina-kitchen.jpg"),
  },
  {
    id: "r5",
    name: "Андрей Сидорович",
    district: "ЖК «Грушевский посад»",
    city: "Минск",
    date: "Февраль 2025",
    rating: 5,
    text: "Стены в хрущёвке кривые, думал намучаемся. Замерщик всё учёл, кухня встала идеально, щелей нет вообще. Приятно удивлён.",
    kitchenPhoto: versionedImage("/images/reviews/andrey-kitchen.jpg"),
  },
  {
    id: "r6",
    name: "Марина Гулевич",
    district: "Фолюш",
    city: "Гродно",
    date: "Декабрь 2024",
    rating: 5,
    text: "Заказывала кухню-гостиную с барной зоной. Дизайнер предложил пару решений по хранению, до которых сама бы не додумалась. Очень довольна.",
    kitchenPhoto: versionedImage("/images/reviews/marina-kitchen.jpg"),
  },
  {
    id: "r7",
    name: "Виталий Жук",
    district: "ЖК «Каскад»",
    city: "Минск",
    date: "Октябрь 2024",
    rating: 4,
    text: "Кухней доволен, качество хорошее. Сроки сдвинулись на несколько дней, но предупредили заранее и компенсировали мелочью. В целом рекомендую.",
    kitchenPhoto: versionedImage("/images/reviews/vitaly-kitchen.jpg"),
  },
  {
    id: "r8",
    name: "Наталья и Игорь",
    district: "Новая Боровая",
    city: "Минск",
    date: "Сентябрь 2024",
    rating: 5,
    text: "Брали тариф «Оптимальная». Камень на столешнице шикарный, подсветка рабочей зоны — то, чего не хватало на старой кухне. Спасибо!",
    kitchenPhoto: versionedImage("/images/reviews/natalya-igor-kitchen.jpg"),
  },
  {
    id: "r9",
    name: "Светлана Ковальчук",
    district: "Центр",
    city: "Гомель",
    date: "Август 2024",
    rating: 5,
    text: "Доставили аж в Гомель без единой царапины. Монтажники собрали за день, подключили технику, всё убрали. Чисто, как будто и не было сборки.",
    kitchenPhoto: versionedImage("/images/reviews/svetlana-kitchen.jpg"),
  },
  {
    id: "r10",
    name: "Павел Романюк",
    district: "Уручье",
    city: "Минск",
    date: "Июль 2024",
    rating: 5,
    text: "Долго сравнивал с другими. Здесь честно показали смету по пунктам, без скрытых доплат в конце. Итоговая цена совпала с той, что назвали на замере.",
    kitchenPhoto: versionedImage("/images/reviews/pavel-kitchen.jpg"),
  },
  {
    id: "r11",
    name: "Елена Тарасевич",
    district: "ЖК «Минск Мир»",
    city: "Минск",
    date: "Июнь 2024",
    rating: 5,
    text: "Неоклассика в светлых тонах — мечтала о такой. Фрезеровка фасадов аккуратная, цвет подобрали тон в тон к плитке. Гости в восторге.",
    kitchenPhoto: versionedImage("/images/reviews/elena-kitchen.jpg"),
  },
  {
    id: "r12",
    name: "Дмитрий Шевчук",
    district: "Зелёный Луг",
    city: "Минск",
    date: "Май 2024",
    rating: 4,
    text: "Кухня отличная, фурнитура Blum работает мягко. Снял звезду только за то, что пришлось пару раз самому напоминать о статусе заказа. По качеству — претензий ноль.",
    kitchenPhoto: versionedImage("/images/reviews/dmitry-shevchuk-kitchen.jpg"),
  },
  {
    id: "r13",
    name: "Ольга Бондаренко",
    district: "Аэродромная",
    city: "Брест",
    date: "Апрель 2024",
    rating: 5,
    text: "Маленькая кухня в студии. Уместили холодильник, посудомойку и кучу ящиков — не верила, что всё влезет. Каждый сантиметр работает.",
    kitchenPhoto: versionedImage("/images/reviews/olga-bondarenko-kitchen.jpg"),
  },
  {
    id: "r14",
    name: "Сергей и Татьяна",
    district: "д. Колодищи",
    city: "Минский р-н",
    date: "Март 2024",
    rating: 5,
    text: "Частный дом, большая кухня нестандартной формы. Спроектировали под наши размеры без компромиссов. Получилось удобно и красиво.",
    kitchenPhoto: versionedImage("/images/reviews/sergey-tatyana-kitchen.jpg"),
  },
  {
    id: "r15",
    name: "Анна Лагун",
    district: "ЖК «Левада»",
    city: "Минск",
    date: "Февраль 2024",
    rating: 5,
    text: "Рассрочку оформили прямо на замере за 15 минут, без первого взноса. Кухня уже стоит, а платим спокойно частями. Очень выручило перед новосельем.",
    kitchenPhoto: versionedImage("/images/reviews/anna-lagun-kitchen.jpg"),
  },
  {
    id: "r16",
    name: "Игорь Савицкий",
    district: "Билево",
    city: "Витебск",
    date: "Январь 2024",
    rating: 5,
    text: "Меняли старую кухню. Прежнюю бесплатно демонтировали и вывезли, новую собрали в тот же день. Никакой возни со свалкой — забрали всё подчистую.",
    kitchenPhoto: versionedImage("/images/reviews/igor-savitsky-kitchen.jpg"),
  },
];

/* ====================== Команда и производство ====================== */

export type TeamMember = {
  /** Реальное имя и фамилия. */
  name: string;
  /** Должность — «Дизайнер-замерщик», «Бригадир монтажа». */
  role: string;
  /** Портрет. Вертикаль ~3:4, от 600×800. Нет — покажем инициалы. */
  photo?: string;
  /** Короткая «человеческая» фраза от первого лица — необязательно. */
  quote?: string;
};

/**
 * Реальные люди компании. Замените имена и положите портреты в
 * /public/images/team/. Лица + имена — главный сигнал «живой компании».
 */
export const team: TeamMember[] = [
  {
    name: "Алексей Руденко",
    role: "Дизайнер-замерщик",
    quote: "Приеду на замер и помогу спланировать кухню под вашу квартиру.",
    photo: versionedImage("/images/team/designer.jpg"),
  },
  {
    name: "Ирина Климович",
    role: "Технолог производства",
    quote: "Слежу, чтобы каждый фасад и распил были без брака.",
    photo: versionedImage("/images/team/technolog.jpg"),
  },
  {
    name: "Павел Мороз",
    role: "Бригадир монтажа",
    quote: "Соберём и подключим аккуратно, уберём за собой.",
    photo: versionedImage("/images/team/montazh.jpg"),
  },
];

export type ProductionShot = {
  /** Подпись под фото — что на нём. */
  caption: string;
  /** Фото с производства. ~4:3, от 1000×750. */
  image?: string;
};

/**
 * Кадры с собственного производства. Положите фото в
 * /public/images/production/. Доказывают, что вы делаете, а не перепродаёте.
 */
export const productionShots: ProductionShot[] = [
  { caption: "Свой цех в Минске", image: versionedImage("/images/production/shop.jpg") },
  { caption: "Раскрой и кромление", image: versionedImage("/images/production/cut.jpg") },
  { caption: "Покрасочная камера", image: versionedImage("/images/production/paint.jpg") },
  { caption: "Сборка и контроль", image: versionedImage("/images/production/assembly.jpg") },
];

/* =============================== FAQ =============================== */

export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "Сколько стоит кухня на заказ?",
    a: "Цена зависит от размера, материалов и фурнитуры. Базовые кухни стартуют от 900 BYN за погонный метр, оптимальные — от 1 400 BYN. Точную стоимость рассчитаем бесплатно после замера. Расчёт на сайте ориентировочный и не является публичной офертой.",
  },
  {
    q: "Сколько времени занимает изготовление?",
    a: "В среднем от 25 до 38 рабочих дней в зависимости от сложности и выбранных материалов. Точный срок фиксируем в договоре.",
  },
  {
    q: "Что входит в стоимость?",
    a: "Замер, дизайн-проект в 3D, доставка и сборка с монтажом — бесплатно и уже учтены. Вы платите только за саму кухню.",
  },
  {
    q: "Как работает рассрочка?",
    a: "Предлагаем рассрочку 0% до 24 месяцев без первого взноса и переплат. Оформление занимает около 15 минут по паспорту, в том числе прямо на замере.",
  },
  {
    q: "Вы работаете только в Минске?",
    a: "Производство и шоурум находятся в Минске, но мы доставляем и монтируем кухни по всей Беларуси — Гродно, Брест, Витебск, Гомель, Могилёв и областные города.",
  },
  {
    q: "Какая гарантия на кухню?",
    a: "Даём 5 лет гарантии на корпус, фасады и фурнитуру, а также сервисное обслуживание после установки.",
  },
];
