import type { MenuItem, Permission, Role } from "./types.ts";

// 应用配置
export const APP_CONFIG = {
  name: "Halolight Fresh",
  title: "Halolight Fresh - 中文后台管理系统",
  description: "基于 Deno Fresh 的现代化中文后台管理系统，具备 Islands 架构和极致性能",
  version: "0.1.0",
  author: "h7ml",
  email: "h7ml@qq.com",
  homepage: "https://halolight-fresh.h7ml.cn",
  repository: "https://github.com/halolight/halolight-fresh",
};

// 认证配置
export const AUTH_CONFIG = {
  tokenKey: "halolight_token",
  refreshTokenKey: "halolight_refresh_token",
  userKey: "halolight_user",
  tokenExpiresDays: 7,
  rememberExpiresDays: 30,
};

// 预定义角色
export const ROLES: Role[] = [
  {
    id: "admin",
    name: "admin",
    label: "超级管理员",
    description: "拥有系统所有权限",
    permissions: ["*"],
  },
  {
    id: "manager",
    name: "manager",
    label: "管理员",
    description: "拥有大部分管理权限",
    permissions: [
      "dashboard:view",
      "dashboard:edit",
      "users:view",
      "users:create",
      "users:edit",
      "analytics:view",
      "analytics:export",
      "documents:view",
      "documents:create",
      "documents:edit",
      "files:view",
      "files:upload",
      "messages:view",
      "messages:send",
      "calendar:view",
      "calendar:edit",
      "notifications:view",
      "settings:view",
    ],
  },
  {
    id: "editor",
    name: "editor",
    label: "编辑",
    description: "可以编辑内容",
    permissions: [
      "dashboard:view",
      "documents:view",
      "documents:create",
      "documents:edit",
      "files:view",
      "files:upload",
      "messages:view",
      "calendar:view",
      "notifications:view",
    ],
  },
  {
    id: "viewer",
    name: "viewer",
    label: "访客",
    description: "只能查看内容",
    permissions: [
      "dashboard:view",
      "documents:view",
      "files:view",
      "notifications:view",
    ],
  },
];

// 菜单配置
export const MENU_ITEMS: MenuItem[] = [
  {
    title: "仪表盘",
    icon: "LayoutDashboard",
    href: "/dashboard",
    permission: "dashboard:view",
  },
  {
    title: "用户管理",
    icon: "Users",
    href: "/users",
    permission: "users:view",
  },
  {
    title: "内容管理",
    icon: "FileText",
    href: "/documents",
    permission: "documents:view",
    children: [
      {
        title: "文档管理",
        icon: "FileText",
        href: "/documents",
        permission: "documents:view",
      },
      {
        title: "文件存储",
        icon: "FolderOpen",
        href: "/files",
        permission: "files:view",
      },
    ],
  },
  {
    title: "业务运营",
    icon: "BarChart3",
    href: "/analytics",
    permission: "analytics:view",
    children: [
      {
        title: "数据分析",
        icon: "BarChart3",
        href: "/analytics",
        permission: "analytics:view",
      },
      {
        title: "消息中心",
        icon: "Mail",
        href: "/messages",
        permission: "messages:view",
      },
      {
        title: "日程安排",
        icon: "Calendar",
        href: "/calendar",
        permission: "calendar:view",
      },
    ],
  },
  {
    title: "通知中心",
    icon: "Bell",
    href: "/notifications",
    permission: "notifications:view",
  },
  {
    title: "系统设置",
    icon: "Settings",
    href: "/settings",
    permission: "settings:view",
  },
];

// 路由权限映射
export const ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/dashboard": "dashboard:view",
  "/users": "users:view",
  "/documents": "documents:view",
  "/files": "files:view",
  "/analytics": "analytics:view",
  "/messages": "messages:view",
  "/calendar": "calendar:view",
  "/notifications": "notifications:view",
  "/settings": "settings:view",
};

// 公开路由（无需认证）
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/terms",
  "/privacy",
];

// 认证路由（已登录用户不能访问）
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// 检查是否为公开路由
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

// 检查是否为认证路由
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

