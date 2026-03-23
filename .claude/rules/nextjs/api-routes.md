---
description: Next.js API 路由处理程序
globs: **/app/api/**/*.ts, **/src/app/api/**/*.ts
---

# API 路由处理程序（App Router）

## 何时使用 API Routes vs Server Actions

| 使用 API Routes | 使用 Server Actions |
|-----------------|---------------------|
| 被第三方消费的外部 API | 来自自身 UI 的表单变更 |
| Webhooks、SSE、流式传输 | 数据变更后的重新验证 |
| 非 Next.js 客户端（移动端、CLI） | 与页面紧密耦合 |

## 关键指令

- 务必使用 Zod `safeParse` 验证所有输入后再处理
- 务必返回结构化错误响应 — 永远不要暴露内部错误消息
- 务必使用 `NextResponse.json()` 并附带明确的状态码
- 务必 `await params` 和 `searchParams` — 它们是 Promises（参见路由规则）
- 务必 `await headers()` 和 `await cookies()` — 两者在 Next.js 15 中都是异步的

## 路由段配置

```typescript
export const dynamic = 'force-dynamic';    // 始终动态
export const runtime = 'edge';             // Edge 运行时
export const maxDuration = 30;             // 最大执行时间（Vercel）
```

## 错误处理

务必创建带有 `status`、`message` 和 `code` 的类型化 `ApiError` 类。
务必捕获 `ApiError` 并返回结构化 JSON；捕获未知错误并返回通用 500。
禁止对未知错误返回 `error.message` — 会泄露堆栈信息。

## 流式传输（SSE）

务必使用 `ReadableStream` 配合 `text/event-stream` 内容类型来实现服务端推送事件。
务必在 SSE 响应上设置 `Cache-Control: no-cache`。

## 反模式

- 禁止跳过输入验证 — 直接注入风险
- 禁止向客户端暴露内部错误详情
- 禁止对 Server Components 可以直接获取的数据使用 API 路由
- 禁止忘记列表端点的分页 — 始终支持 `page` + `limit`
