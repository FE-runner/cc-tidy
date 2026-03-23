---
description: Next.js 15+ 项目规范和架构
alwaysApply: true
---

# Next.js 项目指南

## 技术栈

- Next.js 15+（仅 App Router）配合 Turbopack
- React 19+
- TypeScript 严格模式
- Nx monorepo

## 渲染模型

- **PPR（部分预渲染）** — 静态外壳 + 动态流式孔洞
- 在 `next.config.ts` 中启用 `ppr: true`（自 15.2 起稳定 — 不再在 `experimental` 下）
- 启用 `cacheComponents: true`（Next.js 16+）或 `experimental: { dynamicIO: true }`（Next.js 15）以主动选择缓存
- 使用动态 API 的函数（`cookies()`、`headers()`、`searchParams`）动态渲染；使用 `"use cache"` 将特定函数/组件选入缓存
- 使用 `<Suspense>` 在静态页面中定义动态孔洞

## 架构 — Nx

| 文件夹 | 用途 |
|--------|------|
| `apps/[app]/app/` | App Router — 路由、布局、页面 |
| `apps/[app]/app/(group)/` | 路由组（不在 URL 中） |
| `apps/[app]/app/_components/` | 私有共置组件 |
| `libs/[domain]/feature/` | 功能逻辑 |
| `libs/[domain]/ui/` | 展示型组件 |
| `libs/[domain]/data-access/` | API、server actions |
| `libs/[domain]/util/` | 工具函数 |

## 服务端 vs 客户端组件

| 服务端（默认） | 客户端（`'use client'`） |
|----------------|--------------------------|
| 数据获取、数据库访问 | useState、useEffect、hooks |
| 密钥 / 环境变量 | 事件处理、浏览器 API |
| 保留在服务端的重依赖 | 交互式 UI "孤岛" |

将 `'use client'` 推到叶子节点 — 参见组件规则。

## React 19 变更

- `ref` 是普通 prop — 禁止使用 `forwardRef`
- `useActionState` 用于表单状态管理
- `useOptimistic` 用于乐观 UI
- `use()` 在客户端组件中解包 promises/context

## 代码风格

- 每个文件一个组件，命名导出
- 默认导出仅用于 `page.tsx`、`layout.tsx`、`loading.tsx`、`error.tsx`、`not-found.tsx`
- 文件：`kebab-case.tsx` — 组件：`PascalCase` — Hooks：`useCamelCase`
- Props 接口定义在组件之上

## 缓存（Next.js 15）

- 所有缓存都是**主动选择** — 参见缓存规则了解 `"use cache"`、`cacheTag()`、`cacheLife()` 模式

## 性能

- 将大多数 UI 保持为 Server Components
- 使用 `next/dynamic` 处理重量级客户端组件
- 始终使用 `next/image` 和 `next/link`
- 禁止使用 `useEffect` 获取数据

## 命令

```bash
nx serve [app]              # 开发服务器（Turbopack）
nx build [app] --configuration=production
nx test [lib]               # 单元测试
nx affected -t test         # 测试受影响的内容
nx e2e [app]-e2e            # E2E 测试
```
