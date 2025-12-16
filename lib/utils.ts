import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// 合并 Tailwind 类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化日期
export function formatDate(date: string | Date, format = "YYYY-MM-DD"): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

// 格式化相对时间
export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return formatDate(d, "YYYY-MM-DD");
  } else if (days > 0) {
    return `${days} 天前`;
  } else if (hours > 0) {
    return `${hours} 小时前`;
  } else if (minutes > 0) {
    return `${minutes} 分钟前`;
  } else {
    return "刚刚";
  }
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// 格式化数字（千分位）
export function formatNumber(num: number): string {
  return num.toLocaleString("zh-CN");
}

// 格式化货币
export function formatCurrency(amount: number, currency = "CNY"): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
  }).format(amount);
}

// 生成随机 ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

// 防抖函数
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// 节流函数
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

// 深拷贝
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// 获取环境变量
export function getEnv(key: string, defaultValue = ""): string {
  if (typeof Deno !== "undefined") {
    return Deno.env.get(key) ?? defaultValue;
  }
  return defaultValue;
}

// 是否为浏览器环境
export function isBrowser(): boolean {
  return typeof globalThis.window !== "undefined";
}

// 存储工具
export const storage = {
  get<T>(key: string, defaultValue?: T): T | undefined {
    if (!isBrowser()) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`无法存储 ${key} 到 localStorage`);
    }
  },

  remove(key: string): void {
    if (!isBrowser()) return;
    localStorage.removeItem(key);
  },

  clear(): void {
    if (!isBrowser()) return;
    localStorage.clear();
  },
};

// Cookie 工具
export const cookies = {
  get(name: string): string | undefined {
    if (!isBrowser()) return undefined;
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") +
          "=([^;]*)",
      ),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  set(
    name: string,
    value: string,
    options: {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    } = {},
  ): void {
    if (!isBrowser()) return;

    const { expires, path = "/", domain, secure, sameSite = "strict" } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires) {
      const expiresDate = expires instanceof Date
        ? expires
        : new Date(Date.now() + expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${expiresDate.toUTCString()}`;
    }

    if (path) cookieString += `; path=${path}`;
    if (domain) cookieString += `; domain=${domain}`;
    if (secure) cookieString += "; secure";
    if (sameSite) cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;
  },

  remove(name: string, options: { path?: string; domain?: string } = {}): void {
    if (!isBrowser()) return;
    this.set(name, "", { ...options, expires: new Date(0) });
  },
};

// 密码强度计算
export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

export const passwordRules = [
  { label: "至少 8 个字符", test: (pwd: string) => pwd.length >= 8 },
  { label: "包含大写字母", test: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: "包含小写字母", test: (pwd: string) => /[a-z]/.test(pwd) },
  { label: "包含数字", test: (pwd: string) => /\d/.test(pwd) },
  {
    label: "包含特殊字符",
    test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  },
];

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 0;
  const passed = passwordRules.filter((rule) => rule.test(password)).length;
  if (passed <= 1) return 1;
  if (passed <= 2) return 2;
  if (passed <= 4) return 3;
  return 4;
}

export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  const labels = ["无", "弱", "中", "强", "很强"];
  return labels[strength];
}

export function getPasswordStrengthColor(strength: PasswordStrength): string {
  const colors = ["gray", "red", "orange", "yellow", "green"];
  return colors[strength];
}
