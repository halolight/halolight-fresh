import { define } from "@/utils.ts";
import ResetPasswordForm from "@/islands/ResetPasswordForm.tsx";
import { APP_CONFIG } from "@/lib/config.ts";

export default define.page(function ResetPasswordPage(props) {
  // 从 URL 获取 token
  const url = new URL(props.url);
  const token = url.searchParams.get("token") || "";

  return (
    <div class="flex min-h-screen items-center justify-center bg-gray-50 p-8 dark:bg-gray-900">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{APP_CONFIG.name}</h1>
          <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">重置密码</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">设置您的新密码</p>
        </div>

        <div class="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
});
