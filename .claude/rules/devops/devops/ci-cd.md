---
description: CI/CD 流水线最佳实践
globs: .github/workflows/**, .gitlab-ci.yml, **/azure-pipelines.yml, Jenkinsfile, .circleci/**
---

# CI/CD 最佳实践

## 流水线原则

- 先运行快速检查（lint、类型检查）— 快速失败
- 并行化独立的 job
- 在运行之间缓存依赖
- 使用并发组取消过时的运行
- 在 monorepo 中使用 `affected` 命令 — 永远不要每次提交都运行所有任务

## 流水线顺序

1. Lint + 类型检查（快速、并行）
2. 单元测试（并行）
3. 构建
4. 集成/E2E 测试
5. 部署（生产环境需要审批门禁）

## 质量门禁

| 检查 | 阈值 |
|------|------|
| Lint | 0 错误 |
| 类型检查 | 0 错误 |
| 单元测试 | 100% 通过 |
| 覆盖率 | >= 80% |
| 安全审计 | 0 严重 |
| 构建 | 成功 |

## 分支保护

- 合并前要求 PR 审查
- 要求状态检查通过
- 强制线性历史（squash 或 rebase）
- 限制对 main 的强制推送

## CI 中的密钥

- 使用 CI 提供商的密钥管理 — 永远不要在工作流文件中硬编码
- 为不同阶段使用环境范围的密钥
- 通过 CI 提供商的密钥语法引用（例如 GitHub Actions 中的 `${{ secrets.NAME }}`）

## 缓存

- 使用内置缓存（例如 GitHub Actions 中的 `actions/setup-node` 配合 `cache: 'npm'`）
- 基于 lock 文件哈希作为缓存键
- 使用 Docker 层缓存配合 `cache-from: type=gha`

## 反模式

- 禁止在 monorepo 中每次提交都运行所有测试 — 使用 `affected`
- 禁止跳过缓存 — 慢流水线扼杀生产力
- 禁止在工作流文件中硬编码密钥
- 禁止在没有审批门禁的情况下部署到生产环境
- 禁止跳过回滚策略规划
