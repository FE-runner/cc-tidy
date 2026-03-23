---
description: NPM/Yarn 包管理规范
globs: **/package.json
---

# npm 规范

## 版本锁定

- 使用精确版本 — 不使用 `^` 或 `~` 前缀
- 在 `.npmrc` 中设置 `save-exact=true` 以默认强制执行
- 原因：防止意外的破坏性变更，lock 文件是真实来源，但锁定版本增加了纵深防御

## 脚本

在所有项目中使用一致的脚本名称：

| 脚本 | 用途 |
|------|------|
| `dev` | 启动开发服务器 |
| `build` | 生产构建 |
| `start` | 启动生产服务器 |
| `test` | 运行测试 |
| `test:watch` | 以监视模式运行测试 |
| `test:cov` | 运行测试并生成覆盖率 |
| `lint` | 运行 linter |
| `lint:fix` | 自动修复 lint 问题 |
| `format` | 运行格式化工具 |

## 引擎要求

- 在 package.json 中指定 `engines.node` 以强制最低 Node.js 版本
- 使用 `.nvmrc` 或 `.node-version` 保持团队一致性

## 反模式

- 禁止使用 `^` 或 `~` 版本范围 — 锁定精确版本
- 禁止在 CI 中跳过 lock 文件 — 始终使用 `npm ci`，而非 `npm install`
- 禁止在未验证是否活跃维护的情况下添加依赖
