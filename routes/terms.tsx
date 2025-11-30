import { define } from "@/utils.ts";
import { APP_CONFIG } from "@/lib/config.ts";
import { ArrowLeft, Sparkles } from "lucide-preact";

export default define.page(function TermsPage() {
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
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">服务条款</h1>
          <p class="text-gray-500 dark:text-gray-400">最后更新：2024年1月1日</p>
        </div>

        {/* 内容 */}
        <div class="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl p-8 space-y-8 dark:bg-gray-800/80 dark:border-gray-700/50">
          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. 服务说明</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {APP_CONFIG.name}{" "}
              是一个企业级后台管理系统平台，为用户提供数据管理、团队协作、业务分析等功能。
              使用本服务即表示您同意遵守本服务条款。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. 账户注册</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              您需要注册账户才能使用本服务的全部功能。注册时，您应提供真实、准确的信息，
              并妥善保管您的账户凭证。您对账户下的所有活动负责。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. 使用规范</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              您同意不会将本服务用于任何非法目的，不会上传或传播违法、有害、威胁性、辱骂性、
              骚扰性、诽谤性、粗俗、淫秽或其他令人反感的内容。您不得尝试未经授权访问我们的系统。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. 知识产权</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              本服务及其所有内容（包括但不限于文本、图形、标识、图标、图像、音频、视频、软件）
              均受知识产权法保护。未经我们书面许可，您不得复制、修改、分发或以其他方式使用这些内容。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. 服务变更</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              我们保留随时修改、暂停或终止服务的权利，恕不另行通知。我们可能会不时更新本服务条款，
              更新后的条款将在发布后立即生效。继续使用服务即表示您接受更新后的条款。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. 免责声明</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              本服务按"现状"和"可用"基础提供，不提供任何明示或暗示的保证。我们不保证服务将不间断、
              及时、安全或无错误。对于因使用本服务而产生的任何直接或间接损失，我们不承担责任。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. 适用法律</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              本服务条款受中华人民共和国法律管辖。因本条款引起的或与之相关的任何争议，
              双方应首先通过友好协商解决；协商不成的，任何一方均可向有管辖权的人民法院提起诉讼。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">8. 联系方式</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              如果您对本服务条款有任何疑问，请通过以下方式联系我们：
              <br />
              邮箱：support@halolight.h7ml.cn
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
