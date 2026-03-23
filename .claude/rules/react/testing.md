---
description: React 使用 Vitest 和 Testing Library 的测试模式
globs: **/src/**/*.test.tsx, **/src/**/*.test.ts, **/src/**/*.spec.tsx, **/src/**/*.spec.ts
---

# 测试

## 技术栈

- **Vitest** 作为测试运行器（非 Jest）
- **React Testing Library** 用于组件测试
- **MSW（Mock Service Worker）** 用于网络层的 API mock
- **`userEvent`**（非 `fireEvent`）用于用户交互模拟

## 查询优先级

按此顺序使用查询 — 优先选择可访问的选择器：

| 优先级 | 查询 | 场景 |
|--------|------|------|
| 1 | `getByRole` | 按钮、链接、标题、表单元素 |
| 2 | `getByLabelText` | 带标签的表单输入 |
| 3 | `getByText` | 非交互式文本内容 |
| 4 | `getByTestId` | 最后手段 — 无可用的可访问选择器 |

## 模式

- 始终在渲染前调用 `userEvent.setup()` — 使用返回的 `user` 实例进行交互
- 对状态变化或数据获取后出现的元素使用 `screen.findByX`（异步）
- 使用 `screen.queryByX` 断言不存在（`expect(...).not.toBeInTheDocument()`）
- 使用 MSW（`http.get`、`HttpResponse.json`）mock API 调用 — 不要对 API 模块使用 `vi.mock`

## Hook 测试

- 使用 `@testing-library/react` 的 `renderHook` + `act` 进行自定义 hook 测试
- 尽可能通过组件行为测试 — 仅对共享 hooks 使用 `renderHook`

## 反模式

- 禁止使用 `fireEvent` — 使用 `userEvent` 获得真实的浏览器行为
- 禁止 mock 组件 — 改为 mock 网络层（MSW）
- 禁止使用 `container.querySelector` — 使用 Testing Library 查询
- 禁止过度使用快照 — 它们在每次变更时都会破坏，审查者会跳过它们
- 禁止测试实现细节（内部状态、私有方法、hook 内部）
