---
description: Zustand 与 Next.js 的状态管理
globs: **/*store*.ts, **/*store*.tsx, **/stores/**/*.ts
---

# Zustand

## 何时使用 Zustand（vs Redux 或服务端状态）

| 使用 Zustand | 不使用 Zustand |
|-------------|---------------|
| 中小型客户端状态 | 可在 Server Components 中获取的数据 |
| 需要最少的样板代码 | 需要中间件/devtools 的复杂状态 |
| 快速原型开发 | 需要时间旅行调试的状态 |
| 简单的跨组件共享 | 项目中已使用 Redux |

## 关键指令

- 务必保持 store 小而专注 — 每个领域关注点一个 store
- 务必使用选择器优化性能：`useStore((s) => s.field)` 仅在 `field` 变化时重新渲染
- 务必在选择多个字段作为对象时使用 `useShallow` — 防止不必要的重新渲染
- 务必对复杂嵌套状态更新使用 `immer` 中间件
- 务必对需要页面刷新后保留的状态使用 `persist` 中间件（主题、偏好设置）
- 务必在 store 内部定义 actions — 将状态和行为共置

## Store 模式

在单个类型中定义包含 state + actions 的 `interface`。
使用 `create<StoreType>()` 将所有 state 和 actions 放在一起。

## Slices（大型 Store）

当 store 增长超出单一关注点时使用 `StateCreator` 的 slice 模式。
用展开运算符组合 slices：`create<Combined>((...a) => ({ ...sliceA(...a), ...sliceB(...a) }))`。

## 测试

在 `beforeEach` 中通过 `useStore.setState({ ... })` 重置 store 状态。
使用 Testing Library 的 `renderHook` + `act` 进行 hook 测试。

## 反模式

- 禁止将 Server Component 数据放入 Zustand — 从服务端通过 props 传递
- 禁止解构整个 store（`const { a, b, c } = useStore()`）— 任何变化都会重新渲染
- 禁止在组件内部创建 store — 在模块级别定义
- 禁止在同一项目中混用 Zustand 和 Redux — 选择一个
