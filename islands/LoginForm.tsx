import { useSignal } from "@preact/signals";
import {
  Chrome,
  Eye,
  EyeOff,
  Github,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  User,
} from "lucide-preact";

interface LoginFormProps {
  demoEmail?: string;
  demoPassword?: string;
  showDemoHint?: boolean;
}

export default function LoginForm(
  { demoEmail = "", demoPassword = "", showDemoHint = true }: LoginFormProps,
) {
  const email = useSignal("");
  const password = useSignal("");
  const remember = useSignal(false);
  const showPassword = useSignal(false);
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    error.value = null;

    if (!email.value || !password.value) {
      error.value = "请填写邮箱和密码";
      return;
    }

    loading.value = true;

    try {
      // 模拟登录验证
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Demo 账号验证
      if (
        (email.value === "admin@halolight.h7ml.cn" && password.value === "123456") ||
        (email.value && password.value.length >= 6)
      ) {
        // 保存登录状态到 localStorage
        const user = {
          id: "user-1",
          email: email.value,
          name: email.value.split("@")[0],
        };
        localStorage.setItem("halolight_user", JSON.stringify(user));
        localStorage.setItem("halolight_token", `token-${Date.now()}`);

        // 跳转到仪表盘
        globalThis.location.href = "/dashboard";
      } else {
        error.value = "邮箱或密码错误";
      }
    } catch (err) {
      error.value = "网络错误，请稍后重试";
    } finally {
      loading.value = false;
    }
  };

  const fillDemo = () => {
    email.value = demoEmail;
    password.value = demoPassword;
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`使用 ${provider} 登录`);
  };

  return (
    <div class="space-y-3">
      {/* 第三方登录按钮 */}
      <div class="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          class="flex items-center justify-center h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 group dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <Github class="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          class="flex items-center justify-center h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 group dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <Chrome class="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("wechat")}
          class="flex items-center justify-center h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 group dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <MessageCircle class="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* 分隔线 */}
      <div class="relative py-2">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-600" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400 font-medium">
            或使用邮箱登录
          </span>
        </div>
      </div>

      {/* 登录表单 */}
      <form onSubmit={handleSubmit} class="space-y-3">
        {error.value && (
          <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {error.value}
          </div>
        )}

        {/* 邮箱输入 */}
        <div class="space-y-1.5">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400">邮箱地址</label>
          <div class="relative group">
            <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
            <input
              type="email"
              placeholder="your@email.h7ml.cn"
              class="w-full pl-10 pr-4 h-11 text-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all bg-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-400 dark:text-white dark:placeholder:text-gray-500"
              value={email.value}
              onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
              required
            />
          </div>
        </div>

        {/* 密码输入 */}
        <div class="space-y-1.5">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400">密码</label>
          <div class="relative group">
            <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showPassword.value ? "text" : "password"}
              placeholder="••••••••"
              class="w-full pl-10 pr-10 h-11 text-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all bg-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-400 dark:text-white dark:placeholder:text-gray-500"
              value={password.value}
              onInput={(e) => (password.value = (e.target as HTMLInputElement).value)}
              required
            />
            <button
              type="button"
              onClick={() => (showPassword.value = !showPassword.value)}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword.value ? <EyeOff class="h-4 w-4" /> : <Eye class="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* 记住我 & 忘记密码 */}
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={remember.value}
              onChange={(e) => (remember.value = (e.target as HTMLInputElement).checked)}
              class="rounded border-gray-300 w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span class="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 transition-colors">
              记住我
            </span>
          </label>
          <a
            href="/forgot-password"
            class="text-blue-600 hover:text-blue-700 font-medium transition-colors dark:text-blue-400"
          >
            忘记密码？
          </a>
        </div>

        {/* 测试账号按钮 */}
        {demoEmail && demoPassword && (
          <div class="flex items-center gap-2 py-1">
            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
            <button
              type="button"
              onClick={fillDemo}
              class="h-6 px-2 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 flex items-center gap-1"
            >
              <User class="h-3 w-3" />
              测试账号
            </button>
            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
          </div>
        )}

        {/* 登录按钮 */}
        <button
          type="submit"
          disabled={loading.value}
          class="w-full h-11 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading.value
            ? (
              <>
                <Loader2 class="h-4 w-4 animate-spin" />
                登录中...
              </>
            )
            : (
              <>
                登录
                <span class="ml-1">→</span>
              </>
            )}
        </button>
      </form>
    </div>
  );
}
