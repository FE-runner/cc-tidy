---
description: Next.js Server Components 中的数据获取模式
globs: **/app/**/*.tsx, **/app/**/*.ts
---

# 数据获取

## Server Components 是默认的数据层

务必在 Server Components 中直接获取数据 — 不需要 API 路由的往返。
务必使用带直接 `await` 的 `async` Server Components 进行数据库或 API 调用。
务必只查询 UI 需要的字段（ORM 中使用 `select`，API 中使用显式字段）。

## 并行获取

务必使用 `Promise.all()` 处理独立的数据需求 — 避免顺序瀑布。
禁止在没有真实依赖的情况下，`await` 完一个 fetch 后才开始另一个。

## 使用 Suspense 流式传输

务必将慢速异步组件包裹在 `<Suspense>` 中并使用细粒度的回退。
禁止将整个页面包裹在单个 `<Suspense>` 中 — 这会使流式传输失效。
每个 `<Suspense>` 边界独立流式传输 — 按数据速度拆分。

## 客户端组件

务必使用 `use()` hook 来解包从 Server Components 传递的 promises。
对于需要客户端交互的服务端数据：在 Server Component 中获取，作为 props 传递。

## 动态参数（Next.js 15）

动态参数（`params`、`searchParams`）是 Promises — 参见路由规则。

## 错误处理

- 在 fetch 函数中抛出错误 — 它们会冒泡到最近的 `error.tsx`
- 对 404 调用 `notFound()` — 触发 `not-found.tsx`
- 禁止静默捕获并返回 `null` — 对用户隐藏了错误

## 反模式

- 禁止默认使用 `cache: 'force-cache'` — Next.js 15+ 默认不缓存；改用 `"use cache"` 指令显式选入
- 禁止同步解构 `params` — 参见路由规则
