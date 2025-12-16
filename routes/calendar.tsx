import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-preact";

export default define.page(function CalendarPage() {
  const today = new Date();
  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  const dayNames = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <>
      <StoreInitializer />
      <AdminLayout title="日程安排" currentPath="/calendar">
        <div class="space-y-6">
          {/* 页面标题和操作 */}
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">日程安排</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">管理您的日程和事件</p>
            </div>
            <button class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus class="h-4 w-4" />
              新建事件
            </button>
          </div>

          {/* 日历 */}
          <div class="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {/* 日历头部 */}
            <div class="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <button class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <ChevronLeft class="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {today.getFullYear()}年{monthNames[today.getMonth()]}
                </h2>
                <button class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <ChevronRight class="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <button class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                今天
              </button>
            </div>

            {/* 星期头 */}
            <div class="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
              {dayNames.map((day) => (
                <div
                  key={day}
                  class="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 日历格子 */}
            <div class="grid grid-cols-7">
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - new Date(today.getFullYear(), today.getMonth(), 1).getDay() + 1;
                const isCurrentMonth = dayNum > 0 &&
                  dayNum <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                const isToday = isCurrentMonth && dayNum === today.getDate();

                return (
                  <div
                    key={i}
                    class={`min-h-24 border-b border-r border-gray-200 p-2 dark:border-gray-700 ${
                      !isCurrentMonth ? "bg-gray-50 dark:bg-gray-900" : ""
                    }`}
                  >
                    {isCurrentMonth && (
                      <span
                        class={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                          isToday
                            ? "bg-blue-600 font-bold text-white"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {dayNum}
                      </span>
                    )}
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
