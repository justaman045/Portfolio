import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const generatedIndex = join(process.cwd(), ".contentlayer/generated/index.mjs");

if (!existsSync(generatedIndex)) {
  console.error("fix-contentlayer-imports: .contentlayer/generated/index.mjs not found — did contentlayer build succeed?");
  process.exit(1);
}

try {
  const content = readFileSync(generatedIndex, "utf8");
  const patched = content.replaceAll(" assert { type: 'json' }", " with { type: 'json' }");

  if (patched !== content) {
    writeFileSync(generatedIndex, patched);
  }
} catch (err) {
  console.error("fix-contentlayer-imports: failed to patch generated index:", err);
  process.exit(1);
}
