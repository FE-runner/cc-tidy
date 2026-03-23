---
description: 测试原则、AAA 模式和 mock
globs: **/*.spec.ts, **/*.test.ts, **/*.spec.tsx, **/*.test.tsx, **/test_*.py, **/*_test.py, **/tests/**/*.py, **/*Tests.cs, **/*Test.cs, **/*.spec.js, **/*.test.js
---

# 测试原则

## 测试结构

遵循 AAA（Arrange-Act-Assert）结构。

## 命名规范

| 语言 | 模式 | 示例 |
|------|------|------|
| TypeScript | `should [expected] when [condition]` | `it('should display error when input is invalid')` |
| Python | `test_action_condition_expected` | `def test_login_invalid_password_returns_401()` |
| C# | `MethodName_Scenario_ExpectedBehavior` | `Login_InvalidPassword_ReturnsUnauthorized()` |

## 测试组织

- 按类/模块分组测试
- 按方法或行为子分组
- 使用描述性的 describe/context 块

## Mock 最佳实践

- 只 mock 外部依赖
- 不要 mock 内部实现细节
- 使用工厂模式创建测试数据
- 在行为重要时验证交互

## 测试隔离

- 每个测试必须独立
- 不共享可变状态
- 测试应能以任意顺序运行
- 每个测试后清理

## 测试什么

| 优先级 | 内容 | 原因 |
|--------|------|------|
| 高 | 业务逻辑 | 核心价值 |
| 高 | 边界情况 | 常见 bug |
| 中 | 错误路径 | 优雅降级 |
| 中 | 集成点 | 契约验证 |
| 低 | 简单的 getter/setter | 低价值 |

## 覆盖率指南

- 业务逻辑 **80%+**
- 关键路径（支付、认证）**100%**
- 不要盲目追求覆盖率数字
- 一个有意义的测试 > 很多琐碎的测试

## 反模式

- 禁止编写依赖执行顺序的测试 — 每个测试必须能独立运行
- 禁止测试实现细节 — 测试行为和结果
- 禁止过度 mock — 过多的 mock 测试的是 mock，而非代码
- 禁止接受不稳定的测试 — 使用确定性数据并 mock 时间
- 禁止将慢速测试放在单元测试套件中 — 标记它们并单独运行
