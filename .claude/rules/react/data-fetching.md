---
description: TanStack Query v5 数据获取和变更
globs: **/src/api/**, **/src/hooks/use*Query*, **/src/hooks/use*Mutation*, **/src/features/**/api/**
---

# 数据获取

## 技术栈

- **TanStack Query v5** 作为所有客户端数据获取的默认选择
- **Suspense 边界** 作为默认加载模式
- **`use()` hook** 在客户端组件中解包服务端数据（promises）

## 查询

- 始终使用对象语法：`useQuery({ queryKey, queryFn })` — 不使用位置参数（v4 语法）
- 在 v5 中使用 `isPending`（而非 `isLoading`）表示初始加载状态
- 对分页使用 `placeholderData: keepPreviousData` — 不使用旧的 `keepPreviousData: true`

## 查询键

- 使用层次化结构以支持选择性失效：`['users', 'list', filters]`、`['users', 'detail', id]`
- 为每个实体创建键工厂：`userKeys.all`、`userKeys.list(filters)`、`userKeys.detail(id)`
- 在键中包含查询依赖的所有变量

## 变更

- 在 `onSuccess` 中使相关查询失效 — 禁止在变更后手动更新本地状态
- 通过 `onMutate` / `onError` / `onSettled` 使用乐观更新以获得即时反馈
- 在乐观缓存写入之前始终取消进行中的查询（`queryClient.cancelQueries`）

## `use()` Hook（React 19）

- 参见 hooks 规则了解 `use()` API 详情 — 在 Suspense 边界内使用以解包服务端数据

## Suspense 集成

- 将数据依赖的组件包裹在 `<Suspense fallback={...}>` 中以实现流式 UX
- 当组件应挂起而非处理加载状态时使用 `useSuspenseQuery`
- 嵌套 Suspense 边界以避免全页加载状态

## 反模式

- 禁止在 `useEffect` + `useState` 中获取数据 — 使用 TanStack Query 或路由 loaders
- 禁止使用扁平字符串键（`'users-list-admin'`）— 使用层次化数组以控制缓存
- 禁止手动将服务端数据同步到 `useState` — 让查询缓存成为真实来源
- 禁止忘记对依赖查询使用 `enabled: false` — 防止过早获取
