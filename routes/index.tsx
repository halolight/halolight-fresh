import { define } from "@/utils.ts";
import Counter from "@/islands/Counter.tsx";

export default define.page(function Home() {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center p-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Halolight Fresh
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            基于 Deno Fresh 的现代化中文后台管理系统
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Islands 交互示例
          </h2>
          <Counter start={0} />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <a
            href="/dashboard"
            class="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition"
          >
            进入后台
          </a>
          <a
            href="https://fresh.deno.dev/docs"
            target="_blank"
            class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center py-3 px-4 rounded-lg transition"
          >
            Fresh 文档
          </a>
        </div>
      </div>
    </div>
  );
});