// 获取路由权限
export function getRoutePermission(pathname: string): Permission | undefined {
  return ROUTE_PERMISSIONS[pathname];
}

// 检查用户是否有权限
export function hasPermission(
  userPermissions: Permission[],
  requiredPermission: Permission,
): boolean {
  if (userPermissions.includes("*")) return true;
  return userPermissions.includes(requiredPermission);
}

// 检查用户是否有任一权限
export function hasAnyPermission(
  userPermissions: Permission[],
  requiredPermissions: Permission[],
): boolean {
  return requiredPermissions.some((perm) => hasPermission(userPermissions, perm));
}

// 检查用户是否有所有权限
export function hasAllPermissions(
  userPermissions: Permission[],
  requiredPermissions: Permission[],
): boolean {
  return requiredPermissions.every((perm) => hasPermission(userPermissions, perm));
}

// 默认仪表盘小部件
export const DEFAULT_WIDGETS = [
  { id: "stats", type: "stats", title: "数据概览", visible: true },
  { id: "chart-line", type: "chart-line", title: "访问趋势", visible: true },
  { id: "chart-bar", type: "chart-bar", title: "销售统计", visible: true },
  { id: "chart-pie", type: "chart-pie", title: "流量占比", visible: true },
  { id: "recent-users", type: "recent-users", title: "最近用户", visible: true },
  { id: "notifications", type: "notifications", title: "最新通知", visible: true },
  { id: "tasks", type: "tasks", title: "待办任务", visible: true },
  { id: "calendar", type: "calendar", title: "今日日程", visible: true },
  { id: "quick-actions", type: "quick-actions", title: "快捷操作", visible: true },
] as const;

// 默认仪表盘布局
export const DEFAULT_LAYOUTS = {
  lg: [
    { i: "stats", x: 0, y: 0, w: 12, h: 2 },
    { i: "chart-line", x: 0, y: 2, w: 6, h: 4 },
    { i: "chart-bar", x: 6, y: 2, w: 6, h: 4 },
    { i: "chart-pie", x: 0, y: 6, w: 4, h: 4 },
    { i: "recent-users", x: 4, y: 6, w: 4, h: 4 },
    { i: "notifications", x: 8, y: 6, w: 4, h: 4 },
    { i: "tasks", x: 0, y: 10, w: 4, h: 4 },
    { i: "calendar", x: 4, y: 10, w: 4, h: 4 },
    { i: "quick-actions", x: 8, y: 10, w: 4, h: 2 },
  ],
  md: [
    { i: "stats", x: 0, y: 0, w: 8, h: 2 },
    { i: "chart-line", x: 0, y: 2, w: 4, h: 4 },
    { i: "chart-bar", x: 4, y: 2, w: 4, h: 4 },
    { i: "chart-pie", x: 0, y: 6, w: 4, h: 4 },
    { i: "recent-users", x: 4, y: 6, w: 4, h: 4 },
    { i: "notifications", x: 0, y: 10, w: 4, h: 4 },
    { i: "tasks", x: 4, y: 10, w: 4, h: 4 },
    { i: "calendar", x: 0, y: 14, w: 4, h: 4 },
    { i: "quick-actions", x: 4, y: 14, w: 4, h: 2 },
  ],
  sm: [
    { i: "stats", x: 0, y: 0, w: 4, h: 2 },
    { i: "chart-line", x: 0, y: 2, w: 4, h: 4 },
    { i: "chart-bar", x: 0, y: 6, w: 4, h: 4 },
    { i: "chart-pie", x: 0, y: 10, w: 4, h: 4 },
    { i: "recent-users", x: 0, y: 14, w: 4, h: 4 },
    { i: "notifications", x: 0, y: 18, w: 4, h: 4 },
    { i: "tasks", x: 0, y: 22, w: 4, h: 4 },
    { i: "calendar", x: 0, y: 26, w: 4, h: 4 },
    { i: "quick-actions", x: 0, y: 30, w: 4, h: 2 },
  ],
};

// 主题配置
export const THEME_CONFIG = {
  storageKey: "halolight_theme",
  skinStorageKey: "halolight_skin",
  defaultMode: "system" as const,
  defaultSkin: "default" as const,
};
