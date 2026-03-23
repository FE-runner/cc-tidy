---
description: Next.js 服务端和客户端组件
globs: **/apps/**/*.tsx, **/libs/**/*.tsx, **/app/**/*.tsx, **/src/**/*.tsx, **/components/**/*.tsx
---

# 组件（Next.js 15 / React 19）

## 组合

务必使用 children/slots（组合）替代大量 props — 避免 prop 逐层传递。

## 文件组织

- 将私有组件放在页面旁的 `_components/` 中
- 共享组件放在 `libs/shared/ui/` 中并使用桶文件导出

## 错误和加载边界

- `error.tsx` — 必须是 `'use client'`；接收 `{ error, reset }` props
- `loading.tsx` — 路由段的自动 Suspense 回退
- `not-found.tsx` — 由 `notFound()` 调用触发

## 反模式

- 禁止在没有类型安全的情况下展开 props
- 禁止使用匿名/未命名组件 — 影响调试
- 禁止在只有子组件需要交互性时给父组件添加 `'use client'`
