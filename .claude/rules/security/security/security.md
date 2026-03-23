---
description: OWASP Top 10 安全规则和额外加固指令
globs: **/*.ts, **/*.js, **/*.py, **/*.cs, **/*.java
---

# 安全规则（OWASP Top 10）

## A01 — 失效的访问控制

- 验证资源所有权 — 永远不要仅信任客户端提供的 ID
- 在每个端点检查授权 — 默认拒绝
- 对状态变更操作使用反 CSRF token
- 设置 cookies：`httpOnly: true`、`secure: true`、`sameSite: 'strict'`

## A02 — 加密失败

- 永远不要存储明文密码 — 使用 bcrypt（cost 12+）或 argon2id（禁止使用 MD5/SHA1）
- 到处使用 TLS — 生产环境无例外

## A03 — 注入

- 所有数据库查询必须参数化 — 永远不要拼接用户输入
- 优先使用 ORM/查询构建器 — 原始 SQL 仅使用参数化查询
- 优先使用安全 API 而非 `exec()` — 在 shell 命令前净化输入
- 永远不要对用户内容使用 `innerHTML`/`dangerouslySetInnerHTML` — 使用 DOMPurify

## A04 — 不安全的设计

- 在服务端验证所有输入 — 使用允许列表而非禁止列表
- 使用 schema 验证（Zod、Pydantic、FluentValidation）验证类型、长度、格式、范围

## 批量赋值保护

- 务必在每个 update/patch 端点上显式白名单允许的字段
- 禁止将原始请求体传递给 ORM 更新方法 — 先映射到 DTO/schema
- 框架：NestJS `whitelist: true`、FastAPI/Flask Pydantic/Marshmallow schemas、Hono/Elysia 验证 schemas
- 原因：AI 倾向于生成 `Model.update(req.body)`，这允许攻击者设置管理员标志或更改所有权

## A05 — 安全配置错误

- 设置：`Strict-Transport-Security`、`X-Content-Type-Options: nosniff`、`X-Frame-Options: DENY`、`CSP`
- 使用 `helmet`（Node.js）、`django-csp`（Python）或等效中间件

### CORS

- 务必配置特定来源 — 永远不要在带凭证时使用 `origin: '*'`
- 务必设置 `Access-Control-Max-Age`（例如 3600）并将 `Allow-Methods` 限制为已使用的方法
- 禁止在生产环境中使用 `origin: '*'` — 白名单精确域名
- 禁止不经验证就回显 `Origin` 头 — 等同于 `*`

## A06 — 易受攻击的组件 / 供应链安全

- 务必使用 lock 文件并在 CI 中使用 `npm ci` / `pip install --require-hashes` 安装
- 务必在 CI 中运行 SCA — `npm audit`、`pip-audit`、`dotnet list package --vulnerable`
- 务必在生产环境中将依赖锁定到精确版本 — 避免 `^` / `~` 范围
- 禁止在未审查维护者数量、最后发布日期和下载统计的情况下添加依赖
- 移除未使用的依赖 — 更小的攻击面 = 更少的漏洞

## A07 — 认证失败

- 使用加密安全的随机会话 token（最少 128 位熵）
- 5 次失败尝试后账户锁定，使用指数退避
- 对密钥使用常量时间比较（`timingSafeEqual`、`hmac.compare_digest`）
- 禁止将 JWT 存储在 localStorage — 使用 httpOnly cookies

## A08 — 数据完整性失败

- 验证 CI/CD 流水线完整性 — 签名制品，对第三方脚本使用 SRI
- 禁止在未验证的情况下反序列化不可信数据

## A09 — 日志和监控失败

- 永远不要向用户暴露堆栈跟踪、内部路径、版本或查询详情

## A10 — SSRF

- 在服务端 HTTP 请求中使用 URL 允许列表 — 永远不要让用户输入控制目标
- 使用网络级控制限制出站流量 — 返回前净化响应

## 文件上传安全

- 务必使用 magic bytes 在服务端验证 MIME 类型 — 永远不要仅信任 `Content-Type` 头
- 务必在框架级别强制最大文件大小并使用扩展名允许列表（永远不用禁止列表）
- 务必净化文件名（剥离路径分隔符，优先使用基于 UUID 的名称）并存储在 web 根目录之外
- 禁止依赖客户端验证 — 可以被绕过
