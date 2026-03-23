---
description: Next.js 使用 Vitest 和 Playwright 的测试
globs: **/*.test.tsx, **/*.test.ts, **/*.spec.tsx, **/*.spec.ts, **/*.e2e.ts
---

# 测试

## Server Components

务必通过将 Server Components 作为异步函数调用并断言结果来测试。RTL 中原生异步组件测试仍在发展中；考虑将数据获取和 Server Actions 作为单元测试单独测试。

## Server Actions

务必将 Server Actions 作为带 `FormData` 输入的普通异步函数测试。
务必通过断言 pending 状态、返回数据和错误状态来测试 `useActionState` 流程。

## Mock Next.js

在单元测试中 mock `next/navigation`（`useRouter`、`usePathname`、`useSearchParams`）和 `next/headers`（`cookies`、`headers`）。两者都是 Server Component 和 middleware 测试中常需的。

## MSW 用于 Next.js

务必使用 MSW 配合 `next/server` 适配器在集成测试中 mock 外部 API 调用。
务必在应用旁的共享 `mocks/` 目录中配置 MSW 处理程序。

## 反模式

- 禁止在不 mock 仅服务端模块的情况下将 Server Components 导入客户端测试文件
- 禁止跳过错误状态测试 — 验证 `error.tsx` 边界和 Server Action 验证反馈
