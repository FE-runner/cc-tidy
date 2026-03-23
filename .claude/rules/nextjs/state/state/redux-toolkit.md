---
description: Redux Toolkit 与 Next.js
globs: **/*slice*.ts, **/*store*.ts, **/store/**/*.ts, **/redux/**/*.ts
---

# Redux Toolkit

## 何时使用 Redux（vs Zustand 或服务端状态）

| 使用 Redux | 不使用 Redux |
|-----------|-------------|
| 有很多 reducer 的复杂客户端状态 | 简单的 UI 状态（使用 `useState`） |
| 跨多个远距组件共享的状态 | 已在 Server Components 中的服务端数据 |
| 需要中间件、devtools、时间旅行 | 客户端状态极少的小项目 |
| RTK Query 用于客户端数据获取 | 可以在服务端获取的数据 |

## 关键指令

- 务必使用 `makeStore()` 工厂 — 在 SSR 中每个请求创建新 store
- 务必使用 `StoreProvider`（客户端组件）包裹应用，使用 `useRef` 避免重复创建
- 务必创建类型化 hooks：`useAppDispatch`、`useAppSelector`、`useAppStore`，通过 `.withTypes<>()` 实现
- 务必将 selectors 与其 slice 共置
- 务必处理异步 thunk 的所有 3 个状态：`pending`、`fulfilled`、`rejected`
- 务必使用 RTK Query 进行客户端 API 调用 — 处理缓存、去重、轮询

## Slice 结构

- 每个功能领域一个 slice
- 为 state 定义 `interface`，为 reducers 使用类型化的 `PayloadAction`
- 从同一文件导出 actions 和 selectors

## Next.js 特定

- Store 必须按请求创建（工厂模式）— 不使用全局单例
- Provider 必须是包裹 `children` 的客户端组件（在 layout 中）
- 禁止用 Server Component 数据注水 Redux — 改为通过 props 传递

## 反模式

- 禁止在 Redux 中复制 Server Component 数据 — 通过 props 传递
- 禁止使用无类型的 `useDispatch` / `useSelector` — 始终使用类型化 hooks
- 禁止将所有东西都放在 Redux 中 — 局部状态和服务端状态有更好的归属
- 禁止忘记异步 thunks 的 `extraReducers` — 否则会静默失败
