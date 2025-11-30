import type { Permission, User } from "../lib/types.ts";

/**
 * 测试环境设置
 * 为 Deno 测试提供必要的 mock 和配置
 */

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    get length(): number {
      return Object.keys(store).length;
    },
    key: (index: number): string | null => {
      return Object.keys(store)[index] ?? null;
    },
  };
})();

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    get length(): number {
      return Object.keys(store).length;
    },
    key: (index: number): string | null => {
      return Object.keys(store)[index] ?? null;
    },
  };
})();

// Mock matchMedia
const matchMediaMock = (query: string) => ({
  matches: query.includes("dark") ? false : true,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
});

// 设置全局 mock
if (typeof globalThis.localStorage === "undefined") {
  Object.defineProperty(globalThis, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
}

if (typeof globalThis.sessionStorage === "undefined") {
  Object.defineProperty(globalThis, "sessionStorage", {
    value: sessionStorageMock,
    writable: true,
  });
}

if (typeof globalThis.matchMedia === "undefined") {
  Object.defineProperty(globalThis, "matchMedia", {
    value: matchMediaMock,
    writable: true,
  });
}

// 清理函数 - 在每个测试后调用
export function cleanupMocks(): void {
  localStorageMock.clear();
  sessionStorageMock.clear();
}

// 辅助函数：创建测试用户
export function createMockUser(overrides: Partial<User> = {}): User {
  const permissions: Permission[] = ["dashboard:view", "users:view", "users:edit", "settings:view"];
  return {
    id: "test-user-1",
    name: "Test User",
    email: "test@example.com",
    avatar: "/avatars/default.png",
    status: "active",
    role: {
      id: "admin",
      name: "管理员",
      label: "管理员",
      permissions,
    },
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

// 辅助函数：模拟登录状态
export function mockAuthenticatedState(user = createMockUser()): void {
  localStorageMock.setItem("halolight_user", JSON.stringify(user));
  localStorageMock.setItem("halolight_token", `mock-token-${Date.now()}`);
}

// 辅助函数：清除登录状态
export function clearAuthState(): void {
  localStorageMock.removeItem("halolight_user");
  localStorageMock.removeItem("halolight_token");
}

console.log("测试环境设置完成");
