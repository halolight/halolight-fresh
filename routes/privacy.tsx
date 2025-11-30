import { define } from "@/utils.ts";
import { APP_CONFIG } from "@/lib/config.ts";
import { ArrowLeft, Sparkles } from "lucide-preact";

export default define.page(function PrivacyPage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div class="max-w-4xl mx-auto px-4 py-12">
        {/* 头部 */}
        <div class="mb-8">
          <a
            href="/login"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft class="h-4 w-4" />
            返回登录
          </a>
          <div class="flex items-center gap-3 mb-4">
            <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles class="h-5 w-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{APP_CONFIG.name}</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">隐私政策</h1>
          <p class="text-gray-500 dark:text-gray-400">最后更新：2024年1月1日</p>
        </div>

        {/* 内容 */}
        <div class="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl p-8 space-y-8 dark:bg-gray-800/80 dark:border-gray-700/50">
          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. 信息收集</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              我们收集您在使用服务时主动提供的信息，包括但不限于：注册账户时提供的邮箱地址、用户名等基本信息；
              使用服务过程中产生的操作日志、设备信息等。我们承诺仅收集提供服务所必需的最少信息。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. 信息使用</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              我们使用收集的信息用于：提供、维护和改进我们的服务；向您发送服务相关的通知；
              进行数据分析以改善用户体验；防止欺诈和滥用行为。我们不会将您的个人信息出售给第三方。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. 信息保护</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              我们采用业界标准的安全措施来保护您的个人信息，包括数据加密、访问控制、安全审计等。
              我们定期审查安全实践，确保您的数据得到妥善保护。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Cookie 使用</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              我们使用 Cookie 和类似技术来记住您的偏好设置、分析服务使用情况。
              您可以通过浏览器设置管理 Cookie，但这可能影响部分功能的正常使用。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. 信息共享</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              除以下情况外，我们不会与第三方共享您的个人信息：获得您的明确同意；
              法律法规要求；保护我们或用户的权益；与我们的服务提供商合作（他们同样受保密义务约束）。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. 您的权利</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              您有权访问、更正或删除您的个人信息；有权撤回您的同意；有权要求我们限制处理您的信息。
              如需行使这些权利，请通过下方联系方式与我们联系。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. 联系我们</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
              <br />
              邮箱：privacy@halolight.h7ml.cn
            </p>
          </section>
        </div>

        {/* 底部 */}
        <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} {APP_CONFIG.name}. 保留所有权利。</p>
        </div>
      </div>
    </div>
  );
});
