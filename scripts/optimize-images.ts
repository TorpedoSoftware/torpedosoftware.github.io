import { readdirSync, statSync, unlinkSync } from "node:fs";
import { rename } from "node:fs/promises";
import { join, resolve, extname } from "node:path";
import sharp from "sharp";

const DIST = join(resolve(import.meta.dirname, ".."), "dist");
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function collectImages(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath));
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

const images = collectImages(DIST);
let resized = 0;
let skipped = 0;

for (const filePath of images) {
  const metadata = await sharp(filePath).metadata();
  const { width, height } = metadata;

  if (!width || !height || (width <= MAX_WIDTH && height <= MAX_HEIGHT)) {
    skipped++;
    continue;
  }

  const originalSize = statSync(filePath).size;
  const tmpPath = filePath + ".tmp";

  await sharp(filePath)
    .resize(MAX_WIDTH, MAX_HEIGHT, { fit: "inside", withoutEnlargement: true })
    .toFile(tmpPath);

  const newSize = statSync(tmpPath).size;

  if (newSize >= originalSize) {
    unlinkSync(tmpPath);
    skipped++;
    continue;
  }

  await rename(tmpPath, filePath);

  const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
  console.log(
    `  ${filePath.replace(DIST, "dist")}  ${width}x${height} -> ${MAX_WIDTH}x${MAX_HEIGHT} max  (${saved}% smaller)`,
  );
  resized++;
}

console.log(`\nOptimized ${resized} images, ${skipped} already within bounds.`);
