import { useComputed, useSignal } from "@preact/signals";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sun,
  User,
  Users,
  X,
} from "lucide-preact";
import {
  checkPermission,
  clearAuthState,
  currentUser,
  isDarkMode,
  setThemeMode,
  themeMode,
  toggleSidebar,
  uiSettings,
} from "@/lib/stores.ts";
import { APP_CONFIG, MENU_ITEMS } from "@/lib/config.ts";
import type { MenuItem, Permission, ThemeMode } from "@/lib/types.ts";
import { Avatar } from "@/components/ui.tsx";
import { cn } from "@/lib/utils.ts";

// 图标映射
const iconMap: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  BarChart3,
  Mail,
  Calendar,
  Bell,
  Settings,
};

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const collapsed = useComputed(() => uiSettings.value.sidebarCollapsed);
  const expandedMenus = useSignal<string[]>([]);
  const mobileMenuOpen = useSignal(false);

  const toggleMenu = (href: string) => {
    if (expandedMenus.value.includes(href)) {
      expandedMenus.value = expandedMenus.value.filter((m) => m !== href);
    } else {
      expandedMenus.value = [...expandedMenus.value, href];
    }
  };

  const isMenuExpanded = (href: string) => expandedMenus.value.includes(href);
  const isActive = (href: string) => currentPath === href || currentPath.startsWith(`${href}/`);

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    // 权限检查 - 如果有用户则检查权限，否则始终显示菜单
    if (item.permission && currentUser.value && !checkPermission(item.permission)) {
      return null;
    }

    const Icon = iconMap[item.icon ?? ""] ?? FileText;
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isMenuExpanded(item.href);
    const active = isActive(item.href);

    return (
      <div key={item.href}>
        <a
          href={hasChildren ? undefined : item.href}
          onClick={hasChildren ? () => toggleMenu(item.href) : undefined}
          class={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            "hover:bg-gray-100 dark:hover:bg-gray-700",
            active && !hasChildren
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-200",
            depth > 0 && "ml-4",
            collapsed.value && depth === 0 && "justify-center px-2",
          )}
        >
          <Icon class="h-5 w-5 flex-shrink-0" />
          {!collapsed.value && (
            <>
              <span class="flex-1">{item.title}</span>
              {item.badge && (
                <span class="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                expanded ? <ChevronDown class="h-4 w-4" /> : <ChevronRight class="h-4 w-4" />
              )}
            </>
          )}
        </a>
        {hasChildren && expanded && !collapsed.value && (
          <div class="mt-1 space-y-1">
            {item.children?.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div class="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
        {!collapsed.value && (
          <a href="/dashboard" class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <LayoutDashboard class="h-5 w-5" />
            </div>
            <span class="text-lg font-bold text-gray-900 dark:text-white">
              {APP_CONFIG.name}
            </span>
          </a>
        )}
        <button
          type="button"
          onClick={() => toggleSidebar()}
          class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:block hidden"
        >
          <Menu class="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => (mobileMenuOpen.value = false)}
          class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      {/* 菜单 */}
      <nav class="flex-1 space-y-1 overflow-y-auto p-4">
        {MENU_ITEMS.map((item) => renderMenuItem(item))}
      </nav>

      {/* 用户信息 */}
      {currentUser.value && !collapsed.value && (
        <div class="border-t border-gray-200 p-4 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <Avatar
              src={currentUser.value.avatar}
              name={currentUser.value.name}
              size="md"
            />
            <div class="flex-1 min-w-0">
              <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                {currentUser.value.name}
              </p>
              <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                {currentUser.value.role.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* 桌面侧边栏 */}
      <aside
        class={cn(
          "hidden lg:flex lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:dark:border-gray-700 lg:dark:bg-gray-800",
          "fixed inset-y-0 left-0 z-30 transition-all duration-300",
          collapsed.value ? "lg:w-16" : "lg:w-64",
        )}
      >
        {sidebarContent}
      </aside>

      {/* 移动端菜单按钮 */}
      <button
        type="button"
        onClick={() => (mobileMenuOpen.value = true)}
        class="fixed left-4 top-4 z-40 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800 lg:hidden"
      >
        <Menu class="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* 移动端侧边栏 */}
      {mobileMenuOpen.value && (
        <>
          <div
            class="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => (mobileMenuOpen.value = false)}
          />
          <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
