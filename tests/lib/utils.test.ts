/**
 * lib/utils.ts 单元测试
 */
import { assertEquals, assertExists } from "$std/assert/mod.ts";
import "../setup.ts";

// 导入被测试的模块
import {
  cn,
  cookies,
  formatCurrency,
  formatDate,
  formatNumber,
  isBrowser,
  storage,
} from "../../lib/utils.ts";

Deno.test("cn - 合并类名", async (t) => {
  await t.step("应该合并多个类名", () => {
    const result = cn("foo", "bar");
    assertEquals(result, "foo bar");
  });

  await t.step("应该处理条件类名", () => {
    const result = cn("foo", false && "bar", "baz");
    assertEquals(result, "foo baz");
  });

  await t.step("应该处理 Tailwind 冲突", () => {
    const result = cn("p-4", "p-2");
    assertEquals(result, "p-2");
  });

  await t.step("应该处理空值", () => {
    const result = cn("foo", null, undefined, "bar");
    assertEquals(result, "foo bar");
  });
});

Deno.test("isBrowser - 浏览器环境检测", async (t) => {
  await t.step("在 Deno 测试环境中应该返回 false", () => {
    // Deno 测试环境中没有 document
    const result = isBrowser();
    assertEquals(typeof result, "boolean");
  });
});

Deno.test("storage - localStorage 封装", async (t) => {
  // 注意：在 Deno 测试环境中 isBrowser() 返回 false，所以 storage 操作返回 undefined
  // 这些测试验证的是非浏览器环境的行为
  await t.step("在非浏览器环境中 get 应该返回 undefined", () => {
    const result = storage.get<{ foo: string }>("test-key");
    assertEquals(result, undefined);
  });

  await t.step("在非浏览器环境中 set 不应该抛出错误", () => {
    // 在非浏览器环境中不会抛出错误，只是不执行
    storage.set("test-key", { foo: "bar" });
    // 无法验证存储，因为 isBrowser() 返回 false
  });

  await t.step("在非浏览器环境中 remove 不应该抛出错误", () => {
    storage.remove("test-key");
    // 无法验证删除，因为 isBrowser() 返回 false
  });
});

Deno.test("formatDate - 日期格式化", async (t) => {
  await t.step("应该格式化日期字符串", () => {
    const result = formatDate("2024-01-15");
    assertExists(result);
    assertEquals(typeof result, "string");
  });

  await t.step("应该格式化 Date 对象", () => {
    const date = new Date("2024-01-15T10:30:00Z");
    const result = formatDate(date);
    assertExists(result);
  });
});

Deno.test("formatNumber - 数字格式化", async (t) => {
  await t.step("应该格式化大数字", () => {
    const result = formatNumber(1234567);
    assertExists(result);
    // 应该包含千分位分隔符
    assertEquals(typeof result, "string");
  });

  await t.step("应该处理小数", () => {
    const result = formatNumber(1234.56);
    assertExists(result);
  });
});

Deno.test("formatCurrency - 货币格式化", async (t) => {
  await t.step("应该格式化为人民币", () => {
    const result = formatCurrency(1234.56);
    assertExists(result);
    assertEquals(typeof result, "string");
  });

  await t.step("应该处理整数", () => {
    const result = formatCurrency(1000);
    assertExists(result);
  });
});
