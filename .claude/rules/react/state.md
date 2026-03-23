---
description: React 状态管理模式
globs: **/src/**/*.tsx
---

# React 状态管理

## 决策矩阵

| 范围 | 方案 | 场景 |
|------|------|------|
| 组件内部 | `useState` / `useReducer` | 简单值、开关、表单输入 |
| 派生 | 在渲染中计算 | 过滤、排序、格式化现有状态 |
| 共享（小） | Context + `useReducer` | 认证、主题、语言 — 低频更新 |
| 共享（复杂） | Zustand | 跨功能状态、频繁更新、需要中间件 |
| 原子/细粒度 | Jotai | 多个独立片段、派生原子、最小重新渲染 |
| 服务端状态 | TanStack Query | API 数据 — 缓存、后台刷新、分页 |
| 乐观 UI | `useOptimistic` | 异步变更期间的即时反馈 |

## 核心规则

- **就近放置状态**：将状态保持在最低公共祖先 — 仅在兄弟组件需要时提升
- **派生而非同步**：如果值可以从现有 state/props 计算，在渲染中计算 — 永远不要用 `useState` + `useEffect` 同步
- **`useReducer` 优于 `useState`**：当状态转换依赖于前一状态或涉及多个相关值时
- **Context 拆分**：每个领域一个 context（认证、主题、语言）— 永远不要一个巨型 context 包含所有内容

## Context 指南

- 始终提供自定义 hook（`useAuth`、`useTheme`），在 provider 外使用时抛出错误
- 使用 `use(Context)`（React 19）代替 `useContext` — 支持条件读取
- `<Context.Provider>` 已过时 — 优先直接使用 `<Context value={...}>`（React 19）。`Context.Provider` 将在未来版本中弃用。

## 反模式

- 禁止用 `useEffect` 同步 props 到 state — 派生值或使用 key 重置
- 禁止将所有东西放在全局状态中 — 大多数状态是局部的或服务端持有的
- 禁止将 `useRef` 用于影响渲染的值 — refs 不会触发重新渲染
- 禁止将状态提升得超出必要 — 在父树中导致不必要的重新渲染
