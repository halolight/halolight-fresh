import { useSignal } from "@preact/signals";
import { ArrowLeft, Mail } from "lucide-preact";
import { Alert, Button, Input } from "@/components/ui.tsx";
import { authApi } from "@/lib/api.ts";
import { showToast } from "@/lib/stores.ts";

export default function ForgotPasswordForm() {
  const email = useSignal("");
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);
  const success = useSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    error.value = null;

    if (!email.value) {
      error.value = "请输入邮箱";
      return;
    }

    loading.value = true;

    try {
      const response = await authApi.forgotPassword(email.value);

      if (response.code === 200) {
        success.value = true;
        showToast({ type: "success", title: "发送成功", message: "请查收邮件" });
      } else {
        error.value = response.message || "发送失败";
      }
    } catch (_err) {
      error.value = "网络错误，请稍后重试";
    } finally {
      loading.value = false;
    }
  };

  if (success.value) {
    return (
      <div class="space-y-5 text-center">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <Mail class="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">邮件已发送</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            我们已向 <span class="font-medium">{email.value}</span> 发送了密码重置链接。
            <br />
            请检查您的收件箱（或垃圾邮件文件夹）。
          </p>
        </div>
        <Button
          variant="outline"
          class="w-full"
          onClick={() => (success.value = false)}
        >
          重新发送
        </Button>
        <a
          href="/login"
          class="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          <ArrowLeft class="h-4 w-4" />
          返回登录
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-5">
      {error.value && <Alert type="error" message={error.value} />}

      <p class="text-sm text-gray-600 dark:text-gray-400">
        请输入您的注册邮箱，我们将向您发送密码重置链接。
      </p>

      <Input
        label="邮箱"
        type="email"
        placeholder="请输入注册邮箱"
        value={email.value}
        onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
        icon={<Mail class="h-5 w-5" />}
        required
      />

      <Button type="submit" class="w-full" loading={loading.value}>
        发送重置链接
      </Button>

      <a
        href="/login"
        class="flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft class="h-4 w-4" />
        返回登录
      </a>
    </form>
  );
}
