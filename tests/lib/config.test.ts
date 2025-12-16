/**
 * lib/config.ts 单元测试
 */
import { assertEquals, assertExists } from "$std/assert/mod.ts";
import "../setup.ts";

import type { Permission } from "../../lib/types.ts";
import { APP_CONFIG, AUTH_CONFIG, hasPermission, THEME_CONFIG } from "../../lib/config.ts";

Deno.test("APP_CONFIG - 应用配置", async (t) => {
  await t.step("应该有正确的配置结构", () => {
    assertExists(APP_CONFIG.title);
    assertExists(APP_CONFIG.description);
    assertExists(APP_CONFIG.author);
    assertEquals(typeof APP_CONFIG.title, "string");
    assertEquals(typeof APP_CONFIG.description, "string");
  });
});

Deno.test("AUTH_CONFIG - 认证配置", async (t) => {
  await t.step("应该有 token 相关配置", () => {
    assertExists(AUTH_CONFIG.tokenKey);
    assertExists(AUTH_CONFIG.userKey);
    assertEquals(typeof AUTH_CONFIG.tokenKey, "string");
  });

  await t.step("应该有过期时间配置", () => {
    assertExists(AUTH_CONFIG.tokenExpiresDays);
    assertExists(AUTH_CONFIG.rememberExpiresDays);
    assertEquals(typeof AUTH_CONFIG.tokenExpiresDays, "number");
  });
});

Deno.test("THEME_CONFIG - 主题配置", async (t) => {
  await t.step("应该有默认主题模式", () => {
    assertExists(THEME_CONFIG.defaultMode);
    assertExists(THEME_CONFIG.storageKey);
  });

  await t.step("默认模式应该是有效值", () => {
    const validModes = ["light", "dark", "system"];
    assertEquals(validModes.includes(THEME_CONFIG.defaultMode), true);
  });
});

Deno.test("hasPermission - 权限检查", async (t) => {
  const userPermissions: Permission[] = ["dashboard:view", "users:view", "users:edit"];

  await t.step("应该返回 true 当用户有权限时", () => {
    const result = hasPermission(userPermissions, "dashboard:view");
    assertEquals(result, true);
  });

  await t.step("应该返回 false 当用户没有权限时", () => {
    const result = hasPermission(userPermissions, "settings:edit");
    assertEquals(result, false);
  });

  await t.step("空权限列表应该返回 false", () => {
    const result = hasPermission([], "dashboard:view");
    assertEquals(result, false);
  });

  await t.step("应该支持通配符权限", () => {
    const adminPermissions: Permission[] = ["*"];
    const result = hasPermission(adminPermissions, "dashboard:view");
    assertEquals(result, true);
  });
});
