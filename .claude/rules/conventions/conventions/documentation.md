---
description: 文档标准和 API 文档规范
globs: **/README.md, **/CHANGELOG.md, **/docs/**, **/ADR/**
---

# 文档标准

## 何时添加注释

- 注释"为什么"，而非"是什么" — 如果代码需要"是什么"的注释，应该重构
- 使用带工单引用的 `TODO(#ticket)` — 不允许孤立的 TODO
- 记录非显而易见的行为、变通方案和边界情况
- 使用 `FIXME`、`HACK`、`WARN`、`DEPRECATED` 前缀

## 何时编写文档

| 文档 | 编写时机... |
|------|------------|
| README | 项目存在时 — 必须包含快速开始、前置条件、配置表 |
| ADR | 做出重大架构决策时 |
| CHANGELOG | 每次发布 — 遵循 Keep a Changelog 格式 |
| API 文档 | 存在公共 API 时 — 使用 OpenAPI/Swagger，保持同步 |
| Runbook | 运维生产服务时 |

## README 必备内容

- 简短描述（1-2 句话）
- 快速开始（clone、install、run）
- 前置条件及版本
- 配置表（变量、描述、默认值）
- 可用脚本（`dev`、`test`、`lint`、`build`）

## ADR 格式

- 标题、状态（Accepted/Deprecated/Superseded）、日期
- 上下文（什么问题）、决策（什么变更）、后果（权衡取舍）
- 文件命名：`docs/adr/001-short-description.md`

## 内联文档

- 对公共 API 使用 JSDoc/docstrings：参数、返回值、抛出的异常
- 禁止为私有内部实现编写文档，除非行为不明显
- 示例保持最少 — 每个函数一个用法示例即可

## 反模式

- 禁止编写与代码重复的文档
- 禁止让 README 过期 — 过期的文档比没有文档更糟糕
- 禁止跳过环境变量的文档记录
- 禁止创建没有列出备选方案的 ADR
