import { useSignal } from "@preact/signals";
import { Bell, Database, Globe, Palette, Shield, User } from "lucide-preact";
import { PageHeader } from "@/components/layout.tsx";
import { Button, Card, CardContent, CardHeader, Input } from "@/components/ui.tsx";
import {
  currentUser,
  setThemeMode,
  themeMode,
  uiSettings,
  updateUISettings,
} from "@/lib/stores.ts";
import { cn } from "@/lib/utils.ts";
import type { ThemeMode } from "@/lib/types.ts";

export default function Settings() {
  const activeTab = useSignal("profile");

  const tabs = [
    { id: "profile", label: "个人资料", icon: User },
    { id: "notifications", label: "通知设置", icon: Bell },
    { id: "appearance", label: "外观设置", icon: Palette },
    { id: "security", label: "安全设置", icon: Shield },
  ];

  return (
    <div class="space-y-6">
      <PageHeader title="系统设置" description="管理您的账号和系统偏好" />

      <div class="grid gap-6 lg:grid-cols-4">
        {/* 侧边导航 */}
        <Card class="lg:col-span-1">
          <CardContent class="p-2">
            <nav class="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => (activeTab.value = tab.id)}
                    class={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      activeTab.value === tab.id
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
                    )}
                  >
                    <Icon class="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* 设置内容 */}
        <div class="lg:col-span-3">
          {/* 个人资料 */}
          {activeTab.value === "profile" && (
            <Card>
              <CardHeader>
                <h3 class="font-semibold text-gray-900 dark:text-white">个人资料</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">更新您的个人信息</p>
              </CardHeader>
              <CardContent class="space-y-6">
                <div class="flex items-center gap-6">
                  <div class="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    {currentUser.value?.name?.[0] || "U"}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      更换头像
                    </Button>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      支持 JPG、PNG 格式，最大 2MB
                    </p>
                  </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="用户名"
                    value={currentUser.value?.name || ""}
                    placeholder="请输入用户名"
                  />
                  <Input
                    label="邮箱"
                    type="email"
                    value={currentUser.value?.email || ""}
                    placeholder="请输入邮箱"
                  />
                  <Input
                    label="手机号"
                    value={currentUser.value?.phone || ""}
                    placeholder="请输入手机号"
                  />
                  <Input
                    label="部门"
                    value={currentUser.value?.department || ""}
                    placeholder="请输入部门"
                  />
                </div>

                <div class="flex justify-end">
                  <Button>保存更改</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 通知设置 */}
          {activeTab.value === "notifications" && (
            <Card>
              <CardHeader>
                <h3 class="font-semibold text-gray-900 dark:text-white">通知设置</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">管理您的通知偏好</p>
              </CardHeader>
              <CardContent class="space-y-4">
                {[
                  { id: "email", label: "邮件通知", desc: "接收重要更新的邮件通知" },
                  { id: "push", label: "推送通知", desc: "接收浏览器推送通知" },
                  { id: "sms", label: "短信通知", desc: "接收紧急事项的短信通知" },
                  { id: "weekly", label: "周报摘要", desc: "每周接收活动摘要邮件" },
                ].map((item) => (
                  <div
                    key={item.id}
                    class="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{item.label}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        class="peer sr-only"
                        defaultChecked={item.id === "email"}
                      />
                      <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700" />
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* 外观设置 */}
          {activeTab.value === "appearance" && (
            <Card>
              <CardHeader>
                <h3 class="font-semibold text-gray-900 dark:text-white">外观设置</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">自定义界面外观</p>
              </CardHeader>
              <CardContent class="space-y-6">
                {/* 主题模式 */}
                <div>
                  <p class="mb-3 font-medium text-gray-900 dark:text-white">主题模式</p>
                  <div class="grid grid-cols-3 gap-3">
                    {[
                      { mode: "light" as ThemeMode, label: "浅色", icon: "☀️" },
                      { mode: "dark" as ThemeMode, label: "深色", icon: "🌙" },
                      { mode: "system" as ThemeMode, label: "跟随系统", icon: "💻" },
                    ].map((item) => (
                      <button
                        key={item.mode}
                        type="button"
                        onClick={() => setThemeMode(item.mode)}
                        class={cn(
                          "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                          themeMode.value === item.mode
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700",
                        )}
                      >
                        <span class="text-2xl">{item.icon}</span>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 布局设置 */}
                <div>
                  <p class="mb-3 font-medium text-gray-900 dark:text-white">布局设置</p>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">显示页脚</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          在页面底部显示页脚信息
                        </p>
                      </div>
                      <label class="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          class="peer sr-only"
                          checked={uiSettings.value.showFooter}
                          onChange={(e) =>
                            updateUISettings({
                              showFooter: (e.target as HTMLInputElement).checked,
                            })}
                        />
                        <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700" />
                      </label>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">紧凑侧边栏</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          折叠侧边栏以获得更多空间
                        </p>
                      </div>
                      <label class="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          class="peer sr-only"
                          checked={uiSettings.value.sidebarCollapsed}
                          onChange={(e) =>
                            updateUISettings({
                              sidebarCollapsed: (e.target as HTMLInputElement).checked,
                            })}
                        />
                        <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700" />
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 安全设置 */}
          {activeTab.value === "security" && (
            <Card>
              <CardHeader>
                <h3 class="font-semibold text-gray-900 dark:text-white">安全设置</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">管理您的账号安全</p>
              </CardHeader>
              <CardContent class="space-y-6">
                {/* 修改密码 */}
                <div class="space-y-4">
                  <p class="font-medium text-gray-900 dark:text-white">修改密码</p>
                  <div class="grid gap-4">
                    <Input label="当前密码" type="password" placeholder="请输入当前密码" />
                    <Input label="新密码" type="password" placeholder="请输入新密码" />
                    <Input label="确认新密码" type="password" placeholder="请再次输入新密码" />
                  </div>
                  <Button>更新密码</Button>
                </div>

                <hr class="border-gray-200 dark:border-gray-700" />

                {/* 两步验证 */}
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">两步验证</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      添加额外的安全层保护您的账号
                    </p>
                  </div>
                  <Button variant="outline">启用</Button>
                </div>

                <hr class="border-gray-200 dark:border-gray-700" />

                {/* 会话管理 */}
                <div>
                  <p class="mb-3 font-medium text-gray-900 dark:text-white">登录会话</p>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                      <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          💻
                        </div>
                        <div>
                          <p class="text-sm font-medium text-gray-900 dark:text-white">
                            当前设备
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            macOS · Safari · 中国
                          </p>
                        </div>
                      </div>
                      <span class="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        当前
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" class="mt-3">
                    退出所有其他会话
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
