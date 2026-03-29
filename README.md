# cc-tidy

A management tool for Claude Code skills and rules. List, diff, move, delete — all in one command.

Claude Code 的 skills 和 rules 管理工具。查看、比对、移动、删除，一个命令搞定。

## Usage / 使用

```bash
npx cc-tidy
```

Interactive CLI — just follow the prompts:

纯交互式，运行后按提示操作：

1. Choose target / 选择管理对象：skills / rules
2. Choose action / 选择操作：list / diff / move / delete
3. Follow the interactive guide (press `a` to select all) / 跟随交互引导完成（多选列表按 `a` 全选）

```bash
cc-tidy --help       # Help / 帮助信息
cc-tidy --version    # Version / 版本号
```

## Features / 功能

| Action | Description | 说明 |
|--------|-------------|------|
| **list** | View rules/skills by scope (global/project/all) | 查看 rules/skills，支持全局/项目/全部，全部时分开展示 |
| **diff** | Compare global vs project duplicates, pick which to keep | 对比全局和项目的同名 rules/skills，标注最新版本，选择保留哪个 |
| **move** | Move between global and project, preserving symlinks | 在全局和项目之间移动 rules/skills，symlink 保持链接方式 |
| **delete** | Delete rules or skills with confirmation | 删除 rules 或 skills，确认后删除（skills 整目录删除） |

## Highlights / 特性

- Symlink-aware: list marks `[link]`, move preserves symlinks / 支持 symlink（软链接）skills，list 标注 `[链接]`，move 保持链接
- Smart time comparison using the later of birthtime and mtime / 时间比较取创建时间和修改时间中较晚的，解决复制文件时间不准的问题
- Timestamps down to the second / 日期精确到秒

## License / 许可证

MIT
