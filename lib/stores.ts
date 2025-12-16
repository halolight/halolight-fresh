import { signal } from "@preact/signals";
import type { DashboardWidget, Permission, SkinType, ThemeMode, User } from "./types.ts";
import {
  AUTH_CONFIG,
  DEFAULT_LAYOUTS,
  DEFAULT_WIDGETS,
  hasPermission,
  THEME_CONFIG,
} from "./config.ts";
import { cookies, isBrowser, storage } from "./utils.ts";

// ==================== 认证状态 ====================

// 当前用户
export const currentUser = signal<User | null>(null);
export const accounts = signal<User[]>([]);
export const activeAccountId = signal<string | null>(null);

// Token
export const authToken = signal<string | null>(null);

// 是否正在加载
export const isAuthLoading = signal(false);

// 认证错误
export const authError = signal<string | null>(null);

// 是否已认证（函数代替 computed）
export function isAuthenticated(): boolean {
  return !!authToken.value && !!currentUser.value;
}

// 用户权限（函数代替 computed）
export function getUserPermissions(): Permission[] {
  const user = currentUser.value;
  if (!user?.role?.permissions) return [];
  return user.role.permissions;
}

// 检查权限
export function checkPermission(permission: Permission): boolean {
  return hasPermission(getUserPermissions(), permission);
}

// 初始化认证状态（从存储恢复）
export function initAuthState(): void {
  if (!isBrowser()) return;

  const token = cookies.get(AUTH_CONFIG.tokenKey);
  const user = storage.get<User>(AUTH_CONFIG.userKey);

  if (token && user) {
    authToken.value = token;
    currentUser.value = user;
  }
}

// 设置认证状态
export function setAuthState(user: User, token: string, remember = false): void {
  currentUser.value = user;
  authToken.value = token;
  activeAccountId.value = user.id;

  if (isBrowser()) {
    const expires = remember ? AUTH_CONFIG.rememberExpiresDays : AUTH_CONFIG.tokenExpiresDays;
    cookies.set(AUTH_CONFIG.tokenKey, token, { expires });
    storage.set(AUTH_CONFIG.userKey, user);
  }
}

// 清除认证状态
export function clearAuthState(): void {
  currentUser.value = null;
  authToken.value = null;
  authError.value = null;
  activeAccountId.value = null;
  accounts.value = [];

  if (isBrowser()) {
    cookies.remove(AUTH_CONFIG.tokenKey);
    storage.remove(AUTH_CONFIG.userKey);
  }
}

// 切换账号
export function switchAccount(accountId: string): void {
  const next = accounts.value.find((a) => a.id === accountId);
  if (!next) return;
  activeAccountId.value = accountId;
  currentUser.value = next;
  // keep same token shape; demo uses user id as token
  authToken.value = `token-${accountId}`;
  if (isBrowser()) {
    cookies.set(AUTH_CONFIG.tokenKey, authToken.value, { expires: AUTH_CONFIG.tokenExpiresDays });
    storage.set(AUTH_CONFIG.userKey, next);
  }
}

// 载入演示账号列表（可从接口替换）
export function loadDemoAccounts(list: User[]): void {
  accounts.value = list;
  if (list.length && !activeAccountId.value) {
    switchAccount(list[0].id);
  }
}

// ==================== 主题状态 ====================

// 主题模式
export const themeMode = signal<ThemeMode>(THEME_CONFIG.defaultMode);

// 皮肤
export const themeSkin = signal<SkinType>(THEME_CONFIG.defaultSkin);

// 实际主题（函数代替 computed）
export function getActualTheme(): "light" | "dark" {
  if (themeMode.value === "system") {
    if (isBrowser()) {
      return globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }
  return themeMode.value as "light" | "dark";
}

// 是否为深色模式（函数代替 computed）
export function isDarkMode(): boolean {
  return getActualTheme() === "dark";
}

// 初始化主题
export function initThemeState(): void {
  if (!isBrowser()) return;

  const savedMode = storage.get<ThemeMode>(THEME_CONFIG.storageKey);
  const savedSkin = storage.get<SkinType>(THEME_CONFIG.skinStorageKey);
  if (savedMode) {
    themeMode.value = savedMode;
  }
  if (savedSkin) {
    themeSkin.value = savedSkin;
  }

  // 监听系统主题变化
  globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (themeMode.value === "system") {
      applyTheme();
    }
  });

  applyTheme();
}

// 设置主题模式
export function setThemeMode(mode: ThemeMode): void {
  themeMode.value = mode;
  if (isBrowser()) {
    storage.set(THEME_CONFIG.storageKey, mode);
    applyTheme();
  }
}

// 设置皮肤
export function setThemeSkin(skin: SkinType): void {
  themeSkin.value = skin;
  if (isBrowser()) {
    storage.set(THEME_CONFIG.skinStorageKey, skin);
    applyTheme();
  }
}

