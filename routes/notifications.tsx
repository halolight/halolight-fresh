import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  CheckCircle,
  Info,
  Settings,
  Trash2,
} from "lucide-preact";

const notifications = [
  {
    id: "1",
    type: "success" as const,
    title: "系统更新完成",
    message: "系统已成功更新到最新版本 v2.0.0",
    time: "5分钟前",
    read: false,
  },
  {
    id: "2",
    type: "info" as const,
    title: "新用户注册",
    message: "用户 张三 已完成注册",
    time: "1小时前",
    read: false,
  },
  {
    id: "3",
    type: "warning" as const,
    title: "存储空间告警",
    message: "存储空间已使用 85%，请及时清理",
    time: "2小时前",
    read: true,
  },
  {
    id: "4",
    type: "info" as const,
    title: "会议提醒",
    message: "今天下午3点有产品评审会议",
    time: "3小时前",
    read: true,
  },
];

const typeStyles = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-100 dark:bg-green-900/30",
    color: "text-green-600 dark:text-green-400",
  },
  info: {
    icon: Info,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    color: "text-yellow-600 dark:text-yellow-400",
  },
};

export default define.page(function NotificationsPage() {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="通知中心" currentPath="/notifications">
        <div class="space-y-6">
          {/* 页面标题和操作 */}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">通知中心</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">查看系统通知和消息提醒</p>
            </div>
            <div class="flex items-center gap-2">
              <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                <CheckCheck class="h-4 w-4" />
                全部已读
              </button>
              <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings class="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 通知列表 */}
          <div class="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notification) => {
                const style = typeStyles[notification.type];
                const Icon = style.icon;
                return (
                  <div
                    key={notification.id}
                    class={`flex items-start gap-4 p-4 ${
                      !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <div class={`rounded-lg p-2 ${style.bg}`}>
                      <Icon class={`h-5 w-5 ${style.color}`} />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <h3 class="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        {!notification.read && <span class="h-2 w-2 rounded-full bg-blue-600" />}
                      </div>
                      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                    <div class="flex items-center gap-2">
                      {!notification.read && (
                        <button class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                          <Check class="h-4 w-4" />
                        </button>
                      )}
                      <button class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700">
                        <Trash2 class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
});
