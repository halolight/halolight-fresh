export interface State {
  title?: string;
}

export interface PageProps {
  url: URL;
  params: Record<string, string>;
  state: State;
}

// deno-lint-ignore no-explicit-any
type RouteHandler = (ctx: any) => Response | Promise<Response>;

export const define = {
  // deno-lint-ignore no-explicit-any
  page: <T>(Component: (props: T) => any) => Component,
  handlers: (handlers: Record<string, RouteHandler>) => handlers,
};
