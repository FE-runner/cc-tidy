---
description: Next.js Server Actions 和数据变更
globs: **/actions.ts, **/actions.tsx, **/actions/**/*.ts, **/actions/**/*.tsx, **/_actions/**/*.ts, **/_actions/**/*.tsx, **/*.action.ts, **/*.actions.ts, **/app/**/page.tsx, **/app/**/route.ts
---

# Server Actions

## 安全 — 视为公开的 POST 端点

每个 Server Action 都是一个暴露的 HTTP POST 端点。始终：
- **认证** — 在任何逻辑之前验证 session/token
- **授权** — 检查用户是否有权执行该操作
- **验证** — 使用 Zod 解析输入（永远不要直接信任 `formData`）

## 返回类型模式

务必对所有 action 结果使用可辨识联合类型：

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };
```

## 关键指令

- 务必在 action 文件顶部添加 `'use server'`（不要逐函数内联）
- 务必在任何数据库操作之前使用 Zod `safeParse` 验证所有输入
- 务必在每次变更后调用 `revalidateTag()` 或 `revalidatePath()`
- 务必使用 `.bind(null, id)` 从客户端组件传递额外参数
- 务必将 actions 放在使用它的页面旁的 `actions.ts` 中

## 客户端集成

- `useActionState(action, initialState)` — 替代已弃用的 `useFormState`；返回 `[state, formAction, isPending]`
- 传递给 `useActionState` 的 action 接收 `(previousState: State, formData: FormData)` — 注意与独立 Server Actions 相比多了第一个参数
- `useOptimistic(state, updateFn)` — 在服务器确认之前提供即时 UI 反馈

## 反模式

- 禁止跳过验证 — Server Actions 接受任意 POST 请求体
- 禁止在变更后忘记重新验证 — UI 会显示过期数据
- 禁止使用 `router.refresh()` — 使用 `revalidatePath` / `revalidateTag`
- 禁止在 action 结果中返回敏感数据（密码哈希、token）
- 禁止将 Server Actions 用于数据读取 — 改用 Server Components
