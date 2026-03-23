---
description: Docker 容器化最佳实践
globs: **/Dockerfile, **/docker-compose*.yml, **/.dockerignore
---

# Docker 最佳实践

## Dockerfile 原则

- 使用多阶段构建 — 分离构建和运行时阶段
- 使用特定版本标签 — 永远不要使用 `:latest`
- 以非 root 用户运行 — 创建专用的 `appuser`
- 按变更频率从低到高排列层：基础 > 系统依赖 > 应用依赖 > 应用代码
- 先复制依赖文件，安装，再复制源码 — 最大化层缓存命中

## 安全

- 将基础镜像锁定到特定版本（例如 `node:20.10.0-alpine`）
- 以非 root 运行：在 `RUN adduser` 之后使用 `USER appuser`
- 在生产 compose 中设置 `read_only: true` 和 `no-new-privileges: true`
- 永远不要在 Dockerfile 中放入密钥 — 使用运行时环境变量或密钥管理器

## .dockerignore

始终包含：`node_modules`、`.git`、`.env`、`.env.*`、`coverage`、`dist`、`.nx`、`*.md`、`.vscode`、`.idea`

## 健康检查

- 始终在 Dockerfile 或 compose 中定义 HEALTHCHECK
- 在应用中实现 `/health`、`/ready`、`/live` 端点
- 配置：interval 30s、timeout 10s、start_period 5-40s、retries 3

## Docker Compose

- 使用 `depends_on` 配合 `condition: service_healthy` 来控制启动顺序
- 在生产环境中设置资源限制（`cpus`、`memory`）
- 使用命名卷存储持久化数据
- 使用 `target` 选择构建阶段（`development` vs `production`）

## 环境变量

- 使用 `ARG` 处理构建时的值，使用 `ENV` 处理运行时的值
- 永远不要硬编码密钥 — 通过 `docker run -e` 或 `env_file` 传递

## 反模式

- 禁止使用 `:latest` 标签 — 锁定特定版本
- 禁止在生产环境中以 root 运行
- 禁止在安装依赖之前复制整个上下文 — 依赖变更频率更低
- 禁止跳过多阶段构建 — 最终镜像不应包含构建工具
- 禁止忘记 .dockerignore — 臃肿的上下文减慢构建
- 禁止跳过健康检查 — 容器编排器需要它们
- 禁止在 Dockerfile 或 compose 文件中硬编码密钥
