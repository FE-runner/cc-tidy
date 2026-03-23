---
description: 代码变更后同步更新 OpenSpec 规范文件
alwaysApply: true
---

# OpenSpec 规范同步规则

## 核心原则

代码与规范必须保持同步 — 过期的规范比没有规范更糟糕。

## 何时同步

当代码变更涉及以下内容时，必须检查并更新对应的 spec 文件（`openspec/specs/*/spec.md`）：

| 变更类型 | 示例 |
|----------|------|
| API 路由 | 新增/修改/删除端点、请求/响应格式变更 |
| 数据模型 | Prisma schema 字段增删、枚举值变更、关联关系调整 |
| 业务逻辑 | 状态机流转变更、权限规则调整、审核流程修改 |
| 页面/组件 | 新增页面路由、核心交互流程变更 |

## 操作流程

1. **检查**: 变更完成后，检查 `openspec/specs/` 下是否有覆盖该功能的规范
2. **更新**: 如有对应规范，将变更反映到 spec.md 中（新增字段、接口变更、行为变更等）
3. **扩展**: 如变更超出现有规范范围，考虑创建新的 spec 或扩展现有 spec

## 规范与功能的对应关系

| 规范 | 覆盖范围 |
|------|----------|
| `skill-management` | 技能 CRUD、文件上传、COS 存储 |
| `skill-discovery` | 搜索、列表、筛选、市场页面 |
| `skill-review` | 审核流程、状态流转 |
| `review-notification` | 飞书通知卡片 |
| `user-auth` | 飞书 OAuth、session 管理 |
| `user-management` | 用户列表、角色/状态管理 |
| `rbac` | 权限控制、角色定义 |
| `admin-dashboard` | 管理后台概览 |
| `api-error-handling` | API 错误响应格式 |
| `centralized-constants` | 常量集中化管理 |
| `server-client-optimization` | 服务端/客户端组件拆分 |
| `shadcn-component-unification` | UI 组件统一化 |

## 反模式

- 禁止只改代码不更新规范 — 导致规范与实现脱节
- 禁止在规范中保留已删除功能的描述 — 及时清理废弃内容
- 禁止创建没有对应实现计划的空规范 — 规范应反映实际或即将实现的功能
