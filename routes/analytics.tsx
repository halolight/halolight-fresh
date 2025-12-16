import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";
import { BarChart3, Clock, Download, Eye, TrendingDown, TrendingUp, Users } from "lucide-preact";

export default define.page(function AnalyticsPage() {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="数据分析" currentPath="/analytics">
        <div class="space-y-6">
          {/* 页面标题 */}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">数据分析</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">查看网站访问和业务数据</p>
            </div>
            <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
              <Download class="h-4 w-4" />
              导出报告
            </button>
          </div>

          {/* 统计卡片 */}
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <div class="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <Eye class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span class="inline-flex items-center text-sm text-green-600">
                  <TrendingUp class="mr-1 h-4 w-4" />
                  12%
                </span>
              </div>
              <p class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">24,589</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">总访问量</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <div class="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                  <Users class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span class="inline-flex items-center text-sm text-green-600">
                  <TrendingUp class="mr-1 h-4 w-4" />
                  8%
                </span>
              </div>
              <p class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">活跃用户</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <div class="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                  <Clock class="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span class="inline-flex items-center text-sm text-red-600">
                  <TrendingDown class="mr-1 h-4 w-4" />
                  3%
                </span>
              </div>
              <p class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">4:32</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">平均停留</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <div class="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                  <BarChart3 class="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span class="inline-flex items-center text-sm text-green-600">
                  <TrendingUp class="mr-1 h-4 w-4" />
                  15%
                </span>
              </div>
              <p class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">68.5%</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">转化率</p>
            </div>
          </div>

          {/* 图表占位 */}
          <div class="grid gap-6 lg:grid-cols-2">
            <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">访问趋势</h3>
              <div class="mt-4 flex h-64 items-center justify-center text-gray-400">
                <BarChart3 class="h-12 w-12" />
              </div>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">用户分布</h3>
              <div class="mt-4 flex h-64 items-center justify-center text-gray-400">
                <BarChart3 class="h-12 w-12" />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
});
