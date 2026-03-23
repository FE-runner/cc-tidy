---
description: Next.js 中间件和 Edge 函数
globs: **/middleware.ts, **/src/middleware.ts
---

# Next.js 中间件

运行在 **Edge 运行时**，在每个匹配的请求之前执行。保持轻量。

## 中间件应该做什么

- 认证/授权检查（JWT 验证、会话验证）
- 重定向和重写（语言检测、遗留 URL）
- 请求/响应头操作（安全头、请求 ID）
- 功能标志 / A/B 路由（通过 cookies）

## 中间件不应该做什么

- 重计算 — 会阻塞每个匹配的请求
- 数据库查询 — 改用 Server Components 或 API 路由
- Node.js API（`fs`、`path`）— Edge 运行时不支持
- 响应体修改 — 会丢失 Next.js 功能；使用重写/重定向

## 匹配器配置

务必始终定义匹配器以避免在静态资源上运行。

```typescript
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

模式参考：`/dashboard/:path*`（特定）、`/(api|admin)/:path*`（多路径）、`/((?!api/public).*)`（排除）。

## 认证模式

参见认证规则了解 `auth.config.ts`（Edge）vs `auth.ts`（Node.js）的分离。
务必使用 `callbackUrl` 重定向未认证用户以便登录后返回。

## 安全头

务必在中间件中设置安全头（`X-Frame-Options`、`X-Content-Type-Options`、`Referrer-Policy`、CSP）以实现全应用覆盖。

## `proxy.ts`（Next.js 16）

`proxy.ts` 替代 `middleware.ts` — 运行在 Node.js 运行时（非 Edge）。
重命名导出：`middleware()` 变为 `proxy()`。
Node.js API（`fs`、`path` 等）现在可用。
代码迁移工具：`npx @next/codemod@latest middleware-to-proxy .`

## 反模式

- 禁止使用 `new Response('body')` — 返回原始响应，丢失 Next.js 路由
- 禁止导入 Node.js 模块 — 中间件仅限 Edge（直到 proxy.ts）
- 禁止内联速率限制逻辑 — 使用兼容 Edge 的服务（Upstash、Vercel WAF）
- 禁止在没有匹配器的情况下运行中间件 — 它会在包括静态文件在内的每个请求上执行
