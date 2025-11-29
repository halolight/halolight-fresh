# Halolight Fresh | Admin Pro

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/halolight/halolight-fresh/blob/main/LICENSE)
[![Deno](https://img.shields.io/badge/Deno-2-%23000000.svg)](https://deno.com/)
[![Fresh](https://img.shields.io/badge/Fresh-2-%23FFDB1E.svg)](https://fresh.deno.dev/)
[![Preact](https://img.shields.io/badge/Preact-10-%23673AB8.svg)](https://preactjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-%2306B6D4.svg)](https://tailwindcss.com/)

基于 Deno Fresh 的现代化中文后台管理系统，具备 Islands 架构、零 JS 首屏和极致性能。

- 在线预览：<https://halolight-fresh.h7ml.cn>
- GitHub：<https://github.com/halolight/halolight-fresh>

## 功能亮点

- **Islands 架构**：默认零 JS，按需水合交互组件
- **Deno 原生**：无需 node_modules，TypeScript 开箱即用
- **边缘部署**：优化用于 Deno Deploy
- **Preact**：轻量级 UI 库
- **Signals**：细粒度响应式状态
- **Tailwind CSS**：原子化样式

## 目录结构

```
├── deno.json         # Deno 配置
├── dev.ts            # 开发入口
├── main.ts           # 生产入口
├── routes/           # 页面路由
├── islands/          # 交互组件
├── components/       # 静态组件
└── static/           # 静态资源
```

## 快速开始

```bash
deno task dev        # 开发模式
deno task build      # 生产构建
deno task start      # 启动生产服务器
```

## 技术栈

| 类别 | 技术 |
|------|------|
| 运行时 | Deno 2 |
| 核心框架 | Fresh 2 + Preact |
| 状态管理 | @preact/signals |
| 样式 | Tailwind CSS 3.4 |

## 为什么选择 Fresh

- **Islands 架构**：只有交互组件发送到客户端
- **零配置**：TypeScript、JSX 开箱即用
- **边缘优先**：专为 Deno Deploy 优化
- **Deno 生态**：安全、现代的 JavaScript 运行时

## 许可证

[MIT](LICENSE)
