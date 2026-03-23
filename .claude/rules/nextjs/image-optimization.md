---
description: Next.js 使用 next/image 的图片优化
globs: **/app/**/*.tsx, **/components/**/*.tsx, **/next.config.*
---

# 图片优化

## 关键指令

- 务必始终使用 `next/image` 而非 `<img>` — 提供懒加载、响应式 srcSet、格式优化
- 务必仅对首屏 / LCP 图片添加 `priority`（hero、banner）
- 务必在使用 `fill` 时提供 `sizes` — 没有它浏览器无法选择正确的 srcSet
- 务必对静态导入使用 `placeholder="blur"`（自动生成），或为远程图片提供 `blurDataURL`
- 务必在 `next.config.ts` 中使用 `remotePatterns` 处理外部图片域名（不使用已弃用的 `domains`）
- 务必将 `fill` 图片包裹在 `position: relative` 的容器中

## 远程图片

远程图片需要显式的 `width`/`height` 或 `fill` 模式。
在 `next.config.ts` 中通过 `images.remotePatterns` 配置允许的来源，使用 `protocol`、`hostname` 和 `pathname`。

## 响应式尺寸

| 布局 | `sizes` 值 |
|------|-----------|
| 全宽 | `100vw` |
| 2 列网格 | `(max-width: 768px) 100vw, 50vw` |
| 3 列网格 | `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw` |
| 固定宽度卡片 | `300px` |

## 反模式

- 禁止使用 `<img>` — 无优化、无懒加载、无响应式行为
- 禁止对每张图片设置 `priority` — 这会使预加载失效（仅 LCP 图片）
- 禁止使用 `loading="eager"` — 改用 `priority`
- 禁止对小图标/SVG 使用 `next/image` — 使用内联 SVG 或 CSS
- 禁止跳过 `alt` 文本 — 空 `alt=""` 仅用于纯装饰性图片
- 禁止以原始分辨率提供用户上传 — 上传时调整大小或使用带变换的 CDN
