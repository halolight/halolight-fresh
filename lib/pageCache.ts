import { signal } from "@preact/signals";

interface PageState {
  scrollY: number;
  formData?: Record<string, unknown>;
  customState?: Record<string, unknown>;
  timestamp: number;
}

const cache = signal<Map<string, PageState>>(new Map());

export function setPageState(path: string, state: Partial<PageState>) {
  const next = new Map(cache.value);
  const existing = next.get(path) || { scrollY: 0, timestamp: Date.now() };
  next.set(path, { ...existing, ...state, timestamp: Date.now() });
  cache.value = next;
}

export function getPageState(path: string) {
  return cache.value.get(path);
}

export function clearPageState(path: string) {
  const next = new Map(cache.value);
  next.delete(path);
  cache.value = next;
}

export function clearAllPageState() {
  cache.value = new Map();
}

// hooks
export function useScrollRestore(path: string) {
  if (typeof globalThis === "undefined" || typeof globalThis.scrollY === "undefined") return;
  let restoring = false;
  const onScroll = () => {
    if (!restoring) setPageState(path, { scrollY: globalThis.scrollY });
  };
  const throttled = () => {
    clearTimeout((throttled as any).t);
    (throttled as any).t = setTimeout(onScroll, 80);
  };
  globalThis.addEventListener("scroll", throttled);
  const state = getPageState(path);
  if (state?.scrollY) {
    restoring = true;
    requestAnimationFrame(() => {
      globalThis.scrollTo(0, state.scrollY);
      setTimeout(() => (restoring = false), 80);
    });
  }
  return () => {
    globalThis.removeEventListener("scroll", throttled);
  };
}

export function useFormCache<T extends Record<string, unknown>>(key: string, initial: T) {
  const state = getPageState(key);
  let values = (state?.formData as T) ?? initial;
  const save = (next: T) => {
    values = next;
    setPageState(key, { formData: next });
  };
  const clear = () => {
    values = initial;
    clearPageState(key);
  };
  return [values, save, clear] as const;
}
