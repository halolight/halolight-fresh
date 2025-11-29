import type { PageProps } from "@fresh/core";

export default function App({ Component }: PageProps) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Halolight Fresh</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-gray-50 dark:bg-gray-900">
        <Component />
      </body>
    </html>
  );
}
