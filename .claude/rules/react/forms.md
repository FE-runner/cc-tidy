---
description: React 表单处理模式
globs: **/src/components/forms/**/*.tsx, **/src/**/form*.tsx, **/src/**/*-form.tsx
---

# React 表单

## 决策矩阵

| 复杂度 | 方案 | 场景 |
|--------|------|------|
| 简单（1-3 个字段，无客户端验证） | `<form action={fn}>` + `useActionState` | 联系、搜索、简单 CRUD |
| 中等（验证、动态字段） | React Hook Form + Zod | 登录、设置、个人资料 |
| 复杂（多步骤、数组、条件） | React Hook Form + Zod + `useFieldArray` | 向导、动态列表、嵌套表单 |

## useActionState（React 19 默认）

- 用于简单表单 — 参见 hooks 规则了解 `useActionState` API 详情
- 从 action 返回错误/成功状态 — 基于返回状态进行渲染

## React Hook Form + Zod（复杂表单）

- 始终使用 `zodResolver(schema)` — 验证的唯一真实来源
- 使用 `z.infer<typeof schema>` 从 Zod schema 推断 TypeScript 类型
- 对简单输入使用 `register()`，对第三方 UI 组件使用 `Controller`
- 访问 `formState.errors` 和 `isSubmitting` 获取 UI 反馈

## 无障碍（所有表单）

- 每个输入必须有关联的 `<label>` 和 `htmlFor`
- 使用 `aria-describedby` 和 `aria-invalid` 将错误链接到输入
- 错误消息必须使用 `role="alert"`
- 提交触发器必须是 `<button type="submit">` — 永远不要用 `<div>` 或 `<span>`

## 受控 vs 非受控

- 默认使用非受控（`<form action>` + FormData）— 更简单，更少重新渲染
- 仅在需要实时反馈时使用受控输入（防抖搜索、实时预览、字符计数）

## 反模式

- 禁止对每个表单都使用受控输入 — 大多数表单使用 FormData 就很好
- 禁止仅在客户端验证 — 始终在服务端也要验证
- 禁止跳过错误 `aria` 属性 — 屏幕阅读器依赖它们
- 禁止在 React Hook Form 或原生 actions 可以胜任时使用 `onChange` + `useState` 处理每个字段
