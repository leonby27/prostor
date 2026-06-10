"use client";

import {
  shade,
  facadeById,
  counterById,
  layoutModules,
  KWD,
  type KitchenState,
  type V,
} from "@/lib/kitchen";

/**
 * План кухни — вид сверху (2D).
 * Надёжно отображает прямые, угловые (L) и П-образные раскладки:
 * модули стыкуются точно, верхние шкафы показаны пунктиром (конвенция планов).
 */

const lerp = (a: V, b: V, t: number): V => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

export function IsoKitchen({
  state,
  highlightUid,
}: {
  state: KitchenState;
  highlightUid?: string;
}) {
  const facade = facadeById(state.facadeId);
  const counter = counterById(state.counterId);
  const placed = layoutModules(state);

  const fc = facade.color;
  const cc = counter.color;
  const worktopStroke = shade(cc, -0.22);
  const facadeStroke = shade(fc, -0.2);
  const symbol = shade(cc, -0.45);

  // границы плана
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const track = (v: V) => {
    if (v.x < minX) minX = v.x;
    if (v.x > maxX) maxX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.y > maxY) maxY = v.y;
  };
  placed.forEach((m) => m.floor.forEach(track));
  // запас на верхние шкафы (они в пределах основания) и подписи
  if (!isFinite(minX)) {
    minX = 0;
    minY = 0;
    maxX = 240;
    maxY = 60;
  }

  const S = (v: V) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`;
  const poly = (arr: V[]) => arr.map(S).join(" ");

  const wallLines: React.ReactNode[] = [];
  const worktops: React.ReactNode[] = [];
  const fronts: React.ReactNode[] = [];
  const details: React.ReactNode[] = [];
  const wallCabs: React.ReactNode[] = [];
  const highlights: React.ReactNode[] = [];

  placed.forEach((m) => {
    const [c0, c1, c2, c3] = m.floor;
    // bilinear point: f вдоль ряда (c0->c1), g по глубине (к фронту c3/c2)
    const pt = (f: number, g: number) =>
      lerp(lerp(c0, c1, f), lerp(c3, c2, f), g);

    // стена вдоль тыльной стороны
    wallLines.push(
      <line
        key={`wall-${m.uid}`}
        x1={c0.x}
        y1={c0.y}
        x2={c1.x}
        y2={c1.y}
        stroke="#2a2620"
        strokeWidth={3.2}
        strokeLinecap="round"
      />,
    );

    // основание модуля (столешница / корпус)
    const isFridge = m.tall;
    worktops.push(
      <polygon
        key={`wt-${m.uid}`}
        points={poly([c0, c1, c2, c3])}
        fill={isFridge ? "#e7e2d8" : cc}
        stroke={isFridge ? "#cfc7b8" : worktopStroke}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />,
    );

    // полоса фасада у фронтовой кромки (отражает выбранный цвет)
    if (!isFridge) {
      const band = 8;
      const fb0 = c3;
      const fb1 = c2;
      const fb2 = { x: c2.x - m.depth.x * band, y: c2.y - m.depth.y * band };
      const fb3 = { x: c3.x - m.depth.x * band, y: c3.y - m.depth.y * band };
      fronts.push(
        <polygon
          key={`fr-${m.uid}`}
          points={poly([fb0, fb1, fb2, fb3])}
          fill={fc}
          stroke={facadeStroke}
          strokeWidth={0.8}
        />,
      );
    }

    // символы приборов / разбивка
    if (m.kind === "sink") {
      details.push(
        <polygon
          key={`sk-${m.uid}`}
          points={poly([pt(0.22, 0.25), pt(0.78, 0.25), pt(0.78, 0.72), pt(0.22, 0.72)])}
          fill="none"
          stroke={symbol}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />,
      );
      const f = pt(0.3, 0.16);
      details.push(<circle key={`fa-${m.uid}`} cx={f.x} cy={f.y} r={2.6} fill={symbol} />);
    } else if (m.kind === "stove") {
      [
        [0.35, 0.36],
        [0.65, 0.36],
        [0.35, 0.66],
        [0.65, 0.66],
      ].forEach(([f, g], i) => {
        const p = pt(f, g);
        details.push(
          <circle key={`bn-${m.uid}-${i}`} cx={p.x} cy={p.y} r={4} fill="none" stroke={symbol} strokeWidth={1.5} />,
        );
      });
    } else if (m.kind === "oven") {
      details.push(
        <polygon
          key={`ov-${m.uid}`}
          points={poly([pt(0.2, 0.22), pt(0.8, 0.22), pt(0.8, 0.75), pt(0.2, 0.75)])}
          fill="none"
          stroke={symbol}
          strokeWidth={1.6}
        />,
      );
    } else if (isFridge) {
      // символ холодильника — крест
      details.push(
        <line key={`fx1-${m.uid}`} x1={pt(0.18, 0.2).x} y1={pt(0.18, 0.2).y} x2={pt(0.82, 0.8).x} y2={pt(0.82, 0.8).y} stroke="#bdb4a3" strokeWidth={1.4} />,
        <line key={`fx2-${m.uid}`} x1={pt(0.82, 0.2).x} y1={pt(0.82, 0.2).y} x2={pt(0.18, 0.8).x} y2={pt(0.18, 0.8).y} stroke="#bdb4a3" strokeWidth={1.4} />,
      );
    } else if (m.corner) {
      // диагональ угла
      details.push(
        <line key={`cd-${m.uid}`} x1={c0.x} y1={c0.y} x2={c2.x} y2={c2.y} stroke={worktopStroke} strokeWidth={1.2} />,
      );
    } else if (m.kind === "drawers") {
      // линия раздела ящиков по центру глубины
      details.push(
        <line key={`dr-${m.uid}`} x1={pt(0.12, 0.5).x} y1={pt(0.12, 0.5).y} x2={pt(0.88, 0.5).x} y2={pt(0.88, 0.5).y} stroke={worktopStroke} strokeWidth={1} strokeDasharray="2 3" />,
      );
    }

    // верхний шкаф — пунктиром у стены
    if (m.wall) {
      const dv = { x: m.depth.x * KWD, y: m.depth.y * KWD };
      const w2 = { x: c1.x + dv.x, y: c1.y + dv.y };
      const w3 = { x: c0.x + dv.x, y: c0.y + dv.y };
      wallCabs.push(
        <polygon
          key={`wc-${m.uid}`}
          points={poly([c0, c1, w2, w3])}
          fill={fc}
          fillOpacity={0.18}
          stroke={facadeStroke}
          strokeWidth={1}
          strokeDasharray="4 3"
        />,
      );
    }

    // подсветка изменённого модуля
    if (highlightUid && m.uid === highlightUid) {
      highlights.push(
        <polygon
          key={`hl-${m.uid}`}
          points={poly([c0, c1, c2, c3])}
          fill="none"
          stroke="#c15f3c"
          strokeWidth={2.6}
          strokeLinejoin="round"
        />,
      );
    }
  });

  const pad = 22;
  const viewBox = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(maxX - minX + pad * 2).toFixed(1)} ${(maxY - minY + pad * 2).toFixed(1)}`;

  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full"
      role="img"
      aria-label="План кухни сверху"
    >
      {/* порядок: стены → столешницы → фасадные полосы → детали → верхние шкафы → подсветка */}
      {wallLines}
      {worktops}
      {fronts}
      {details}
      {wallCabs}
      {highlights}
    </svg>
  );
}
