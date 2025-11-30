#!/usr/bin/env -S deno run -A --watch=static/,routes/

import { Builder } from "@fresh/core/dev";
import { tailwind } from "@fresh/plugin-tailwind";
import { app } from "./main.ts";

const builder = new Builder();

tailwind(builder, {});

if (Deno.args.includes("build")) {
  const prepare = await builder.build();
  prepare(app);
} else {
  await builder.listen(() => import("./main.ts"));
}
