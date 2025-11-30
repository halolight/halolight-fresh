# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Halolight Fresh 是一个基于 Deno Fresh 的现代化中文后台管理系统，具备 Islands 架构和极致性能。

- **在线预览**: https://halolight-fresh.h7ml.cn
- **GitHub**: https://github.com/halolight/halolight-fresh

## 技术栈速览

- **运行时**: Deno
- **核心框架**: Fresh 2
- **UI 库**: Preact
- **状态管理**: @preact/signals
- **样式**: Tailwind CSS 3.4
- **类型**: TypeScript (内置)

## 常用命令

```bash
deno task dev       # 启动开发服务器
deno task build     # 生产构建
deno task start     # 启动生产服务器
deno task check     # 类型检查
deno task fmt       # 格式化代码
deno task lint      # 代码检查
deno task test      # 运行测试
deno task test:coverage  # 测试覆盖率
deno task ci        # 运行所有检查（格式、lint、类型、测试）
```

## 测试

测试位于 `tests/` 目录：

```
tests/
├── setup.ts              # 测试环境设置（mock localStorage/sessionStorage/matchMedia）
└── lib/
    ├── utils.test.ts     # 工具函数测试（cn, formatDate, formatNumber 等）
    ├── config.test.ts    # 配置测试（APP_CONFIG, AUTH_CONFIG, hasPermission）
    └── stores.test.ts    # 状态管理测试（认证、主题、UI 设置、Toast）
```

运行测试：

```bash
deno task test           # 运行所有测试
deno task test:watch     # 监视模式
deno task test:coverage  # 生成覆盖率报告（输出到 coverage/lcov.info）
```

## CI/CD

GitHub Actions 工作流位于 `.github/workflows/ci.yml`，包含：

- **lint**: 格式检查、代码检查、类型检查
- **test**: 运行测试并上传覆盖率到 Codecov
- **build**: 生产构建验证
- **security**: Deno 安全审计
- **dependency-review**: PR 依赖审查

## 架构

### Fresh Islands 架构

```tsx
// routes/index.tsx - 服务端渲染
export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      {/* Island: 仅此组件在客户端水合 */}
      <Counter />
    </main>
  );
}

// islands/Counter.tsx - 客户端交互
import { signal } from "@preact/signals";

const count = signal(0);

export default function Counter() {
  return (
    <button onClick={() => count.value++}>
      Count: {count}
    </button>
  );
}
```

### 目录结构

```
├── deno.json         # Deno 配置
├── dev.ts            # 开发入口
├── main.ts           # 生产入口
├── routes/           # 页面路由
│   ├── index.tsx     # 首页
│   ├── _app.tsx      # 应用布局
│   └── api/          # API 路由
├── islands/          # 交互组件（客户端水合）
├── components/       # 纯服务端组件
├── lib/              # 工具库
├── tests/            # 单元测试
├── static/           # 静态资源
└── .github/          # CI/CD 配置
```

### Fresh 特性

- **Islands 架构**：默认零 JS，按需水合交互组件
- **Deno 原生**：无需 node_modules，直接使用 URL 导入
- **边缘部署**：优化用于 Deno Deploy
- **文件路由**：基于目录结构的路由

### 路由约定

- `routes/index.tsx` - / 路由
- `routes/about.tsx` - /about 路由
- `routes/blog/[id].tsx` - /blog/:id 动态路由
- `routes/api/users.ts` - /api/users API 端点
- `routes/_app.tsx` - 应用布局
- `routes/_404.tsx` - 404 页面

### Islands vs Components

```
islands/           # 需要客户端交互的组件
├── Counter.tsx    # 有状态、有事件处理
└── Modal.tsx      # 有用户交互

components/        # 纯服务端组件
├── Header.tsx     # 静态内容
└── Footer.tsx     # 无交互
```

### 代码规范

- **Islands**: 只有需要客户端交互的组件放入 `islands/`
- **Signals**: 使用 `@preact/signals` 管理状态
- **Deno 风格**: 使用 Deno 格式化和 lint 规则

## 环境变量

Fresh 使用 Deno 原生环境变量：

```typescript
// 读取环境变量
const apiUrl = Deno.env.get("API_URL") ?? "/api";
```

| 变量名         | 说明           | 默认值      |
| -------------- | -------------- | ----------- |
| `API_URL`      | API 基础 URL   | `/api`      |
| `MOCK_ENABLED` | 启用 Mock 数据 | `true`      |
| `APP_TITLE`    | 应用标题       | `Admin Pro` |

## 新增功能开发指南

### 添加新页面

```tsx
// routes/dashboard.tsx
export default function Dashboard() {
  return (
    <main class="p-4">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
    </main>
  );
}
```

### 添加新 Island

```tsx
// islands/UserMenu.tsx
import { signal } from "@preact/signals";

const isOpen = signal(false);

export default function UserMenu() {
  return (
    <div>
      <button onClick={() => isOpen.value = !isOpen.value}>
        Menu
      </button>
      {isOpen.value && (
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      )}
    </div>
  );
}
```

### 添加 API 路由

```typescript
// routes/api/users.ts
import { Handlers } from "@fresh/core";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const users = await getUsers();
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async POST(req, _ctx) {
    const body = await req.json();
    const user = await createUser(body);
    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  },
};
```

## 注意事项

- **Islands 限制**: Islands 不能导入服务端模块
- **Deno 权限**: 运行时需要 `-A` 或指定权限
- **URL 导入**: 使用 `deno.json` 的 `imports` 管理依赖
