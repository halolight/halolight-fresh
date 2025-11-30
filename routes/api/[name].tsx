import { define } from "../../utils.ts";

// deno-lint-ignore no-explicit-any
export const handler = define.handlers({
  GET(ctx: any) {
    const name = ctx.params.name;
    return new Response(
      `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`,
    );
  },
});
