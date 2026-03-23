---
description: React 19+ 项目规范和架构
alwaysApply: true
---

# React 项目指南

## 技术栈

- React 19+ 配合 React Compiler 1.0（自动记忆化已启用）
- TypeScript 严格模式
- Vite（打包器）+ Vitest + React Testing Library

## 架构

按功能组织，共置相关代码：

```
src/
  components/ui/       # 设计系统基础组件
  features/[feature]/  # components/, hooks/, api/, types.ts
  hooks/               # 共享自定义 hooks
  lib/                 # 工具函数和辅助函数
  api/                 # API 客户端和端点
  types/               # 共享 TypeScript 类型
```

## React 19 基线

- **React Compiler**：自动处理记忆化
- **`ref` 作为 prop**：直接传递 `ref` — `forwardRef` 不再必要
- **`use()` hook**：在渲染中解包 promises 和 context，支持条件调用
- **`useActionState`**：替代已弃用的 `useFormState` 用于表单提交
- **`useOptimistic`**：异步过渡期间的乐观 UI 更新
- **Actions**：`<form action={fn}>` 模式的异步函数

## 组件模型

在 Vite SPA 中，所有组件默认都是客户端组件 — 不需要 `"use client"` 指令。

当使用支持 RSC 的框架（Next.js、React Router v7 框架模式）时：

| Server Components | Client Components |
|-------------------|-------------------|
| 默认 — 不需要 `"use client"` | 仅在使用 state/effects/浏览器 API 时添加 `"use client"` |
| 直接获取数据，允许 async | `useState`、`useEffect`、事件处理 |

## 代码风格

- 禁止 `React.FC` — 使用带类型 props 的普通函数声明
- 每个文件一个组件，仅命名导出（不使用默认导出）
- 文件：`kebab-case.tsx` / 组件：`PascalCase` / Hooks：`useCamelCase`
- Props 接口在组件之上声明，在签名中解构

### 组件内部顺序

1. Imports → 2. Types → 3. 组件函数 → 4. Hooks → 5. 派生状态 → 6. 处理程序 → 7. Effects → 8. JSX

## 反模式

- 禁止添加 `useMemo`/`useCallback`/`React.memo` — React Compiler 会处理
- 禁止使用 `React.FC` — 相比普通函数声明没有好处，增加了不必要的间接层
- 禁止使用类组件或 HOC — 使用 hooks 和组合

## 命令

```bash
npm run dev             # 开发服务器
npm run build           # 生产构建
npm run test            # 运行测试
npm run lint            # ESLint
npm run typecheck       # TypeScript 检查
```

## 性能

- 使用 `React.lazy` + Suspense 懒加载路由和重量级组件
- 使用 Suspense 边界作为默认加载模式
- 将复杂的对象/数组 prop 字面量提取为命名变量以提高可读性（React Compiler 处理记忆化）
- 优化前先用 React DevTools 分析 — 先信任编译器
