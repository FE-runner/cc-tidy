---
description: Git 工作流、分支和提交规范
globs: **/.github/**, **/COMMIT_EDITMSG, **/.husky/**, **/commitlint.config.*, **/release.config.*, **/CHANGELOG*
---

# Git 规则

## 提交消息（约定式提交）

格式：`type(scope): description` — 小写、祈使语气、不加句号

**禁止 `Co-Authored-By`** — 不要在提交中添加 Co-Authored-By 尾注。

| 类型 | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 仅文档 |
| `style` | 格式化，无代码变更 |
| `refactor` | 代码变更，非功能/修复 |
| `perf` | 性能改进 |
| `test` | 添加/更新测试 |
| `chore` | 构建、CI、依赖 |

- 禁止写含糊的消息："fix: bug fix"、"updated stuff"
- 禁止大写 description

## 分支命名

模式：`type/description` 或 `type/TICKET-description`

示例：`feat/user-authentication`、`fix/BUG-456-null-pointer`

## 工作流

- 始终将本地变更变基到远程：`git pull --rebase origin main`
- 禁止将 main 合并到功能分支 — 改用变基
- PR 之前用交互式变基整理提交
- 交互式暂存：`git add -p`

## Pull Requests

- 每个 PR 一个功能/修复 — 目标 < 400 行变更
- 将大变更拆分为堆叠式 PR
- PR 标题遵循约定式提交格式
- 创建 PR 前确保 lint 和测试通过

## AI 限制

- **AI 禁止执行 `git commit`** — 所有提交由用户手动完成
- **AI 禁止执行 `git push`** — 所有推送由用户手动完成
- AI 可以执行 `git add`、`git status`、`git diff`、`git log` 等只读/暂存操作

## 反模式

- 禁止对共享分支强制推送
- 禁止不运行 lint/测试就提交
- 禁止从 main 创建合并提交到功能分支
