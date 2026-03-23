---
description: React hooks 模式和最佳实践
globs: **/src/hooks/**/*.ts, **/src/features/**/hooks/**/*.ts
---

# React Hooks

## React 19 Hooks

### useActionState（替代已弃用的 useFormState）

- 返回 `[state, formAction, isPending]` — 用于带 pending/error 状态的表单提交
- Action 签名：`async (prevState, formData) => newState`
- 连接到 `<form action={formAction}>` 以实现渐进增强

### useOptimistic

- 在异步 action 完成时立即反映预期状态
- 签名：`useOptimistic(state, updateFn)` — 返回 `[optimisticState, addOptimistic]`
- 始终与解析为真实状态的 server action 配对

### use()

- 在渲染中解包 promises — 必须在 Suspense 边界内
- 有条件地解包 context — 与 `useContext` 不同，可以在 `if` 块内调用
- 禁止在渲染中创建 promises — 从父组件/loader/server component 传入

## 自定义 Hooks

- 以 `use` 为前缀 — 无例外
- 单一职责：一个 hook = 一个关注点
- 3 个以上的值返回对象（`{ data, isLoading, error }`），1-2 个返回元组
- 始终在 `useEffect` 返回中清理订阅、定时器和 AbortControllers

## useEffect 规则

- 始终为订阅、监听器和 fetch 调用提供清理函数
- 使用 `AbortController` 进行 fetch 清理 — 不要使用布尔标志
- 禁止使用 `useEffect` 处理事件 — 直接使用事件处理程序

## 反模式

- 禁止使用 `useFormState` — 已弃用，使用 `useActionState`
- 禁止在 `useEffect` 中省略依赖 — 让 linter 强制正确性
- 禁止在传递给 `use()` 的组件内部创建 promises — 导致无限重新渲染
