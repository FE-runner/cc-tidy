#!/usr/bin/env bash
set -euo pipefail

# claude-tidy 发布脚本
# 用法:
#   ./scripts/release.sh patch    # 0.1.0 -> 0.1.1
#   ./scripts/release.sh minor    # 0.1.0 -> 0.2.0
#   ./scripts/release.sh major    # 0.1.0 -> 1.0.0
#   ./scripts/release.sh          # 默认 patch

BUMP_TYPE="${1:-patch}"
REMOTE="origin"
BRANCH="main"

if [[ "$BUMP_TYPE" != "patch" && "$BUMP_TYPE" != "minor" && "$BUMP_TYPE" != "major" ]]; then
  echo "错误: 无效的升级类型 '$BUMP_TYPE'"
  echo "用法: $0 [patch|minor|major]"
  exit 1
fi

# 读取当前版本
CURRENT=$(node -p "require('./package.json').version")
echo "当前版本: $CURRENT"
echo "升级类型: $BUMP_TYPE"
echo ""

# 检查工作区是否干净
if [ -n "$(git status --porcelain)" ]; then
  echo "错误: 工作区有未提交的更改:"
  git status --short
  echo ""
  echo "请先提交或暂存所有更改后再发布。"
  exit 1
fi

# 升版本号
npm version "$BUMP_TYPE" -m "v%s"

# 读取新版本
NEW_VER=$(node -p "require('./package.json').version")

# 推送代码和 tag
echo ""
echo "推送到 $REMOTE/$BRANCH ..."
git push "$REMOTE" "$BRANCH"
git push "$REMOTE" "v${NEW_VER}"

echo ""
echo "✓ v${NEW_VER} 已推送，GitHub Actions 将自动发布到 npm。"
echo "查看进度: https://github.com/FE-runner/claude-tidy/actions"
