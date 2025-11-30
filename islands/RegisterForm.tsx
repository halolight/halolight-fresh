import { useComputed, useSignal } from "@preact/signals";
import { Check, Eye, EyeOff, Lock, Mail, User, X } from "lucide-preact";
import { Alert, Button, Checkbox, Input } from "@/components/ui.tsx";
import { authApi } from "@/lib/api.ts";
import { setAuthState, showToast } from "@/lib/stores.ts";
import {
  cn,
  getPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthLabel,
  passwordRules,
} from "@/lib/utils.ts";

export default function RegisterForm() {
  const name = useSignal("");
  const email = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const agreeTerms = useSignal(false);
  const showPassword = useSignal(false);
  const showConfirmPassword = useSignal(false);
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);

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

    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
      error.value = "请填写所有必填字段";
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

    if (!agreeTerms.value) {
      error.value = "请同意服务条款和隐私政策";
      return;
    }

    loading.value = true;

    try {
      const response = await authApi.register({
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      if (response.code === 200 && response.data) {
        setAuthState(response.data.user, response.data.token);
        showToast({ type: "success", title: "注册成功", message: "欢迎加入！" });
        globalThis.location.href = "/dashboard";
      } else {
        error.value = response.message || "注册失败";
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

  return (
    <form onSubmit={handleSubmit} class="space-y-5">
      {error.value && <Alert type="error" message={error.value} />}

      <Input
        label="用户名"
        type="text"
        placeholder="请输入用户名"
        value={name.value}
        onInput={(e) => (name.value = (e.target as HTMLInputElement).value)}
        icon={<User class="h-5 w-5" />}
        required
      />

      <Input
        label="邮箱"
        type="email"
        placeholder="请输入邮箱"
        value={email.value}
        onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
        icon={<Mail class="h-5 w-5" />}
        required
      />

      <div class="space-y-2">
        <div class="relative">
          <Input
            label="密码"
            type={showPassword.value ? "text" : "password"}
            placeholder="请设置密码"
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
          label="确认密码"
          type={showConfirmPassword.value ? "text" : "password"}
          placeholder="请再次输入密码"
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

      <Checkbox
        label={
          <span>
            我已阅读并同意{" "}
            <a href="/terms" class="text-blue-600 hover:underline dark:text-blue-400">
              服务条款
            </a>{" "}
            和{" "}
            <a href="/privacy" class="text-blue-600 hover:underline dark:text-blue-400">
              隐私政策
            </a>
          </span>
        }
        checked={agreeTerms.value}
        onChange={(e) => (agreeTerms.value = (e.target as HTMLInputElement).checked)}
      />

      <Button type="submit" class="w-full" loading={loading.value}>
        注册
      </Button>

      <p class="text-center text-sm text-gray-600 dark:text-gray-400">
        已有账号？{" "}
        <a href="/login" class="text-blue-600 hover:underline dark:text-blue-400">
          立即登录
        </a>
      </p>
    </form>
  );
}
