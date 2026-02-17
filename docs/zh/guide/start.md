# 快速开始 <Badge type="tip" text="Guide" />

> [!TIP]
> 本指南将帮助你快速了解如何使用 DevCrafter Blog。

## 📖 博客结构

DevCrafter Blog 采用模块化组织，主要内容分布如下：

```
docs/
├── zh/                          # 中文文档
│   ├── preface/                 # 序言与介绍
│   │   ├── preface.md          # 序言
│   │   ├── start.md            # 快速开始
│   │   ├── directory.md        # 目录
│   │   └── about.md            # 关于作者
│   ├── Git/                     # Git 教程
│   │   └── gitSetting.md       # Git 配置指南
│   ├── Echarts/                 # ECharts 教程
│   │   └── index.md            # ECharts 配置指南
│   ├── Navigation/              # 程序员导航
│   │   ├── index.md            # 导航首页
│   │   └── data.ts             # 导航数据
│   └── log/                     # 更新日志
│       └── changelog.md        # 变更记录
└── en/                          # 英文文档
    └── ...
```

## 🚀 如何使用

### 1. 浏览导航

点击顶部导航栏的 **"导航"** 链接，进入程序员工具导航页面：

- 🔧 **开发工具** - IDE、编辑器、版本控制等
- 🎨 **UI 设计** - 原型设计、协作工具
- 🤖 **AI 工具** - ChatGPT、DeepSeek 等 AI 服务
- 📚 **学习资源** - 教程、文档、社区

### 2. 查阅文档

通过左侧侧边栏选择感兴趣的主题：

| 分类 | 内容 | 适用场景 |
|------|------|----------|
| **Git** | 配置指南、常用命令 | 版本控制学习 |
| **ECharts** | 配置项详解、示例 | 数据可视化开发 |
| **Navigation** | 工具导航、资源整理 | 查找开发工具 |

### 3. 切换语言

点击右上角的 **语言切换按钮** 可在中文和英文之间切换。

## 🛠️ 本地开发

如果你想在本地运行或贡献代码：

::: code-group

```bash [安装依赖]
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

```bash [启动开发服务器]
# 使用 npm
npm run docs:dev

# 或使用 yarn
yarn docs:dev
```

```bash [构建生产版本]
# 使用 npm
npm run docs:build

# 或使用 yarn
yarn docs:build
```

:::

> [!NOTE]
> 开发服务器默认运行在 `http://localhost:5173`

## 📋 常用命令

| 命令 | 说明 |
|------|------|
| `docs:dev` | 启动开发服务器 |
| `docs:build` | 构建生产版本 |
| `docs:preview` | 预览生产构建 |

## 🎯 推荐阅读

> [!IMPORTANT]
> 如果你是第一次访问，建议按以下顺序阅读：

1. [序言](./preface.md) - 了解博客定位和目的
2. [目录](./directory.md) - 查看完整内容结构
3. [Git 配置](../Git/gitSetting.md) - 开发必备工具
4. [程序员导航](../Navigation/index.md) - 发现实用工具

## 💬 反馈与建议

如有问题或建议，欢迎通过以下方式联系：

- 在 GitHub 提交 [Issue](https://github.com)
- 发送邮件至联系邮箱


**祝你阅读愉快！** 🎉
