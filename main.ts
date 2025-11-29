import { App } from "@fresh/core";
import { define } from "./utils.ts";

export const app = new App({ root: import.meta.url })
  .use(define.middleware);

if (import.meta.main) {
  await app.listen();
}
