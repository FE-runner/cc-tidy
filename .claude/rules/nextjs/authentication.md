---
description: Next.js 认证模式
globs: **/auth/**, **/login/**, **/api/auth/**, **/middleware.ts
---

# 认证（NextAuth.js v5 / Auth.js）

## 架构

- `auth.config.ts` — 兼容 Edge 的配置（callbacks、pages）。用于 middleware。
- `auth.ts` — 完整配置，包含 providers 和 DB adapter。用于 Server Components。
- `app/api/auth/[...nextauth]/route.ts` — 路由处理程序：`export const { GET, POST } = handlers`

## 关键指令

- 务必将 `auth.config.ts`（Edge）和 `auth.ts`（Node.js）分离以兼容 middleware
- 务必在 middleware 或 Server Components 中检查认证 — 永远不要依赖客户端检查
- 务必使用受保护的布局（`app/(protected)/layout.tsx`）来守护路由组
- 务必通过 `jwt` 和 `session` 回调扩展 session 的自定义字段（role、id）
- 务必使用 `useActionState` 处理登录表单
- 务必为自定义 `User`、`Session`、`JWT` 字段扩展 `next-auth` 模块的类型

## 路由保护决策

| 方法 | 何时使用 |
|------|----------|
| Middleware `authorized` 回调 | 全应用保护，渲染前重定向 |
| Server Component `auth()` + `redirect()` | 带自定义逻辑的逐页检查 |
| 受保护的布局 | 路由组保护 |

## 反模式

- 禁止在客户端检查认证来保护路由 — 页面已加载，为时已晚
- 禁止返回完整的用户对象 — 只选择需要的字段，永远不要暴露密码哈希
- 禁止将敏感 token 存储在 `localStorage` — 通过 NextAuth 使用 httpOnly cookies
- 禁止在重定向时跳过 `callbackUrl` — 用户会丢失预期目的地
