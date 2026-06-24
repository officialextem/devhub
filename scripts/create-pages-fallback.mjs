import fs from "node:fs";
import path from "node:path";

const distDir = path.join(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const fallbackPath = path.join(distDir, "404.html");

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html fehlt. Bitte zuerst npm.cmd run build ausfuehren.");
  process.exit(1);
}

fs.copyFileSync(indexPath, fallbackPath);
console.log("GitHub Pages fallback created: dist/404.html");
