/**
 * Генерация изображений для лендинга через OpenAI (gpt-image-1).
 *
 * Запуск:
 *   node scripts/gen-images.mjs              — генерирует ВСЕ изображения
 *   node scripts/gen-images.mjs style-loft   — только указанные (по slug файла)
 *
 * Ключ берётся из .env.local: OPENAI_API_KEY=sk-...
 * Готовые файлы сохраняются в public/images/<slug>.jpg
 *
 * ВНИМАНИЕ: каждый вызов стоит денег. Скрипт перезаписывает существующие
 * файлы только для тех slug, что вы передали (или для всех, если без аргументов).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images");

// --- читаем .env.local без зависимостей ---------------------------------
function loadEnvLocal() {
  const p = path.join(ROOT, ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnvLocal();

if (!process.env.OPENAI_API_KEY) {
  console.error(
    "✗ Не найден OPENAI_API_KEY.\n  Создайте файл prostor/.env.local со строкой:\n  OPENAI_API_KEY=sk-...\n"
  );
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Общая «обёртка» промпта — задаёт фотореализм для всех кадров.
const REALISM =
  "Hyper-photorealistic interior photograph, shot on a full-frame camera with a 35mm lens, " +
  "natural soft daylight from large windows, realistic materials and reflections, " +
  "true-to-life textures, shallow depth of field, professional real-estate / interior magazine photography, " +
  "no text, no watermark, no people, clean and tidy, premium custom kitchen in a Minsk new-build apartment.";

// slug файла -> детальный промпт сцены
const IMAGES = {
  // --- стили ---
  "style-modern":
    "Modern handleless kitchen, smooth matte fronts, integrated push-to-open cabinets, minimal hardware, " +
    "neutral grey and warm wood tones, sleek stone countertop.",
  "style-scandi":
    "Scandinavian kitchen, light oak wood fronts, white cabinets, natural linen textures, " +
    "bright airy room, simple and cozy, soft pastel accents.",
  "style-neoclassic":
    "Neoclassic kitchen, restrained framed fronts with subtle milling, brushed brass handles and fixtures, " +
    "calm muted sage-grey tones, elegant and understated.",
  "style-classic":
    "Classic kitchen with deep rich colour framed shaker fronts, noble dark green or navy cabinetry, " +
    "marble countertop, brass details, timeless refined look.",
  "style-minimal":
    "Minimalist kitchen, clean straight lines, high contrast monochrome palette, " +
    "absolutely no clutter, pure functional design, large slab fronts.",
  "style-loft":
    "Industrial loft kitchen, exposed concrete and raw metal, warm reclaimed wood, " +
    "black steel frames, brick wall accent, characterful urban industrial vibe.",

  // --- проекты / портфолио ---
  "project-cooking":
    "Bright modern kitchen, 3.6m straight layout, light fronts, someone's cozy everyday cooking kitchen, " +
    "warm inviting atmosphere, fully equipped and lived-in but tidy.",
  "project-green":
    "Deep green kitchen in a private house, framed fronts, brass hardware, large island, " +
    "wooden floor, plants near the window, sophisticated country-house feel.",

  // --- герой / showroom / общие ---
  "hero-kitchen":
    "Stunning open-plan kitchen-living room in a new-build, Scandinavian-modern style, 4.2m, " +
    "hero wide shot, beautiful light, the centerpiece of the home — strong, aspirational, premium.",
  "openplan":
    "Open-plan kitchen with a bar counter and island, 6m layout, seamless transition to living area, " +
    "spacious, contemporary, two bar stools, evening warm light.",
  "showroom":
    "Premium kitchen furniture showroom interior, several display kitchen setups, " +
    "elegant lighting, polished floor, high-end retail design space.",
  "appliance":
    "Close-up detail of built-in premium kitchen appliances — induction hob, integrated oven, " +
    "stainless steel and matte fronts, macro detail of quality materials and craftsmanship.",
};

const SIZE = "1536x1024"; // ~3:2, подходит для широких карточек и героя
const QUALITY = "high"; // low | medium | high

async function generateOne(slug, prompt) {
  const fullPrompt = `${prompt} ${REALISM}`;
  process.stdout.write(`→ ${slug} ... `);
  const res = await openai.images.generate({
    model: "gpt-image-1",
    prompt: fullPrompt,
    size: SIZE,
    quality: QUALITY,
    n: 1,
  });
  const b64 = res.data[0].b64_json;
  const buf = Buffer.from(b64, "base64");
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  fs.writeFileSync(outPath, buf);
  console.log(`✓ ${(buf.length / 1024).toFixed(0)} KB`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const argv = process.argv.slice(2);
  const slugs = argv.length ? argv : Object.keys(IMAGES);

  const unknown = slugs.filter((s) => !IMAGES[s]);
  if (unknown.length) {
    console.error(`✗ Неизвестные slug: ${unknown.join(", ")}`);
    console.error(`  Доступные: ${Object.keys(IMAGES).join(", ")}`);
    process.exit(1);
  }

  console.log(`Генерирую ${slugs.length} изображ. (${SIZE}, quality=${QUALITY})\n`);
  for (const slug of slugs) {
    try {
      await generateOne(slug, IMAGES[slug]);
    } catch (err) {
      console.log(`✗ ошибка: ${err.message}`);
    }
  }
  console.log(`\nГотово. Файлы в ${path.relative(ROOT, OUT_DIR)}/`);
}

main();
