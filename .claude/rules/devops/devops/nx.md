---
description: Nx monorepo 工作区规则
globs: **/libs/**/*, **/apps/**/*, **/nx.json, **/project.json
---

# Nx Monorepo 规则

## 项目结构

新项目优先使用嵌套结构。如果项目已使用扁平命名，则尊重现有规范。

- 嵌套（推荐）：`libs/[scope]/[type]/`（例如 `libs/users/feature/`）
- 扁平（遗留）：`libs/[scope]/[type]-[name]`（例如 `libs/users/feature-list`）

两者都是 Nx 官方规范。

## 库类型

| 类型 | 用途 | 可导入 |
|------|------|--------|
| `feature` | 智能组件、路由、页面 | ui、data-access、util |
| `ui` | 展示型组件 | 仅 util |
| `data-access` | 状态管理、API 调用 | 仅 util |
| `util` | 纯函数、类型、常量 | 仅 util |

## 标签与边界

- 为每个项目打标签：`scope:[domain]`、`type:[feature|ui|data-access|util]`
- 在 ESLint 中使用 `@nx/enforce-module-boundaries` 强制边界
- `shared` 范围只能依赖 `shared`
- 领域范围可以依赖自身范围 + `shared`

## 导入路径

- 使用工作区路径：`import { X } from '@myorg/users/data-access'`
- 禁止跨库使用相对导入：`'../../../users/data-access/src'`

## Apps = 仅编排

- Apps 只包含最少的启动代码、路由和连接
- 所有应用逻辑放在 libs 中
- 禁止将业务逻辑放在 `apps/` 中

## 命令

| 命令 | 用途 |
|------|------|
| `nx affected -t test` | 仅测试变更的内容 |
| `nx affected -t build` | 仅构建变更的内容 |
| `nx affected -t lint` | 仅 lint 变更的内容 |
| `nx graph` | 可视化依赖图 |
| `nx reset` | 清除缓存 |

在 CI 中始终使用 `affected` 配合 `--base=main --head=HEAD`。

## 反模式

- 禁止从 `apps/` 导入到 `libs/`
- 禁止在库之间创建循环依赖
- 禁止将 `feature` 导入到 `ui` 或 `data-access`
- 禁止将领域特定的库导入到 `shared/` 范围
- 禁止跳过公共 API（`index.ts`）— 始终通过桶文件导出
- 禁止将业务逻辑放在 `apps/` 中 — 移动到 lib
