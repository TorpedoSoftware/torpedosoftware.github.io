import { copyFileSync } from "node:fs";
import { join, resolve } from "node:path";

// GitHub Pages serves 404.html for any path it can't find on disk. Copying the
// built index.html there lets client-side routes (e.g. /design-demo) boot the
// SPA instead of showing GitHub's default 404.
const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");

copyFileSync(join(DIST, "index.html"), join(DIST, "404.html"));

console.log("Generated 404.html SPA fallback");
