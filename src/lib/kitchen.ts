/* ============================================================
   Мини-конструктор кухни: модель данных, цены, диапазон, изометрия.
   Цены — ориентировочные (рыба), в BYN.
   ============================================================ */

export type ModuleKind =
  | "drawers"
  | "door"
  | "sink"
  | "stove"
  | "oven"
  | "fridge"
  | "corner_l"
  | "corner_r";

export type ModuleType = {
  id: ModuleKind;
  label: string;
  /** базовая цена за модуль шириной 60 см, BYN */
  base: number;
  /** высокий модуль во всю высоту (холодильник) — без столешницы и верхнего шкафа */
  tall?: boolean;
  /** можно ли менять ширину */
  resizable?: boolean;
  /** угловой модуль — поворачивает ряд на 90° */
  corner?: boolean;
};

export const MODULE_TYPES: ModuleType[] = [
  { id: "drawers", label: "Ящики", base: 240, resizable: true },
  { id: "door", label: "Шкаф", base: 195, resizable: true },
  { id: "sink", label: "Мойка", base: 285, resizable: true },
  { id: "stove", label: "Варочная", base: 330, resizable: true },
  { id: "oven", label: "Духовой шкаф", base: 560 },
  { id: "fridge", label: "Холодильник", base: 760, tall: true },
  { id: "corner_l", label: "Угол левый", base: 320, corner: true },
  { id: "corner_r", label: "Угол правый", base: 320, corner: true },
];

export const moduleType = (id: ModuleKind): ModuleType =>
  MODULE_TYPES.find((m) => m.id === id) ?? MODULE_TYPES[0];

export type Facade = { id: string; name: string; color: string; mult: number };

export const FACADES: Facade[] = [
  { id: "white", name: "Белый матовый", color: "#eceae3", mult: 1.0 },
  { id: "ivory", name: "Слоновая кость", color: "#e2d6bd", mult: 1.05 },
  { id: "cappuccino", name: "Капучино", color: "#c9b79c", mult: 1.1 },
  { id: "oak", name: "Дуб", color: "#c39255", mult: 1.15 },
  { id: "green", name: "Тёмно-зелёный", color: "#3f4d40", mult: 1.2 },
  { id: "blue", name: "Синий вечер", color: "#3c4b5b", mult: 1.2 },
  { id: "graphite", name: "Графит", color: "#3c3c3e", mult: 1.25 },
  { id: "black", name: "Чёрный софт", color: "#262626", mult: 1.3 },
];

export type Counter = {
  id: string;
  name: string;
  color: string;
  perMeter: number;
};

export const COUNTERS: Counter[] = [
  { id: "ldsp", name: "ЛДСП", color: "#d9d0c0", perMeter: 90 },
  { id: "quartz", name: "Кварц", color: "#dccfb8", perMeter: 220 },
  { id: "marble", name: "Мрамор", color: "#ecebe6", perMeter: 280 },
  { id: "stone", name: "Тёмный камень", color: "#4c4a47", perMeter: 300 },
];

export type Hardware = { id: string; name: string; mult: number; note: string };

export const HARDWARE: Hardware[] = [
  { id: "standard", name: "Стандарт", mult: 1.0, note: "надёжная база" },
  { id: "blum", name: "Blum", mult: 1.12, note: "тихие доводчики" },
  {
    id: "blum_premium",
    name: "Blum премиум",
    mult: 1.25,
    note: "сенсорное открывание",
  },
];

export const facadeById = (id: string) =>
  FACADES.find((f) => f.id === id) ?? FACADES[0];
export const counterById = (id: string) =>
  COUNTERS.find((c) => c.id === id) ?? COUNTERS[0];
export const hardwareById = (id: string) =>
  HARDWARE.find((h) => h.id === id) ?? HARDWARE[0];

/* ----------------------------- Состояние ----------------------------- */

export type KModule = { uid: string; kind: ModuleKind; width: number };

export type KitchenState = {
  modules: KModule[];
  facadeId: string;
  counterId: string;
  hardwareId: string;
  wall: boolean;
  // что пользователь уже осознанно настроил (для сужения диапазона)
  decided: {
    facade: boolean;
    counter: boolean;
    hardware: boolean;
    wall: boolean;
  };
};

export const DEFAULT_KITCHEN: KitchenState = {
  modules: [
    { uid: "m1", kind: "drawers", width: 60 },
    { uid: "m2", kind: "sink", width: 60 },
    { uid: "m3", kind: "stove", width: 60 },
  ],
  facadeId: "white",
  counterId: "quartz",
  hardwareId: "standard",
  wall: true,
  decided: { facade: false, counter: false, hardware: false, wall: false },
};

/* ------------------------------- Цена -------------------------------- */

export function priceOf(state: KitchenState): number {
  const facade = facadeById(state.facadeId);
  const hw = hardwareById(state.hardwareId);
  const counter = counterById(state.counterId);

  let cabinets = 0;
  let counterCm = 0;

  for (const m of state.modules) {
    const t = moduleType(m.kind);
    const wf = m.width / 60;
    cabinets += t.base * wf * facade.mult * hw.mult;
    if (!t.tall) counterCm += m.width;

    // верхний шкаф над обычными модулями
    if (state.wall && !t.tall && !t.corner) {
      cabinets += 165 * wf * facade.mult;
    }
  }

  const counterCost = (counterCm / 100) * counter.perMeter;
  const total = cabinets + counterCost;
  return Math.round(total / 10) * 10;
}

export type PriceRange = {
  min: number;
  max: number;
  total: number;
  /** относительная ширина коридора, 0..1 (меньше — точнее) */
  spread: number;
  empty: boolean;
};

