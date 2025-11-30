import { define } from "@/utils.ts";
import RegisterForm from "@/islands/RegisterForm.tsx";
import { APP_CONFIG } from "@/lib/config.ts";

export default define.page(function RegisterPage() {
  return (
    <div class="flex min-h-screen">
      {/* 左侧品牌区域 */}
      <div class="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-gradient-to-br from-emerald-600 to-teal-700 p-12 text-white">
        <div>
          <h1 class="text-3xl font-bold">{APP_CONFIG.name}</h1>
          <p class="mt-2 text-emerald-100">{APP_CONFIG.description}</p>
        </div>
        <div class="space-y-6">
          <div class="space-y-2">
            <p class="text-lg font-medium">快速上手</p>
            <p class="text-emerald-100">注册即可体验完整的后台管理功能</p>
          </div>
          <div class="space-y-2">
            <p class="text-lg font-medium">安全可靠</p>
            <p class="text-emerald-100">强密码策略保护您的账号安全</p>
          </div>
          <div class="space-y-2">
            <p class="text-lg font-medium">功能丰富</p>
            <p class="text-emerald-100">用户管理、数据分析、文档管理等一应俱全</p>
          </div>
        </div>
        <p class="text-sm text-emerald-200">
          &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
        </p>
      </div>

      {/* 右侧注册区域 */}
      <div class="flex w-full items-center justify-center bg-gray-50 p-8 dark:bg-gray-900 lg:w-1/2">
        <div class="w-full max-w-md space-y-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">创建账号</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">开始使用 {APP_CONFIG.name}</p>
          </div>

          <div class="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
});
