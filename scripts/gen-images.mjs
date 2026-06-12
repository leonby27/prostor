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
  "no text, no watermark, no people, clean and tidy, mid-range custom kitchen in a typical Minsk apartment, " +
  "beautiful but practical, realistic budget, no kitchen island.";

// slug файла -> детальный промпт сцены
const IMAGES = {
  // --- стили ---
  "style-modern":
    "Modern straight or L-shaped kitchen, smooth matte fronts with simple integrated handles, practical cabinets, " +
    "neutral grey and warm wood tones, durable laminate or compact stone-look countertop, no island.",
  "style-scandi":
    "Scandinavian straight kitchen, light oak wood fronts, white upper cabinets, simple open shelf detail, " +
    "bright airy room, cozy everyday atmosphere, soft pastel accents, no island.",
  "style-neoclassic":
    "Simple neoclassic L-shaped kitchen, restrained framed fronts with subtle milling, modest brass handles, " +
    "calm muted sage-grey tones, elegant but not luxury, no island.",
  "style-classic":
    "Classic compact kitchen with framed shaker fronts, deep green or navy lower cabinets, light upper cabinets, " +
    "stone-look countertop, simple brass details, timeless refined look, no island.",
  "style-minimal":
    "Minimalist straight kitchen, clean lines, light monochrome palette with one warm wood accent, " +
    "very little clutter, functional storage, practical slab fronts, no island.",
  "style-loft":
    "Moderate loft-style kitchen, matte dark lower cabinets, warm wood countertop or shelves, " +
    "small brick or concrete accent wall, black metal details, urban but approachable, no island.",

  // --- проекты / портфолио ---
  "project-cooking":
    "Bright modern kitchen, 3.6m straight layout, light fronts, someone's cozy everyday cooking kitchen, " +
    "warm inviting atmosphere, fully equipped and lived-in but tidy, no island.",
  "project-green":
    "Deep green L-shaped kitchen in an apartment or small private house, framed fronts, modest brass hardware, " +
    "wooden floor, plants near the window, cozy family-home feel, no island.",

  // --- герой / showroom / общие ---
  "hero-kitchen":
    "Beautiful open-plan kitchen-living room in a new-build, Scandinavian-modern style, 4.2m straight or L-shaped layout, " +
    "hero wide shot, beautiful light, aspirational but realistic for a middle-budget family renovation, no island.",
  "openplan":
    "Open-plan kitchen with a compact peninsula or small bar counter attached to the wall, 4.5m layout, " +
    "seamless transition to living area, contemporary and practical, two bar stools, evening warm light, no freestanding island.",
  "showroom":
    "Kitchen furniture showroom interior for a mid-range local studio, several practical display kitchen setups, " +
    "pleasant lighting, clean floor, approachable retail design space, no island displays.",
  "appliance":
    "Close-up detail of built-in reliable mid-range kitchen appliances — induction hob, integrated oven, " +
    "stainless steel and matte fronts, macro detail of quality materials and craftsmanship.",

  // --- дополнительные проекты ---
  "project-neoclassic":
    "Simple neoclassic L-shaped kitchen in a regular apartment, light warm grey framed fronts, modest brass handles, " +
    "stone-look countertop, white tile backsplash, compact dining table by the window, no island.",
  "project-small-studio":
    "Compact minimalist straight kitchen for a small studio apartment, 2.8m layout, light matte fronts, " +
    "built-in refrigerator column, small dishwasher, smart storage, practical and beautiful, no island.",
  "project-family-green":
    "Cozy deep green L-shaped kitchen for a family apartment, framed lower cabinets, light upper cabinets, " +
    "wood-look countertop, plants on windowsill, realistic middle-budget renovation, no island.",

  // --- фото кухонь из отзывов ---
  "reviews/olga-kitchen":
    "Customer review photo of a bright modern straight kitchen in a Minsk new-build apartment, 3.6m layout, " +
    "light fronts, warm wood countertop, everyday details but tidy, realistic middle-budget project, no island.",
  "reviews/kravtsovy-kitchen":
    "Customer review photo of a practical L-shaped kitchen in a Belarus apartment, warm beige and oak tones, " +
    "reliable fittings, integrated oven and hob, neat lived-in atmosphere, no island.",
  "reviews/sergey-kitchen":
    "Customer review photo of a compact straight kitchen in an older apartment with uneven walls solved by custom fit, " +
    "white and light wood fronts, simple black handles, clean installation, no island.",
  "reviews/ekaterina-kitchen":
    "Customer review photo of a light neoclassic kitchen in a Minsk apartment, subtle framed fronts, soft cream tones, " +
    "modest brass handles, white tile backsplash, elegant but affordable, no island.",
  "reviews/andrey-kitchen":
    "Compact custom kitchen in an older Khrushchev-era apartment, tricky uneven walls neatly fitted, " +
    "white upper cabinets, warm wood lower cabinets, simple black handles, no gaps, no island.",
  "reviews/marina-kitchen":
    "Open-plan kitchen-living room with a compact wall-attached bar counter, warm beige fronts, " +
    "practical storage, hidden appliances, cozy evening light, no freestanding island.",
  "reviews/vitaly-kitchen":
    "Modern mid-range kitchen in a new apartment, grey matte fronts, oak countertop, integrated handles, " +
    "tidy worktop, slightly compact room, no island.",
  "reviews/natalya-igor-kitchen":
    "Mid-range kitchen with stone-look countertop and warm under-cabinet lighting, light grey fronts, " +
    "oak accents, practical bar shelf attached to wall, no island.",
  "reviews/svetlana-kitchen":
    "Practical straight kitchen delivered to another Belarus city, light fronts, wood-look countertop, " +
    "integrated appliances, tidy installation, simple mid-range materials, no island.",
  "reviews/pavel-kitchen":
    "Mid-range kitchen with transparent honest budget look, straight layout, white and graphite fronts, " +
    "durable laminate countertop, neat details, no island.",
  "reviews/elena-kitchen":
    "Light neoclassic kitchen in soft cream tones, framed MDF fronts, subtle milling, white tile backsplash, " +
    "modest brass handles, cozy apartment, no island.",
  "reviews/dmitry-shevchuk-kitchen":
    "Compact quality kitchen with soft-close fittings, light grey fronts, wood countertop, neat drawers, " +
    "modern handles, apartment in Belarus, no island.",
  "reviews/olga-bondarenko-kitchen":
    "Very small studio apartment kitchen, compact 2.4m straight layout, built-in fridge, small dishwasher, " +
    "many drawers, light fronts and wood accents, every centimeter used, no island.",
  "reviews/sergey-tatyana-kitchen":
    "Large custom L-shaped kitchen in a private house with unusual room shape, warm white fronts, " +
    "oak countertop, practical storage, dining table nearby, no island.",
  "reviews/anna-lagun-kitchen":
    "New apartment kitchen bought with installment plan, modern straight layout, soft beige fronts, " +
    "wood countertop, integrated oven and hob, tidy family renovation, no island.",
  "reviews/igor-savitsky-kitchen":
    "Replacement of an old kitchen with a new compact straight kitchen, fresh installation, light oak and white fronts, " +
    "clean floor, practical appliances connected, no construction mess, no island.",

  // --- команда ---
  "team/designer":
    "Photorealistic portrait of a friendly kitchen designer-measurer in a mid-range kitchen showroom, Belarusian local studio, " +
    "smart casual clothes, holding a tape measure and tablet, natural expression, realistic office lighting, no text.",
  "team/technolog":
    "Photorealistic portrait of a kitchen furniture production technologist in a clean workshop, standing near cabinet parts and samples, " +
    "workwear or smart casual shirt, calm professional expression, realistic local manufacturing setting, no text.",
  "team/montazh":
    "Photorealistic portrait of a kitchen installation team lead in a finished apartment kitchen, wearing neat work clothes, " +
    "holding a cordless drill at his side, friendly professional expression, no text.",

  // --- производство ---
  "production/shop":
    "Photorealistic interior photo of a small clean kitchen furniture workshop near Minsk, panel saw, workbenches, cabinet parts, " +
    "organized mid-size local production, realistic lighting, no people, no text.",
  "production/cut":
    "Photorealistic close-up of chipboard or MDF panels being cut and edged in a furniture workshop, edge banding machine, " +
    "wood particles and tools, clean safe production process, no people, no text.",
  "production/paint":
    "Photorealistic photo of a modest furniture paint booth or finishing area for MDF kitchen fronts, racks with cabinet doors, " +
    "soft industrial lighting, clean controlled workspace, no people, no text.",
  "production/assembly":
    "Photorealistic photo of assembled kitchen cabinet modules being checked in a workshop, clamps, hardware boxes, " +
    "quality control table, realistic mid-range furniture production, no people, no text.",
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
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
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
