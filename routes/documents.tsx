import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";
import { FileText, Filter, Plus, Search } from "lucide-preact";

export default define.page(function DocumentsPage() {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="文档管理" currentPath="/documents">
        <div class="space-y-6">
          {/* 页面标题和操作 */}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">文档管理</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">管理和组织您的所有文档</p>
            </div>
            <button class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus class="h-4 w-4" />
              新建文档
            </button>
          </div>

          {/* 搜索和筛选 */}
          <div class="flex flex-col gap-4 sm:flex-row">
            <div class="relative flex-1">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文档..."
                class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
              <Filter class="h-4 w-4" />
              筛选
            </button>
          </div>

          {/* 文档列表占位 */}
          <div class="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <FileText class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">暂无文档</h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              点击上方"新建文档"按钮创建您的第一个文档
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
});
