---
description: Next.js 使用 Prisma 的数据库访问
globs: **/prisma/**, **/db/**, **/lib/db.ts, **/lib/prisma.ts
---

# 数据库访问

## 客户端单例

务必为 ORM 客户端使用全局单例 — 防止开发环境中连接耗尽（HMR 会创建新实例）。

```typescript
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

## 关键指令

- 务必在 Server Components 中直接查询 — 不需要 API 路由
- 务必使用 Prisma `select` 只返回需要的字段 — 永远不要返回包含敏感数据的完整行
- 务必使用 Prisma `include` 加载关联而非在循环中查询（N+1）
- 务必对必须原子化的多步写入使用 `$transaction`
- 务必处理 `null` 结果 — 对缺失实体调用 `notFound()`

## 分页（Next.js 15）

`searchParams` 是 Promise — 解析前先 `await`（参见路由规则）。
务必始终在 `Promise.all()` 中并行运行 `findMany` + `count` 来处理分页响应。

## 连接池（Serverless）

务必在 serverless 部署中使用连接池（PgBouncer、Prisma Accelerate）。
务必为迁移配置 `directUrl`（绕过连接池）。

## Schema 规范

- 使用 `cuid()` 或 `uuid()` 作为 ID
- 始终添加 `createdAt` / `updatedAt`
- 为频繁查询的字段添加索引
- 对有界值集使用枚举

## 反模式

- 禁止每个请求实例化新客户端 — 会耗尽连接
- 禁止返回完整的用户对象 — 泄露密码哈希、token
- 禁止跳过 null 检查 — `findUnique` 可能返回 `null`
- 禁止通过连接池运行迁移 — 使用 `directUrl`
