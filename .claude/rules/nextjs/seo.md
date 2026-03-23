---
description: Next.js SEO 和元数据
globs: **/layout.tsx, **/page.tsx, **/app/sitemap.ts, **/app/robots.ts
---

# SEO 与元数据

## Metadata API

- 务必从 `page.tsx` / `layout.tsx` 导出 `metadata`（静态）或 `generateMetadata`（动态）
- 务必在根布局中设置 `metadataBase` — 所有相对 URL 基于它解析
- 务必在根布局中使用 `title.template`（`'%s | App Name'`），这样子页面只需设置 `title: 'Page'`
- 务必在所有公共页面上包含 `openGraph` 和 `twitter` 卡片元数据
- 务必在动态页面中使用 `generateMetadata` 配合 `await params`（参见路由规则）

## 结构化数据

务必在 Server Components 中通过 `<script type="application/ld+json">` 渲染 JSON-LD。
务必使用 schema.org 类型（`Article`、`Product`、`Organization`）来获得富搜索结果。

## Sitemap 与 Robots

- `app/sitemap.ts` — 导出返回 `MetadataRoute.Sitemap` 的异步函数
- `app/robots.ts` — 导出返回 `MetadataRoute.Robots` 的函数
- 务必为内容密集型网站从数据库动态生成 sitemap
- 务必在 robots 中禁止 `/admin/`、`/api/`、`/private/`

## 规范 URL

务必在每个页面设置 `alternates.canonical` 以防止重复内容惩罚。
务必为多语言网站设置 `alternates.languages`。

## 反模式

- 禁止在任何公共页面上遗漏元数据 — 缺少 title/description 影响排名
- 禁止在没有 canonical 的情况下重复内容 — 搜索引擎会惩罚
- 禁止意外设置 `robots: { index: false }` — 在每个页面上验证意图
- 禁止在设置了 `metadataBase` 的情况下硬编码完整 URL — 使用相对路径
