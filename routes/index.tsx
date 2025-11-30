import { define } from "@/utils.ts";
import Counter from "@/islands/Counter.tsx";
import { APP_CONFIG } from "@/lib/config.ts";

export default define.page(function Home() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 导航 */}
      <nav class="flex items-center justify-between p-6">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <span class="text-lg font-bold text-gray-900 dark:text-white">{APP_CONFIG.name}</span>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="/login"
            class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            登录
          </a>
          <a
            href="/register"
            class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            注册
          </a>
        </div>
      </nav>

      {/* 主内容 */}
      <main class="flex flex-col items-center justify-center px-6 py-20">
        <div class="max-w-4xl space-y-12 text-center">
          {/* 标题 */}
          <div class="space-y-4">
            <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {APP_CONFIG.name}
            </h1>
            <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
              {APP_CONFIG.description}
            </p>
          </div>

          {/* 特性 */}
          <div class="grid gap-8 sm:grid-cols-3">
            <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">极致性能</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                基于 Islands 架构，默认零 JavaScript，按需水合
              </p>
            </div>
            <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">现代技术栈</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Deno + Fresh + Preact + Signals + Tailwind CSS
              </p>
            </div>
            <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">开箱即用</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                完整的认证、权限、仪表盘、主题系统
              </p>
            </div>
          </div>

          {/* Islands 示例 */}
          <div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Islands 架构示例
            </h2>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              此计数器是一个 Island 组件，仅此部分会发送客户端 JavaScript
            </p>
            <Counter start={0} />
          </div>

          {/* 操作按钮 */}
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/dashboard"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              进入后台
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={APP_CONFIG.repository}
              target="_blank"
              class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://fresh.deno.dev/docs"
              target="_blank"
              class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Fresh 文档
            </a>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer class="border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
      </footer>
    </div>
  );
});
