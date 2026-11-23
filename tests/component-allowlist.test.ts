import { assert, assertEquals, assertThrows } from "@std/assert";
import { dirname, join, relative } from "std/path/mod.ts";
import {
  ALLOWED_COMPONENTS,
  resolveComponentUrl,
} from "../sections/Component.tsx";

const ROOT_DIR = Deno.cwd();
const SKIP = new Set([
  ".git",
  "node_modules",
  "_fresh",
  "static",
  "e2e",
  "tests",
]);

async function sourceFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(dir)) {
    if (entry.name.startsWith(".") || SKIP.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory) files.push(...await sourceFiles(path));
    else if (/\.(tsx|ts)$/.test(entry.name)) files.push(path);
  }
  return files;
}

// Every module the code renders through useComponent: `import.meta.url` (or a
// const holding it), `import.meta.resolve("./x.tsx")` (inline or via a const),
// and BackButton-style `component={import.meta.resolve("./x.tsx")}` props.
async function useComponentTargets(): Promise<Set<string>> {
  const targets = new Set<string>();
  const toRel = (abs: string) => "/" + relative(ROOT_DIR, abs);
  for (const file of await sourceFiles(ROOT_DIR)) {
    const src = await Deno.readTextFile(file);
    if (file.endsWith("sections/Component.tsx")) continue;
    const resolve = (spec: string) =>
      targets.add(toRel(join(dirname(file), spec)));
    const vars: Record<string, string | null> = {};
    for (const m of src.matchAll(/const\s+(\w+)\s*=\s*import\.meta\.url\b/g)) {
      vars[m[1]] = null;
    }
    for (
      const m of src.matchAll(
        /const\s+(\w+)\s*=\s*import\.meta\.resolve\(\s*["']([^"']+)["']\s*,?\s*\)/g,
      )
    ) vars[m[1]] = m[2];
    for (
      const m of src.matchAll(
        /const\s+(\w+)\s*=\s*new URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*,?\s*\)\.href/g,
      )
    ) vars[m[1]] = m[2];
    for (
      const m of src.matchAll(
        /useComponent(?:<[^>]*>)?\(\s*new URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url/g,
      )
    ) resolve(m[1]);
    for (
      const m of src.matchAll(
        /useComponent(?:<[^>]*>)?\(\s*(import\.meta\.url|import\.meta\.resolve\(\s*["']([^"']+)["']\s*,?\s*\)|\w+)/g,
      )
    ) {
      if (m[1] === "import.meta.url") targets.add(toRel(file));
      else if (m[2]) resolve(m[2]);
      else if (m[1] in vars) {
        const spec = vars[m[1]];
        spec === null ? targets.add(toRel(file)) : resolve(spec);
      }
    }
    for (
      const m of src.matchAll(
        /component=\{import\.meta\.resolve\(\s*["']([^"']+)["']\s*,?\s*\)\}/g,
      )
    ) resolve(m[1]);
  }
  // A target whose file doesn't exist can't be imported either way (a dead
  // reference in the site), so it doesn't need to be allowed.
  for (const target of [...targets]) {
    const stat = await Deno.stat(join(ROOT_DIR, target)).catch(() => null);
    if (!stat?.isFile) targets.delete(target);
  }
  return targets;
}

Deno.test("every useComponent target is in ALLOWED_COMPONENTS", async () => {
  const missing = [...await useComponentTargets()].filter((t) =>
    !ALLOWED_COMPONENTS.has(t)
  );
  assertEquals(missing, [], "add these to ALLOWED_COMPONENTS");
});

Deno.test("ALLOWED_COMPONENTS has no stale entries", async () => {
  const known = await useComponentTargets();
  const stale = [...ALLOWED_COMPONENTS].filter((a) => !known.has(a));
  assertEquals(stale, [], "remove these from ALLOWED_COMPONENTS");
  for (const path of ALLOWED_COMPONENTS) {
    assert(
      (await Deno.stat(join(ROOT_DIR, path)).catch(() => null))?.isFile,
      `${path} does not exist`,
    );
  }
});

Deno.test("resolveComponentUrl accepts every allowed component", () => {
  for (const path of ALLOWED_COMPONENTS) resolveComponentUrl(path);
});

Deno.test("resolveComponentUrl rejects traversal and other modules", () => {
  for (
    const path of [
      "/../../tmp/evil.tsx",
      "/..%2f..%2f..%2ftmp/evil.tsx",
      "/sections/Component.tsx",
      "/tests/not-a-target.tsx",
    ]
  ) {
    assertThrows(() => resolveComponentUrl(path), Error, "Access denied");
  }
});