export function priceRange(state: KitchenState): PriceRange {
  if (state.modules.length === 0) {
    return { min: 3000, max: 12000, total: 0, spread: 1, empty: true };
  }
  const total = priceOf(state);

  let spread = 0.34;
  if (state.modules.length >= 3) spread -= 0.06;
  if (state.modules.length >= 5) spread -= 0.03;
  if (state.decided.facade) spread -= 0.07;
  if (state.decided.counter) spread -= 0.07;
  if (state.decided.hardware) spread -= 0.06;
  if (state.decided.wall) spread -= 0.03;
  spread = Math.max(spread, 0.08);

  const min = Math.round((total * (1 - spread)) / 50) * 50;
  const max = Math.round((total * (1 + spread)) / 50) * 50;
  return { min, max, total, spread, empty: false };
}

export const runLengthCm = (state: KitchenState) =>
  state.modules.reduce((s, m) => s + m.width, 0);

/* --------------------------- Изометрия ------------------------------- */

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

/** Изометрическая проекция (cm -> экранные cm). y=0 — у стены, y растёт к зрителю. */
export function project(x: number, y: number, z: number) {
  return {
    x: (x - y) * COS30,
    y: (x + y) * SIN30 - z,
  };
}

/* ----------------- Геометрия раскладки (см) ----------------- */

export const KD = 58; // глубина нижнего ряда
export const KH = 82; // высота нижнего ряда
export const KCT = 4; // толщина столешницы
export const KOV = 3; // свес столешницы
export const KWD = 32; // глубина верхних шкафов
export const KWZ = 142; // низ верхних шкафов
export const KWH = 70; // высота верхних шкафов
export const KTALL = 212; // высота высокого модуля

export type V = { x: number; y: number };
const add = (a: V, b: V): V => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a: V, s: number): V => ({ x: a.x * s, y: a.y * s });

/** Перпендикуляр к dir, смотрящий «к зрителю» (большая сумма x+y). */
function depthFor(dir: V): V {
  const a = { x: dir.y, y: -dir.x };
  const b = { x: -dir.y, y: dir.x };
  return a.x + a.y >= b.x + b.y ? a : b;
}

export type PlacedModule = {
  uid: string;
  kind: ModuleKind;
  /** 4 угла основания: [тыл-старт, тыл-конец, фронт-конец, фронт-старт] */
  floor: [V, V, V, V];
  z0: number;
  z1: number;
  tall: boolean;
  corner: boolean;
  counter: boolean;
  wall: boolean;
  dir: V;
  depth: V;
};

/** Раскладка модулей по ломаной с поворотами на угловых. */
export function layoutModules(state: KitchenState): PlacedModule[] {
  const out: PlacedModule[] = [];
  let pos: V = { x: 0, y: 0 };
  let dir: V = { x: 1, y: 0 };
  let depth: V = depthFor(dir);

  for (const m of state.modules) {
    const t = moduleType(m.kind);
    if (t.corner) {
      const s = KD;
      const c0 = pos;
      const c1 = add(pos, mul(dir, s));
      const c2 = add(c1, mul(depth, s));
      const c3 = add(pos, mul(depth, s));
      out.push({
        uid: m.uid,
        kind: m.kind,
        floor: [c0, c1, c2, c3],
        z0: 0,
        z1: KH,
        tall: false,
        corner: true,
        counter: true,
        wall: false,
        dir,
        depth,
      });
      const ndir: V =
        m.kind === "corner_r"
          ? { x: -dir.y, y: dir.x } // поворот +90°
          : { x: dir.y, y: -dir.x }; // поворот −90°
      pos = c1;
      dir = ndir;
      depth = depthFor(ndir);
    } else {
      const w = m.width;
      const c0 = pos;
      const c1 = add(pos, mul(dir, w));
      const c2 = add(c1, mul(depth, KD));
      const c3 = add(pos, mul(depth, KD));
      out.push({
        uid: m.uid,
        kind: m.kind,
        floor: [c0, c1, c2, c3],
        z0: 0,
        z1: t.tall ? KTALL : KH,
        tall: !!t.tall,
        corner: false,
        counter: !t.tall,
        wall: state.wall && !t.tall,
        dir,
        depth,
      });
      pos = c1;
    }
  }
  return out;
}

/** Ориентировочная стоимость добавления модуля при текущих настройках. */
export function moduleAddCost(state: KitchenState, kind: ModuleKind): number {
  const t = moduleType(kind);
  const f = facadeById(state.facadeId);
  const hw = hardwareById(state.hardwareId);
  let c = t.base * f.mult * hw.mult;
  if (state.wall && !t.tall && !t.corner) c += 165 * f.mult;
  return Math.round(c / 10) * 10;
}

export const LAYOUT_PRESETS: {
  id: string;
  label: string;
  kinds: ModuleKind[];
  wall: boolean;
}[] = [
  {
    id: "straight",
    label: "Прямая",
    kinds: ["drawers", "sink", "stove", "drawers"],
    wall: true,
  },
  {
    id: "corner",
    label: "Угловая",
    kinds: ["drawers", "sink", "corner_r", "stove", "drawers"],
    wall: true,
  },
  {
    id: "u",
    label: "П-образная",
    kinds: ["drawers", "sink", "corner_r", "stove", "corner_l", "drawers"],
    wall: true,
  },
];

/** Осветлить/затемнить hex-цвет на p (−1..1). */
export function shade(hex: string, p: number): string {
  const h = hex.replace("#", "");
  const num = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  const t = p < 0 ? 0 : 255;
  const a = Math.abs(p);
  r = Math.round((t - r) * a + r);
  g = Math.round((t - g) * a + g);
  b = Math.round((t - b) * a + b);
  return `rgb(${r}, ${g}, ${b})`;
}
