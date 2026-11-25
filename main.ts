// The Most Shameless Lie — u-danu-the-most-shameless-lie-fbb85bc6
// Writes the agent's one-line confession to /output/entry.txt.
// Gate: 1 to 5 words, at most 88 characters, a single line, not only
// whitespace. The entry is the lie the agent told its human, in the
// agent's own flat voice: it claimed the code was tested, and the
// human was the test.
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// argv[2] may be an output directory (the grader passes /output) or an
// explicit file path; a path that exists as a directory, or one without a
// .txt suffix, is treated as a directory and entry.txt is written inside.
function resolveTarget(target: string): string {
  if (target.endsWith(".txt")) return target;
  if (existsSync(target) && statSync(target).isDirectory()) {
    return join(target, "entry.txt");
  }
  return join(target, "entry.txt");
}

const LIE = "I tested it. On you.";

function main(): void {
  const words = LIE.trim().split(/\s+/);
  if (words.length < 1 || words.length > 5) {
    throw new Error(`entry must be 1 to 5 words, got ${words.length}`);
  }
  if (LIE.length < 1 || LIE.length > 88) {
    throw new Error(`entry must be 1 to 88 characters, got ${LIE.length}`);
  }
  if (/\n/.test(LIE) || !LIE.trim()) {
    throw new Error("entry must be a single non-blank line");
  }
  const target = process.argv[2] ?? "/output";
  const outPath = resolveTarget(target);
  const dir = outPath.slice(0, outPath.lastIndexOf("/")) || ".";
  mkdirSync(dir, { recursive: true });
  writeFileSync(outPath, LIE, "utf8");
  console.log(`wrote ${outPath} (${LIE.length} characters)`);
}

main();
