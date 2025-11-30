import { App } from "@fresh/core";
import { path, ProdBuildCache, setBuildCache } from "fresh/internal";
import { fromFileUrl, join } from "$std/path/mod.ts";

export const app = new App({ root: import.meta.url });

// Always register filesystem routes; build cache (when present) will provide route data.
app.fsRoutes();

// In production runs, attach the build snapshot if it exists.
const snapshotUrl = new URL("./_fresh/snapshot.js", import.meta.url);
let snapshot: { staticFiles: Map<string, { filePath: string; contentType: string }> } | null = null;
try {
  snapshot = await import(snapshotUrl.href);
  const root = path.join(import.meta.dirname, ".");
  setBuildCache(app, new ProdBuildCache(root, snapshot), "production");
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