// 应用主题到 DOM
function applyTheme(): void {
  if (!isBrowser()) return;

  const root = document.documentElement;
  if (getActualTheme() === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // apply skin to data-skin for CSS variables in static/styles.css
  if (themeSkin.value && themeSkin.value !== "default") {
    root.dataset.skin = themeSkin.value;
  } else {
    delete root.dataset.skin;
  }
}

// ==================== UI 设置状态 ====================

export interface UISettings {
  sidebarCollapsed: boolean;
  showFooter: boolean;
  showTabBar: boolean;
  mobileHeaderFixed: boolean;
}

const defaultUISettings: UISettings = {
  sidebarCollapsed: false,
  showFooter: true,
  showTabBar: true,
  mobileHeaderFixed: true,
};

export const uiSettings = signal<UISettings>(defaultUISettings);

// 初始化 UI 设置
export function initUISettings(): void {
  if (!isBrowser()) return;
  const saved = storage.get<UISettings>("halolight_ui_settings");
  if (saved) {
    uiSettings.value = { ...defaultUISettings, ...saved };
  }
}

// 更新 UI 设置
export function updateUISettings(updates: Partial<UISettings>): void {
  uiSettings.value = { ...uiSettings.value, ...updates };
  if (isBrowser()) {
    storage.set("halolight_ui_settings", uiSettings.value);
  }
}

// 切换侧边栏
export function toggleSidebar(): void {
  updateUISettings({ sidebarCollapsed: !uiSettings.value.sidebarCollapsed });
}

// ==================== 仪表盘状态 ====================

export const dashboardWidgets = signal<DashboardWidget[]>([...DEFAULT_WIDGETS]);
export const dashboardLayouts = signal(DEFAULT_LAYOUTS);
export const isEditingDashboard = signal(false);

// 初始化仪表盘
export function initDashboardState(): void {
  if (!isBrowser()) return;

  const savedWidgets = storage.get<DashboardWidget[]>("halolight_dashboard_widgets");
  const savedLayouts = storage.get<typeof DEFAULT_LAYOUTS>("halolight_dashboard_layouts");

  if (savedWidgets) dashboardWidgets.value = savedWidgets;
  if (savedLayouts) dashboardLayouts.value = savedLayouts;
}

// 更新布局
export function updateDashboardLayouts(layouts: typeof DEFAULT_LAYOUTS): void {
  dashboardLayouts.value = layouts;
  if (isBrowser()) {
    storage.set("halolight_dashboard_layouts", layouts);
  }
}

// 切换小部件可见性
export function toggleWidgetVisibility(widgetId: string): void {
  dashboardWidgets.value = dashboardWidgets.value.map((w) =>
    w.id === widgetId ? { ...w, visible: !w.visible } : w
  );
  if (isBrowser()) {
    storage.set("halolight_dashboard_widgets", dashboardWidgets.value);
  }
}

// 重置仪表盘
export function resetDashboard(): void {
  dashboardWidgets.value = [...DEFAULT_WIDGETS];
  dashboardLayouts.value = DEFAULT_LAYOUTS;
  if (isBrowser()) {
    storage.remove("halolight_dashboard_widgets");
    storage.remove("halolight_dashboard_layouts");
  }
}

// ==================== 标签页状态 ====================

export interface Tab {
  id: string;
  title: string;
  path: string;
  closable: boolean;
}

export const openTabs = signal<Tab[]>([
  { id: "dashboard", title: "仪表盘", path: "/dashboard", closable: false },
]);
export const activeTabId = signal("dashboard");

// 添加标签页
export function addTab(tab: Omit<Tab, "closable"> & { closable?: boolean }): void {
  const existing = openTabs.value.find((t) => t.path === tab.path);
  if (existing) {
    activeTabId.value = existing.id;
    return;
  }

  openTabs.value = [...openTabs.value, { ...tab, closable: tab.closable ?? true }];
  activeTabId.value = tab.id;
}

// 关闭标签页
export function closeTab(tabId: string): void {
  const tab = openTabs.value.find((t) => t.id === tabId);
  if (!tab?.closable) return;

  const index = openTabs.value.findIndex((t) => t.id === tabId);
  openTabs.value = openTabs.value.filter((t) => t.id !== tabId);

  // 如果关闭的是当前标签，切换到相邻标签
  if (activeTabId.value === tabId && openTabs.value.length > 0) {
    const newIndex = Math.min(index, openTabs.value.length - 1);
    activeTabId.value = openTabs.value[newIndex].id;
  }
}

// 关闭其他标签页
export function closeOtherTabs(tabId: string): void {
  openTabs.value = openTabs.value.filter((t) => !t.closable || t.id === tabId);
  activeTabId.value = tabId;
}

// 关闭所有可关闭的标签页
export function closeAllTabs(): void {
  openTabs.value = openTabs.value.filter((t) => !t.closable);
  if (openTabs.value.length > 0) {
    activeTabId.value = openTabs.value[0].id;
  }
}

// ==================== 导航状态 ====================

export const pendingNavigation = signal<string | null>(null);
export const navigationLabel = signal<string | null>(null);

export function startNavigation(path: string, label?: string): void {
  pendingNavigation.value = path;
  navigationLabel.value = label ?? null;
}

export function finishNavigation(): void {
  pendingNavigation.value = null;
  navigationLabel.value = null;
}

// ==================== 通知状态 ====================

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

export const toasts = signal<ToastMessage[]>([]);

export function showToast(toast: Omit<ToastMessage, "id">): void {
  const id = Math.random().toString(36).substring(2);
  const newToast = { ...toast, id };
  toasts.value = [...toasts.value, newToast];

  // 自动移除
  const duration = toast.duration ?? 3000;
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
}

export function removeToast(id: string): void {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

// ==================== 初始化所有状态 ====================

export function initAllStores(): void {
  initAuthState();
  initThemeState();
  initUISettings();
  initDashboardState();
}
