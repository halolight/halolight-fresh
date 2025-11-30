import { useComputed, useSignal } from "@preact/signals";
import { Check, Eye, EyeOff, Lock, X } from "lucide-preact";
import { Alert, Button, Input } from "@/components/ui.tsx";
import { authApi } from "@/lib/api.ts";
import { showToast } from "@/lib/stores.ts";
import {
  cn,
  getPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthLabel,
  passwordRules,
} from "@/lib/utils.ts";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const showPassword = useSignal(false);
  const showConfirmPassword = useSignal(false);
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);
  const success = useSignal(false);

  // 密码强度
  const passwordStrength = useComputed(() => getPasswordStrength(password.value));
  const strengthLabel = useComputed(() => getPasswordStrengthLabel(passwordStrength.value));
  const strengthColor = useComputed(() => getPasswordStrengthColor(passwordStrength.value));

  // 密码规则检查
  const passedRules = useComputed(() =>
    passwordRules.map((rule) => ({
      ...rule,
      passed: rule.test(password.value),
    }))
  );

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    error.value = null;

    if (!password.value || !confirmPassword.value) {
      error.value = "请填写所有字段";
      return;
    }

    if (password.value !== confirmPassword.value) {
      error.value = "两次输入的密码不一致";
      return;
    }

    if (passwordStrength.value < 2) {
      error.value = "密码强度太弱，请设置更复杂的密码";
      return;
    }

    loading.value = true;

    try {
      const response = await authApi.resetPassword(token, password.value);

      if (response.code === 200) {
        success.value = true;
        showToast({ type: "success", title: "重置成功", message: "请使用新密码登录" });
      } else {
        error.value = response.message || "重置失败";
      }
    } catch (err) {
      error.value = "网络错误，请稍后重试";
    } finally {
      loading.value = false;
    }
  };

  const strengthColors = {
    gray: "bg-gray-200",
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  if (success.value) {
    return (
      <div class="space-y-5 text-center">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <Check class="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">密码重置成功</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            您的密码已成功重置，请使用新密码登录。
          </p>
        </div>
        <Button class="w-full" onClick={() => (globalThis.location.href = "/login")}>
          前往登录
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-5">
      {error.value && <Alert type="error" message={error.value} />}

      <p class="text-sm text-gray-600 dark:text-gray-400">
        请设置您的新密码。
      </p>

      <div class="space-y-2">
        <div class="relative">
          <Input
            label="新密码"
            type={showPassword.value ? "text" : "password"}
            placeholder="请设置新密码"
            value={password.value}
            onInput={(e) => (password.value = (e.target as HTMLInputElement).value)}
            icon={<Lock class="h-5 w-5" />}
            required
          />
          <button
            type="button"
            onClick={() => (showPassword.value = !showPassword.value)}
            class="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword.value ? <EyeOff class="h-5 w-5" /> : <Eye class="h-5 w-5" />}
          </button>
        </div>

        {/* 密码强度指示器 */}
        {password.value && (
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    class={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      passwordStrength.value >= level
                        ? strengthColors[strengthColor.value as keyof typeof strengthColors]
                        : "bg-gray-200 dark:bg-gray-700",
                    )}
                  />
                ))}
              </div>
              <span class="text-xs text-gray-500">{strengthLabel.value}</span>
            </div>

            {/* 密码规则检查列表 */}
            <div class="grid grid-cols-2 gap-1.5">
              {passedRules.value.map((rule) => (
                <div
                  key={rule.label}
                  class={cn(
                    "flex items-center gap-1.5 text-xs",
                    rule.passed ? "text-green-600 dark:text-green-400" : "text-gray-400",
                  )}
                >
                  {rule.passed ? <Check class="h-3.5 w-3.5" /> : <X class="h-3.5 w-3.5" />}
                  {rule.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div class="relative">
        <Input
          label="确认新密码"
          type={showConfirmPassword.value ? "text" : "password"}
          placeholder="请再次输入新密码"
          value={confirmPassword.value}
          onInput={(e) => (confirmPassword.value = (e.target as HTMLInputElement).value)}
          icon={<Lock class="h-5 w-5" />}
          error={confirmPassword.value && password.value !== confirmPassword.value
            ? "两次输入的密码不一致"
            : undefined}
          required
        />
        <button
          type="button"
          onClick={() => (showConfirmPassword.value = !showConfirmPassword.value)}
          class="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showConfirmPassword.value ? <EyeOff class="h-5 w-5" /> : <Eye class="h-5 w-5" />}
        </button>
      </div>

      <Button type="submit" class="w-full" loading={loading.value}>
        重置密码
      </Button>
    </form>
  );
}
