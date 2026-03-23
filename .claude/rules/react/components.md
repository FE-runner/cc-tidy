---
description: React 组件模式和最佳实践
globs: **/src/components/**/*.tsx, **/src/features/**/components/**/*.tsx
---

# React 组件

## Server Components 意识

- 在 RSC 框架中组件默认是 Server Components
- 仅在使用以下内容时添加 `"use client"`：`useState`、`useEffect`、事件处理、浏览器 API
- 在组件树中尽可能将客户端边界推到低处

## Refs（React 19）

- 将 `ref` 作为普通 prop 传递 — 不再需要 `forwardRef`
- 类型为 `ref?: React.Ref<HTMLElement>`

## 组合

- 优先使用 children/slots 而非配置 props — 对复杂 UI 使用复合组件（`Card` + `Card.Header`）
- 对布局包装器使用 `children: ReactNode`，对多个插槽使用命名 `ReactNode` props
- 仅对通用列表/迭代器组件使用 render props（`renderItem`）

## 条件渲染

- 对简单条件使用 `&&`，对复杂分支使用提前返回
- 禁止嵌套三元运算符 — 提取为单独的组件或变量

## 事件处理

- 将处理程序提取为命名函数（`handleSubmit`）— 不在 JSX 中内联多行逻辑
- 显式声明事件参数类型（`FormEvent<HTMLFormElement>`）

## 反模式

- 禁止传递大量配置 props — 改用组合
- 禁止对动态列表使用 `index` 作为 `key` — 使用稳定的唯一标识符
