---
description: Next.js 15 缓存策略和重新验证
globs: **/app/**/*.ts, **/app/**/*.tsx, **/next.config.*
---

# 缓存（Next.js 15 — 主动选择模型）

在 Next.js 15 中所有缓存都是**主动选择**的。默认不缓存任何内容。

## `"use cache"` 指令

需要在 `next.config.ts` 中设置 `cacheComponents: true`（Next.js 16+）或 `experimental: { dynamicIO: true }`（Next.js 15）。这是主要的缓存机制。

```tsx
import { cacheTag, cacheLife } from 'next/cache';

async function getProducts() {
  'use cache';
  cacheTag('products');
  cacheLife('hours');
  return db.product.findMany();
}
```

可应用于：函数、Server Components、整个路由模块。

## cacheLife 配置

| 配置 | 过期 | 重新验证 | 失效 |
|------|------|----------|------|
| `'default'` | 5min | 15min | 永不 |
| `'seconds'` | 30s | 1s | 1min |
| `'minutes'` | 5min | 1min | 1h |
| `'hours'` | 5min | 1h | 1day |
| `'days'` | 5min | 1day | 1week |
| `'weeks'` | 5min | 1week | 1month |
| `'max'` | 5min | 30days | 1year |

## 失效

```tsx
'use server';
import { revalidateTag } from 'next/cache';

export async function createProduct(formData: FormData) {
  await db.product.create({ data: parsed.data });
  revalidateTag('products'); // 使所有标记为 'products' 的缓存失效
}
```

## 路由段配置（备选）

| 配置 | 效果 |
|------|------|
| `export const dynamic = 'force-static'` | SSG — 完全静态 |
| `export const dynamic = 'force-dynamic'` | SSR — 永不缓存 |
| `export const revalidate = 60` | ISR — 每 60 秒重新验证 |

## 反模式

- 禁止假设 fetch 默认被缓存 — 在 Next.js 15 中并非如此
- 禁止在新代码中使用 `unstable_cache` — 使用 `"use cache"` + `cacheTag()` 代替
- 禁止缓存变更操作或副作用
- 禁止在不将用户 ID 包含在缓存键中的情况下缓存用户特定数据
- 禁止过度缓存动态数据（实时价格）或缓存不足的静态数据（配置）
