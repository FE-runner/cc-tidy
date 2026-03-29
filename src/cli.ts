#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import { listFlow } from './flows/list.js';
import { diffFlow } from './flows/diff.js';
import { moveFlow } from './flows/move.js';
import { deleteFlow } from './flows/delete.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** 从 package.json 读取版本号 */
function getVersion(): string {
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  return pkg.version as string;
}

const HELP_TEXT = `
cc-tidy — Claude Code skills & rules management tool
       Claude Code 的 skills 和 rules 管理工具

Usage / 用法:
  cc-tidy              Interactive management / 进入交互式管理流程
  cc-tidy --help       Show help / 显示帮助信息
  cc-tidy --version    Show version / 显示版本号
`;

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(HELP_TEXT.trim());
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(getVersion());
    return;
  }

  if (args.length > 0) {
    console.log(HELP_TEXT.trim());
    return;
  }

  console.log(`
  ${chalk.bold.cyan('cc-tidy')}  ${chalk.dim('v' + getVersion())}
  ${chalk.dim('Claude Code skills & rules management tool / 管理工具')}
  `);

  const target = await select({
    message: 'What to manage? / 管理什么？',
    choices: [
      { value: 'skills', name: 'skills' },
      { value: 'rules', name: 'rules' },
    ],
  });

  const action = await select({
    message: 'What to do? / 要做什么？',
    choices: [
      { value: 'list', name: 'list    — View / 查看' },
      { value: 'diff', name: 'diff    — Compare / 比对差异' },
      { value: 'move', name: 'move    — Move / 移动' },
      { value: 'delete', name: 'delete  — Delete / 删除' },
    ],
  });

  switch (action) {
    case 'list':
      await listFlow(target);
      break;
    case 'diff':
      await diffFlow(target);
      break;
    case 'move':
      await moveFlow(target);
      break;
    case 'delete':
      await deleteFlow(target);
      break;
  }

  console.log(chalk.green('\n  Done / 完成\n'));
}

main().catch((error: unknown) => {
  console.error('Error / 执行出错:', error instanceof Error ? error.message : error);
  process.exit(1);
});
