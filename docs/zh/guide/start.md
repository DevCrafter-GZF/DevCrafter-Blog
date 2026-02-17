# 快速开始 <Badge type="tip" text="Guide" />

> [!TIP]
> 本指南将帮助你快速了解如何使用 DevCrafter Blog。

## 📖 博客结构

DevCrafter Blog 采用模块化组织，主要内容分布如下：

```
docs/
├── zh/                          # 中文文档
│   ├── guide/                   # 指南
│   │   ├── start.md            # 快速开始
│   │   ├── directory.md        # 学习路线
│   │   ├── about.md            # 关于作者
│   │   ├── updates.md          # 更新日志
│   │   └── preface.md          # 序言
│   ├── fundamentals/            # 前端
│   │   └── javascript.md       # JavaScript 完全指南
│   ├── frameworks/              # 前端框架
│   │   ├── vue.md              # Vue 完全指南
│   │   └── typescript.md       # TypeScript 完全指南
│   ├── WebGIS/                  # WebGIS 开发
│   │   ├── index.md            # 概述
│   │   ├── baidu.md            # 百度地图
│   │   ├── gaode.md            # 高德地图
│   │   ├── tianditu.md         # 天地图
│   │   └── echarts-map.md      # ECharts 地图
│   ├── HTML/                    # HTML 基础
│   ├── CSS/                     # CSS 基础
│   ├── JavaScript/              # JavaScript 相关
│   ├── React/                   # React 框架
│   ├── Node/                    # Node.js 后端
│   ├── MySQL/                   # MySQL 数据库
│   ├── Python/                  # Python 编程
│   ├── Echarts/                 # ECharts 图表
│   ├── Git/                     # Git 版本控制
│   ├── Projects/                # 项目实战
│   ├── Navigation/              # 程序员导航
│   └── log/                     # 更新日志
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
| **前端** | HTML、CSS、JavaScript、正则表达式、DOM 操作、ECharts | 前端基础学习 |
| **WebGIS** | 百度地图、高德地图、天地图、ECharts 地图 | 地图开发 |
| **框架** | Vue、React、TypeScript | 现代前端框架学习 |
| **后端** | Node.js、MySQL、Python | 全栈开发 |
| **工具** | Git 版本控制 | 开发效率工具 |
| **项目** | 实战项目案例 | 项目经验积累 |
| **导航** | 程序员工具导航 | 发现实用工具 |

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

1. [序言](../guide/preface.md) - 了解博客定位和目的
2. [学习路线](../guide/directory.md) - 查看完整内容结构
3. [Git 配置](../Git/gitSetting.md) - 开发必备工具
4. [程序员导航](../Navigation/index.md) - 发现实用工具

## 💬 反馈与建议

如有问题或建议，欢迎通过以下方式联系：

- 在 GitHub 提交 [Issue](https://github.com)
- 发送邮件至联系邮箱


**祝你阅读愉快！** 🎉
