---
description: Prettier 代码格式化规范
alwaysApply: true
---

# 代码格式化

## Prettier

项目使用 Prettier 进行代码格式化，配置文件为 `.prettierrc`。

生成代码时必须遵循以下格式规范：

- 使用单引号（`'`），非双引号
- 语句末尾加分号
- 缩进 2 空格
- 行宽不超过 100 字符
- 尾逗号（trailing comma）始终添加
- 箭头函数参数始终加括号：`(x) => x`，非 `x => x`
- 对象花括号内加空格：`{ key: value }`，非 `{key: value}`
