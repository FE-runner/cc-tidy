## 任务

### 1. 创建 .npmignore

- [x] 创建 `.npmignore`，排除 `src/`、`openspec/`、`.claude/`、`.github/`、`scripts/`、`tsconfig.json`、`.prettierrc`、`*.md`（保留 `README.md`）

### 2. 更新 package.json

- [x] 添加 `"files": ["dist"]`
- [x] 添加 `"release": "./scripts/release.sh"` 到 scripts

### 3. 创建 CI workflow

- [x] 创建 `.github/workflows/ci.yml`
- [x] 触发：push（所有分支）+ pull_request（到 main），paths-ignore `**/*.md`
- [x] 矩阵：ubuntu-latest + windows-latest
- [x] 步骤：checkout → setup-node → npm ci → tsc --noEmit → npm test

### 4. 创建 publish workflow

- [x] 创建 `.github/workflows/publish.yml`
- [x] 触发：push tags `v*`
- [x] 权限：`contents: write` + `id-token: write`
- [x] checkout 使用 `fetch-depth: 0`
- [x] 步骤：npm ci → typecheck → test → build → npm publish --provenance（id: publish）→ gh release create --generate-notes（if: publish success）
- [x] NPM_TOKEN 通过 secrets 注入

### 5. 创建 release.yml

- [x] 创建 `.github/release.yml`
- [x] 分组：新功能、Bug 修复、文档、其他变更

### 6. 创建本地 release 脚本

- [x] 创建 `scripts/release.sh`（bash）
- [x] 参数接收 patch/minor/major（默认 patch）
- [x] 参数验证
- [x] 读取并显示当前版本
- [x] 检查工作区是否干净（git status --porcelain）
- [x] npm version \<type\> -m "v%s"
- [x] git push origin main + git push origin tag
- [x] 输出发布提示

### 7. GitHub 仓库配置（手动）

- [ ] Settings → Secrets → Actions 添加 `NPM_TOKEN`
- [ ] Settings → Actions → General 确认 read and write 权限
