import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";
import { Archive, Inbox, Mail, Search, Send, Star, Trash2 } from "lucide-preact";

export default define.page(function MessagesPage() {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="消息中心" currentPath="/messages">
        <div class="space-y-6">
          {/* 页面标题和操作 */}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">消息中心</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">管理您的消息和通讯</p>
            </div>
            <button class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Send class="h-4 w-4" />
              发送消息
            </button>
          </div>

          <div class="flex flex-col gap-6 lg:flex-row">
            {/* 侧边栏 */}
            <div class="w-full lg:w-64 flex-shrink-0">
              <div class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <nav class="space-y-1">
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    <Inbox class="h-5 w-5" />
                    <span>收件箱</span>
                    <span class="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                      12
                    </span>
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Star class="h-5 w-5" />
                    <span>已加星标</span>
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Send class="h-5 w-5" />
                    <span>已发送</span>
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Archive class="h-5 w-5" />
                    <span>已归档</span>
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Trash2 class="h-5 w-5" />
                    <span>已删除</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* 消息列表 */}
            <div class="flex-1">
              <div class="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* 搜索 */}
                <div class="border-b border-gray-200 p-4 dark:border-gray-700">
                  <div class="relative">
                    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索消息..."
                      class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                {/* 空状态 */}
                <div class="p-12 text-center">
                  <Mail class="mx-auto h-12 w-12 text-gray-400" />
                  <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">暂无消息</h3>
                  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">您的收件箱是空的</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
});
