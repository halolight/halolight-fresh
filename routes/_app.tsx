import type { PageProps } from "@fresh/core";

export default function App({ Component }: PageProps) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Halolight Fresh</title>
        <link rel="stylesheet" href="/styles.css" />
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
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-XMS590XWNN');`,
          }}
        />
      </head>
      <body class="bg-gray-50 dark:bg-gray-900">
        <Component />
      </body>
    </html>
  );
}
