/**
 * lib/stores.ts 单元测试
 */
import { assertEquals, assertExists } from "$std/assert/mod.ts";
import { cleanupMocks, clearAuthState, createMockUser, mockAuthenticatedState } from "../setup.ts";

import {
  authToken,
  clearAuthState as clearAuth,
  currentUser,
  getActualTheme,
  getUserPermissions,
  isAuthenticated,
  isDarkMode,
  removeToast,
  setAuthState,
  setThemeMode,
  showToast,
  themeMode,
  toasts,
  toggleSidebar,
  uiSettings,
  updateUISettings,
} from "../../lib/stores.ts";

// 每个测试后清理
Deno.test("stores cleanup", () => {
  cleanupMocks();
  clearAuth();
});

Deno.test("认证状态管理", async (t) => {
  await t.step("初始状态应该是未认证", () => {
    clearAuth();
    assertEquals(isAuthenticated(), false);
    assertEquals(currentUser.value, null);
    assertEquals(authToken.value, null);
  });

  await t.step("setAuthState 应该设置认证状态", () => {
    const mockUser = createMockUser();
    setAuthState(mockUser, "test-token", false);

    assertEquals(currentUser.value?.id, mockUser.id);
    assertEquals(authToken.value, "test-token");
    assertEquals(isAuthenticated(), true);
  });

  await t.step("getUserPermissions 应该返回用户权限", () => {
    const mockUser = createMockUser();
    currentUser.value = mockUser;

    const permissions = getUserPermissions();
    assertEquals(permissions.length, 4);
    assertEquals(permissions.includes("dashboard:view"), true);
  });

  await t.step("clearAuthState 应该清除认证状态", () => {
    setAuthState(createMockUser(), "test-token", false);
    clearAuth();

    assertEquals(currentUser.value, null);
    assertEquals(authToken.value, null);
    assertEquals(isAuthenticated(), false);
  });
});

Deno.test("主题状态管理", async (t) => {
  await t.step("默认主题模式", () => {
    assertExists(themeMode.value);
  });

  await t.step("setThemeMode 应该更新主题", () => {
    setThemeMode("dark");
    assertEquals(themeMode.value, "dark");

    setThemeMode("light");
    assertEquals(themeMode.value, "light");
  });

  await t.step("getActualTheme 应该返回实际主题", () => {
    setThemeMode("light");
    assertEquals(getActualTheme(), "light");

    setThemeMode("dark");
    assertEquals(getActualTheme(), "dark");
  });

  await t.step("isDarkMode 应该正确判断", () => {
    setThemeMode("dark");
    assertEquals(isDarkMode(), true);

    setThemeMode("light");
    assertEquals(isDarkMode(), false);
  });
});

Deno.test("UI 设置管理", async (t) => {
  await t.step("默认 UI 设置", () => {
    assertExists(uiSettings.value);
    assertEquals(typeof uiSettings.value.sidebarCollapsed, "boolean");
  });

  await t.step("updateUISettings 应该更新设置", () => {
    updateUISettings({ sidebarCollapsed: true });
    assertEquals(uiSettings.value.sidebarCollapsed, true);

    updateUISettings({ sidebarCollapsed: false });
    assertEquals(uiSettings.value.sidebarCollapsed, false);
  });

  await t.step("toggleSidebar 应该切换侧边栏状态", () => {
    const before = uiSettings.value.sidebarCollapsed;
    toggleSidebar();
    assertEquals(uiSettings.value.sidebarCollapsed, !before);
  });
});

Deno.test("Toast 通知管理", async (t) => {
  await t.step("showToast 应该添加通知", () => {
    const initialLength = toasts.value.length;
    showToast({
      type: "success",
      title: "测试通知",
      message: "这是一条测试消息",
      duration: 0, // 不自动移除
    });

    assertEquals(toasts.value.length, initialLength + 1);
  });

  await t.step("removeToast 应该移除通知", () => {
    showToast({
      type: "info",
      title: "待移除",
      duration: 0,
    });

    const lastToast = toasts.value[toasts.value.length - 1];
    const lengthBefore = toasts.value.length;

    removeToast(lastToast.id);
    assertEquals(toasts.value.length, lengthBefore - 1);
  });
});
