---
description: React Router v6.4+ / v7 路由和代码拆分
globs: **/src/router.*, **/src/routes/**, **/src/pages/**, **/src/app/routes/**
---

# 路由

## 路由选择

| 路由 | 场景 |
|------|------|
| React Router v6.4+ | 标准 SPA，带 loaders/actions 的数据驱动路由 |
| TanStack Router | 类型安全路由，基于文件的路由，高级搜索参数 |

## 路由定义

- 使用 `createBrowserRouter` 配合对象语法 — 不使用 `<BrowserRouter>` + JSX `<Route>` 元素
- 通过 `lazy` 属性懒加载所有路由组件以实现自动代码拆分
- 将 loaders 和 actions 与路由文件共置（`users.loader.ts`、`users.action.ts`）

## 数据加载

- 在 **loaders** 中获取数据，而非 `useEffect` — loaders 在渲染前运行并支持并行获取
- 使用 `useLoaderData<typeof loader>()` 对 loader 数据进行类型化，实现端到端类型安全
- 在 loaders/actions 中使用 `redirect()` 进行认证守卫和变更后重定向

## 变更

- 使用 React Router 的 `<Form>` 组件（非 `<form>`）触发路由 actions
- 在 action 函数中处理不同的方法（`POST`、`DELETE`）
- 访问 `useNavigation().state` 获取 `submitting`/`loading` 反馈

## 错误处理

- 为每个路由添加 `errorElement` — 至少在根路由上
- 使用 `isRouteErrorResponse(error)` 区分 404 和意外错误
- 嵌套错误边界：路由级别实现细粒度，根级别作为兜底

## 导航

- 使用 `<Link>` / `<NavLink>` 进行声明式导航
- 仅在用户操作后的编程式导航中使用 `useNavigate()`（登出等）
- 使用 `NavLink` 配合 `className={({ isActive }) => ...}` 处理活跃状态

## 反模式

- 禁止使用 `window.location.href` 进行 SPA 导航 — 会破坏客户端路由
- 禁止在 loaders 可用时在 `useEffect` 中获取数据 — 导致瀑布流
- 禁止在 `useEffect` 中重定向 — 在 loaders/actions 中使用 `redirect()`
- 禁止对数据驱动的应用使用旧的 `<BrowserRouter>` + `<Routes>` API
- 建议考虑带基于文件的 `route.ts` 的 React Router v7 框架模式用于新项目
