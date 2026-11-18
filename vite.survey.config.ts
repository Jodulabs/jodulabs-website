// The survey at jodu.io/survey is its own small page, built apart from the company site so a slow phone
// downloads only the survey. Output: dist/public/survey.html and dist/public/survey-assets/.
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

const root = path.resolve(import.meta.dirname, "client", "survey");

/** Every locales/<code>.json is a language; its "language" key is the name on the language button. */
function languages(): Record<string, string> {
  const dir = path.join(root, "locales");
  return Object.fromEntries(
    fs
      .readdirSync(dir)
      .filter(file => file.endsWith(".json"))
      .map(file => [file.slice(0, -".json".length), JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")).language]),
  );
}

export default defineConfig({
  root,
  base: "/",
  envDir: import.meta.dirname,
  define: { __SURVEY_LANGUAGES__: JSON.stringify(languages()) },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist", "public"),
    emptyOutDir: false,
    assetsDir: "survey-assets",
    target: "es2019",
    rollupOptions: { input: path.join(root, "survey.html") },
  },
  server: { port: 3100, strictPort: false, host: true },
});
