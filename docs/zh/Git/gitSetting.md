# Git 配置指南 <Badge type="tip" text="v2.0" />

> [!NOTE]
> 本指南涵盖 Git 从安装到高级使用的完整配置流程，适合初学者和进阶用户。

## 🚀 快速开始

在开始使用 Git 之前，你需要先配置用户身份信息。这是 Git 识别提交者的必要步骤。

### 配置用户身份

::: code-group

```bash [配置用户名]
git config --global user.name "username"
```

```bash [配置邮箱]
git config --global user.email "username@email.com"
```

```bash [配置密码]
git config --global user.password "password"
```

:::

> [!TIP]
> - `username` 建议使用英文名称，这将显示在你的提交记录中
> - `email` 请使用注册 GitHub/GitLab 时的邮箱，确保提交能正确关联到你的账户
> - 使用 `--global` 参数表示全局配置，对所有仓库生效

### 验证配置

```bash
# 查看所有配置
git config --list

# 仅查看全局配置
git config --list --global
```

## 📁 仓库操作

### 初始化与克隆

::: code-group

```bash [初始化仓库]
git init
```

```bash [克隆远程仓库]
git clone <远程仓库地址>
```

:::

### 文件状态管理

> [!IMPORTANT]
> Git 文件有三种状态：**已修改**（modified）、**已暂存**（staged）、**已提交**（committed）

| 命令 | 作用 | 常用场景 |
|------|------|----------|
| `git status` | 查看文件状态 | 随时检查 |
| `git status -s` | 简化状态显示 | 快速浏览 |
| `git add .` | 添加所有改动 | 批量提交 |
| `git add <文件名>` | 添加指定文件 | 选择性提交 |

### 提交更改

::: code-group

```bash [标准提交]
git add .
git commit -m "提交信息"
```

```bash [跳过暂存区]
# ⚠️ 仅适用于已跟踪的文件
git commit -a -m "提交信息"
```

:::

> [!TIP]
> 提交信息规范：
> - `feat:` 新功能
> - `fix:` 修复问题
> - `docs:` 文档更新
> - `style:` 代码格式调整
> - `refactor:` 重构代码

### 撤销操作

::: warning 谨慎操作
以下命令会修改历史，请确保你知道自己在做什么。
:::

::: code-group

```bash [撤销文件修改]
# 将文件恢复到上次提交状态
git checkout -- <文件名>
```

```bash [取消暂存]
# 将文件从暂存区移出
git reset HEAD <文件名>
```

```bash [删除文件]
# 同时删除工作区和暂存区
git rm -f <文件名>

# 仅删除暂存区，保留工作区
git rm --cached <文件名>
```

:::

## 🌿 分支管理

> [!NOTE]
> 分支是 Git 的核心特性，允许你并行开发不同功能。

### 分支基础操作

::: code-group

```bash [查看分支]
# 查看本地分支
git branch

# 查看所有分支（含远程）
git branch -a
```

```bash [创建与切换]
# 创建分支
git branch <分支名>

# 切换分支
git checkout <分支名>

# 创建并切换（推荐）
git checkout -b <分支名>
```

```bash [合并与删除]
# 合并分支到当前分支
git merge <分支名>

# 删除已合并分支
git branch -d <分支名>

# 强制删除分支
git branch -D <分支名>
```

:::

## 📜 版本历史

### 查看日志

::: code-group

```bash [基础日志]
# 查看最近2次提交
git log -2

# 单行显示
git log --pretty=oneline

# 图形化显示
git log --graph --oneline
```

```bash [版本回退]
# 软回退（保留改动）
git reset --soft <commitId>

# 混合回退（保留工作区）
git reset --mixed <commitId>

# 硬回退（完全丢弃）⚠️
git reset --hard <commitId>
```

:::

> [!WARNING]
> `git reset --hard` 会永久删除未提交的改动，请谨慎使用！

## 🌐 远程仓库

### 连接远程仓库

::: code-group

```bash [添加远程仓库]
git remote add origin <仓库URL>

# 查看远程连接
git remote -v

# 删除远程连接
git remote remove origin
```

```bash [推送与拉取]
# 首次推送（建立关联）
git push -u origin main

# 后续推送
git push

# 拉取更新
git pull
```

:::

### SSH 密钥配置

> [!TIP]
> 使用 SSH 可以避免每次推送都输入密码，推荐配置。

::: code-group

```bash [生成密钥]
ssh-keygen -t rsa -C "your@email.com"
```

```bash [测试连接]
# GitHub
ssh -T git@github.com

# Gitee
ssh -T git@gitee.com
```

:::

## ⚙️ 高级配置

### .gitignore 配置

> [!NOTE]
> `.gitignore` 文件用于指定 Git 忽略的文件模式。

::: details 点击查看常用 .gitignore 模板

```gitignore
# 依赖目录
node_modules/
vendor/

# 构建输出
dist/
build/
*.exe

# IDE 配置
.idea/
.vscode/
*.swp

# 日志文件
*.log
logs/

# 环境变量
.env
.env.local

# 操作系统文件
.DS_Store
Thumbs.db
```

:::

### Git 配置项

::: code-group

```bash [忽略大小写]
# 检查当前设置
git config core.ignorecase

# 设置忽略大小写
git config core.ignorecase false
```

```bash [行尾符配置]
# Windows
git config core.autocrlf true

# Mac/Linux
git config core.autocrlf input
```

:::

## 📚 速查表

| 操作 | 命令 |
|------|------|
| 初始化仓库 | `git init` |
| 克隆仓库 | `git clone <url>` |
| 查看状态 | `git status` |
| 添加文件 | `git add <file>` |
| 提交更改 | `git commit -m "msg"` |
| 推送代码 | `git push` |
| 拉取代码 | `git pull` |
| 创建分支 | `git branch <name>` |
| 切换分支 | `git checkout <name>` |
| 合并分支 | `git merge <name>` |
| 查看日志 | `git log --oneline` |
| 回退版本 | `git reset --hard <id>` |


> [!TIP]
> 💡 更多 Git 学习资源：
> - [Pro Git 中文版](https://git-scm.com/book/zh/v2)
> - [GitHub Learning Lab](https://lab.github.com/)
> - [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)
