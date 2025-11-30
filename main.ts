import { App } from "@fresh/core";
import { ProdBuildCache, setBuildCache } from "fresh/internal";
import { dirname, fromFileUrl, join } from "$std/path/mod.ts";

export const app = new App();

// Always register filesystem routes; build cache (when present) will provide route data.
app.fsRoutes();

// In production runs, attach the build snapshot if it exists.
const snapshotUrl = new URL("./_fresh/snapshot.js", import.meta.url);
// deno-lint-ignore no-explicit-any
let snapshot: any = null;
try {
  snapshot = await import(snapshotUrl.href);
  const root = dirname(fromFileUrl(import.meta.url));
  if (snapshot) {
    setBuildCache(app, new ProdBuildCache(root, snapshot), "production");
  }
} catch {
  snapshot = null;
}

// Serve built static assets. Prefer snapshot map, fall back to on-disk static files.
app.use(async (ctx) => {
  // Snapshot-backed static files (hashed assets, compiled styles).
  const snapFile = snapshot?.staticFiles.get(ctx.url.pathname);
  if (snapFile) {
    const filePath = fromFileUrl(new URL(join(".", snapFile.filePath), import.meta.url));
    const body = await Deno.readFile(filePath);
    const headers = new Headers({
      "content-type": snapFile.contentType,
      "cache-control": "public, max-age=31536000, immutable",
    });
    return new Response(body, { headers });
  }

  // Serve static files from static/ directory
  if (ctx.url.pathname === "/styles.css") {
    try {
      const body = await Deno.readFile(new URL("./static/styles.css", import.meta.url));
      return new Response(body, {
        headers: { "content-type": "text/css", "cache-control": "public, max-age=3600" },
      });
    } catch {
      // File not found
    }
  }

  return ctx.next();
});

if (import.meta.main) {
  await app.listen();
}
