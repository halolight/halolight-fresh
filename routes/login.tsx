import { define } from "@/utils.ts";
import LoginForm from "@/islands/LoginForm.tsx";
import { APP_CONFIG } from "@/lib/config.ts";
import { Sparkles } from "lucide-preact";

export default define.page(function LoginPage() {
  const demoEmail = Deno.env.get("DEMO_EMAIL") || "admin@halolight.h7ml.cn";
  const demoPassword = Deno.env.get("DEMO_PASSWORD") || "123456";
  const showDemoHint = Deno.env.get("SHOW_DEMO_HINT") !== "false";

  const features = [
    { icon: "🚀", text: "快速部署，即刻启动" },
    { icon: "📊", text: "实时数据分析与可视化" },
    { icon: "🔒", text: "企业级安全保障" },
    { icon: "⚡", text: "极致性能体验" },
  ];

  return (
    <div class="min-h-screen flex flex-col lg:flex-row">
      {/* 左侧品牌区域 - 桌面端显示 */}
      <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* 渐变背景 */}
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
        {/* 网格覆盖 */}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* 动态光晕 */}
        <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-blue-400/30 to-cyan-400/30 animate-pulse" />
        <div
          class="absolute top-1/3 -right-32 w-80 h-80 rounded-full blur-3xl bg-gradient-to-br from-indigo-400/40 to-purple-400/40 animate-pulse"
          style="animation-delay: 1s"
        />
        <div
          class="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-violet-400/30 to-pink-400/30 animate-pulse"
          style="animation-delay: 2s"
        />

        {/* 浮动圆点 */}
        <div
          class="absolute w-2 h-2 rounded-full bg-white/20 animate-bounce"
          style="left: 20%; top: 30%; animation-delay: 0s; animation-duration: 3s"
        />
        <div
          class="absolute w-2 h-2 rounded-full bg-white/20 animate-bounce"
          style="left: 35%; top: 50%; animation-delay: 0.5s; animation-duration: 3.5s"
        />
        <div
          class="absolute w-2 h-2 rounded-full bg-white/20 animate-bounce"
          style="left: 50%; top: 70%; animation-delay: 1s; animation-duration: 4s"
        />
        <div
          class="absolute w-2 h-2 rounded-full bg-white/20 animate-bounce"
          style="left: 65%; top: 40%; animation-delay: 1.5s; animation-duration: 3s"
        />
        <div
          class="absolute w-2 h-2 rounded-full bg-white/20 animate-bounce"
          style="left: 80%; top: 60%; animation-delay: 2s; animation-duration: 4.5s"
        />

        {/* 内容 */}
        <div class="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          {/* Logo */}
          <div class="flex items-center gap-3 mb-12">
            <div class="relative h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
              <Sparkles class="h-7 w-7" />
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div>
              <h2 class="text-2xl font-bold tracking-tight">{APP_CONFIG.name}</h2>
              <p class="text-xs text-white/60">企业级管理系统</p>
            </div>
          </div>

          {/* 标题 */}
          <h1 class="text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            欢迎回来
            <span class="inline-block ml-2 animate-pulse">👋</span>
          </h1>
          <p class="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            登录您的账户，开始管理您的业务数据和团队协作，体验高效的工作流程。
          </p>

          {/* 特性列表 */}
          <div class="space-y-4">
            {features.map((item, index) => (
              <div
                key={item.text}
                class="flex items-center gap-3 group"
                style={`animation-delay: ${0.1 * index}s`}
              >
                <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span class="text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div class="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-y-auto">
        <div class="w-full max-w-md">
          {/* 移动端 Logo */}
          <div class="mb-6 lg:hidden text-center">
            <div class="inline-flex items-center gap-2 mb-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
              <Sparkles class="h-5 w-5 text-white" />
              <span class="text-lg font-bold text-white">{APP_CONFIG.name}</span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">欢迎回来，请登录您的账户</p>
          </div>

          {/* 登录卡片 */}
          <div class="rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80">
            {/* 渐变顶部边框 */}
            <div class="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-t-2xl" />

            {/* 卡片头部 */}
            <div class="text-center pt-6 pb-4 px-6">
              <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                登录账户
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                输入您的邮箱和密码登录
              </p>
            </div>

            {/* 表单区域 */}
            <div class="px-6 pb-6">
              <LoginForm
                demoEmail={demoEmail}
                demoPassword={demoPassword}
                showDemoHint={showDemoHint}
              />
            </div>

            {/* 底部 */}
            <div class="border-t border-gray-200/50 px-6 py-5 space-y-3 dark:border-gray-700/50">
              <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
                还没有账户？{" "}
                <a
                  href="/register"
                  class="text-blue-600 hover:text-blue-700 font-semibold dark:text-blue-400 transition-colors"
                >
                  立即注册
                </a>
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 text-center">
                <a
                  href="/terms"
                  class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  服务条款
                </a>
                {" · "}
                <a
                  href="/privacy"
                  class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  隐私政策
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
