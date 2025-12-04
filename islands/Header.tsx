import { useComputed, useSignal } from "@preact/signals";
import {
  Bell,
  ChevronDown,
  LogOut,
  Monitor,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-preact";
import {
  clearAuthState,
  currentUser,
  isDarkMode,
  setThemeMode,
  setThemeSkin,
  themeMode,
  themeSkin,
  uiSettings,
} from "@/lib/stores.ts";
import { Avatar } from "@/components/ui.tsx";
import { cn } from "@/lib/utils.ts";
import type { ThemeMode } from "@/lib/types.ts";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const showUserMenu = useSignal(false);
  const showThemeMenu = useSignal(false);
  const showNotifications = useSignal(false);
  const collapsed = useComputed(() => uiSettings.value.sidebarCollapsed);

  const handleLogout = () => {
    clearAuthState();
    globalThis.location.href = "/login";
  };

  const themeOptions: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: "light", label: "浅色", icon: Sun },
    { mode: "dark", label: "深色", icon: Moon },
    { mode: "system", label: "跟随系统", icon: Monitor },
  ];
  const skinOptions = [
    { id: "default", label: "默认" },
    { id: "ocean", label: "海洋" },
    { id: "sunset", label: "日落" },
  ] as const;

  const currentThemeIcon = themeOptions.find((t) => t.mode === themeMode.value)?.icon ?? Monitor;

  return (
    <header
      class={cn(
        "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800",
        "transition-all duration-300",
        collapsed.value ? "lg:ml-16" : "lg:ml-64",
      )}
    >
      {/* 左侧 */}
      <div class="flex items-center gap-4">
        {title && (
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      {/* 右侧 */}
      <div class="flex items-center gap-2">
        {/* 搜索按钮 */}
        <button
          type="button"
          class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Search class="h-5 w-5" />
        </button>

        {/* 主题切换 */}
        <div class="relative">
          <button
            type="button"
            onClick={() => {
              showThemeMenu.value = !showThemeMenu.value;
              showUserMenu.value = false;
              showNotifications.value = false;
            }}
            class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode() ? <Moon class="h-5 w-5" /> : <Sun class="h-5 w-5" />}
          </button>

          {showThemeMenu.value && (
            <>
              <div
                class="fixed inset-0 z-10"
                onClick={() => (showThemeMenu.value = false)}
              />
              <div class="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800 space-y-2">
                {themeOptions.map(({ mode, label, icon: Icon }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setThemeMode(mode);
                      showThemeMenu.value = false;
                    }}
                    class={cn(
                      "flex w-full items-center gap-2 px-4 py-2 text-sm",
                      "hover:bg-gray-100 dark:hover:bg-gray-700",
                      themeMode.value === mode
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-200",
                    )}
                  >
                    <Icon class="h-4 w-4" />
                    {label}
                  </button>
                ))}
                <div class="px-4 pt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  界面皮肤
                </div>
                <div class="grid grid-cols-3 gap-2 px-4 pb-2">
                  {skinOptions.map((skin) => (
                    <button
                      key={skin.id}
                      type="button"
                      onClick={() => setThemeSkin(skin.id)}
                      class={cn(
                        "rounded-md border px-2 py-1 text-xs",
                        themeSkin.value === skin.id
                          ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300"
                          : "border-transparent text-gray-600 hover:border-gray-200 dark:text-gray-300 dark:hover:border-gray-700",
                      )}
                    >
                      {skin.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 通知 */}
        <div class="relative">
          <button
            type="button"
            onClick={() => {
              showNotifications.value = !showNotifications.value;
              showUserMenu.value = false;
              showThemeMenu.value = false;
            }}
            class="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bell class="h-5 w-5" />
            <span class="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {showNotifications.value && (
            <>
              <div
                class="fixed inset-0 z-10"
                onClick={() => (showNotifications.value = false)}
              />
              <div class="absolute right-0 top-full z-20 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                  <p class="font-medium text-gray-900 dark:text-white">通知</p>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div class="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                    暂无新通知
                  </div>
                </div>
                <div class="border-t border-gray-200 px-4 py-2 dark:border-gray-700">
                  <a
                    href="/notifications"
                    class="block text-center text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    查看全部
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 用户菜单 */}
        {currentUser.value && (
          <div class="relative">
            <button
              type="button"
              onClick={() => {
                showUserMenu.value = !showUserMenu.value;
                showThemeMenu.value = false;
                showNotifications.value = false;
              }}
              class="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Avatar
                src={currentUser.value.avatar}
                name={currentUser.value.name}
                size="sm"
              />
              <span class="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:block">
                {currentUser.value.name}
              </span>
              <ChevronDown class="h-4 w-4 text-gray-500" />
            </button>

            {showUserMenu.value && (
              <>
                <div
                  class="fixed inset-0 z-10"
                  onClick={() => (showUserMenu.value = false)}
                />
                <div class="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                    <p class="font-medium text-gray-900 dark:text-white">
                      {currentUser.value.name}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {currentUser.value.email}
                    </p>
                  </div>
                  <a
                    href="/profile"
                    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <User class="h-4 w-4" />
                    个人资料
                  </a>
                  <a
                    href="/settings"
                    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Settings class="h-4 w-4" />
                    系统设置
                  </a>
                  <hr class="my-1 border-gray-200 dark:border-gray-700" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut class="h-4 w-4" />
                    退出登录
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
