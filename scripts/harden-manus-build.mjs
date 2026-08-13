// Post-build step for production deploys. Runs after `pnpm build`.
// Removes Manus editor tooling from the build output.
// Referenced from the Cloudflare build command; if this file goes missing the
// build fails rather than silently shipping the editor runtime.
import fs from "node:fs";
import path from "node:path";

const OUT = "dist/public";
const htmlPath = path.join(OUT, "index.html");
let doc = fs.readFileSync(htmlPath, "utf8");
const before = Buffer.byteLength(doc);

// Manus in-editor overlay (~360 KB inlined). Talks to a parent frame that
// does not exist outside the Manus editor.
doc = doc.replace(/<script id="manus-runtime"[\s\S]*?<\/script>/g, "");

// Umami tag whose %VITE_ANALYTICS_*% placeholders never resolve at build time.
doc = doc.replace(/<script\b[^>]*%VITE_ANALYTICS_ENDPOINT%[\s\S]*?<\/script>/g, "");

fs.writeFileSync(htmlPath, doc);

// Manus browser-log collector, shipped as a static asset.
fs.rmSync(path.join(OUT, "__manus__"), { recursive: true, force: true });

// No _redirects file here. SPA fallback comes from not_found_handling in
// wrangler.jsonc. A `/* /index.html 200` rule is redundant with it and is
// rejected by the Workers API as a self-referential loop (code 100324),
// which fails the deploy after a successful upload.

console.log(
  `index.html ${(before / 1024).toFixed(0)} KB -> ${(Buffer.byteLength(doc) / 1024).toFixed(1)} KB`
);

// Assets under /manus-storage/ live in Manus's storage, not this repo, and
// resolve only inside the Manus sandbox. With a /* catch-all redirect they are
// served index.html with a 200, so they break silently. Fail the build instead.
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });

const orphans = new Set();
for (const file of walk(OUT)) {
  if (!/\.(html|css|js)$/.test(file)) continue;
  for (const m of fs.readFileSync(file, "utf8").matchAll(/\/manus-storage\/[^"')\s]+/g)) {
    orphans.add(m[0]);
  }
}

if (orphans.size) {
  console.error(`\nBuild blocked: ${orphans.size} asset(s) are not in this repo:`);
  for (const o of orphans) console.error(`  ${o}`);
  console.error("\nCommit them under client/public/ and reference them by relative path.");
  process.exit(1);
}

console.log("Build output is clean.");
