import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";
import { FolderOpen, Grid, List, Search, Upload } from "lucide-preact";

export default define.page(function FilesPage() {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="文件存储" currentPath="/files">
        <div class="space-y-6">
          {/* 页面标题和操作 */}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">文件存储</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">上传和管理您的文件</p>
            </div>
            <button class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Upload class="h-4 w-4" />
              上传文件
            </button>
          </div>

          {/* 搜索和视图切换 */}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="relative flex-1 max-w-md">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文件..."
                class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div class="flex items-center gap-2">
              <button class="rounded-lg p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20">
                <Grid class="h-5 w-5" />
              </button>
              <button class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <List class="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 文件列表占位 */}
          <div class="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <FolderOpen class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">暂无文件</h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              拖拽文件到此处或点击上传按钮
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
});
