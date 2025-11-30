import type { PageProps } from "@fresh/core";
import { APP_CONFIG } from "@/lib/config.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="zh-CN" class="scroll-smooth">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={APP_CONFIG.description} />
        <meta name="author" content={APP_CONFIG.author} />
        <meta name="theme-color" content="#3b82f6" />
        <title>{APP_CONFIG.title}</title>
        <link rel="stylesheet" href="/styles.css?v=4" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        {/* 51.la 统计 */}
        <script
          charset="UTF-8"
          id="LA_COLLECT"
          src="//sdk.51.la/js-sdk-pro.min.js?id=L1NaKSoU1jvMh9mE&ck=L1NaKSoU1jvMh9mE&autoTrack=true&hashMode=true&screenRecord=true"
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XMS590XWNN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-XMS590XWNN');`,
          }}
        />
        {/* 主题初始化脚本 - 防止闪烁 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('halolight_theme');
                  if (theme) theme = JSON.parse(theme);
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body class="bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
        <Component />
      </body>
    </html>
  );
}
