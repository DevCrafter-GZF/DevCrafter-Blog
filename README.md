# DevCrafter Blog

> 热爱生活，热爱世界 | Love life and love the world

基于 VitePress 构建的现代化技术博客，涵盖前端开发、后端技术、WebGIS 地图开发等完整知识体系。

## 在线预览

[https://github.com/DevCrafter-GZF/DevCrafter-Blog](https://github.com/DevCrafter-GZF/DevCrafter-Blog)

## 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - 基于 Vite 的静态站点生成器
- **主题**: 自定义主题 + Catppuccin 代码高亮
- **组件**: Vue 3 自定义组件（导航、播放器、烟花特效等）
- **插件**: 
  - vitepress-plugin-group-icons（代码组图标）
  - vitepress-markdown-timeline（时间线）
  - medium-zoom（图片缩放）

## 项目结构

```
.
├── docs/                          # 文档目录
│   ├── .vitepress/               # VitePress 配置
│   │   ├── theme/                # 自定义主题
│   │   │   ├── components/       # Vue 组件
│   │   │   ├── nav/              # 导航配置
│   │   │   ├── sidebar/          # 侧边栏配置
│   │   │   └── styles/           # 自定义样式
│   │   └── config.mts            # 主配置
│   ├── zh/                       # 中文文档
│   │   ├── guide/                # 指南（快速开始、学习路线等）
│   │   ├── fundamentals/         # 前端基础（JavaScript）
│   │   ├── frameworks/           # 前端框架（Vue、TypeScript）
│   │   ├── WebGIS/               # WebGIS 地图开发
│   │   ├── HTML/                 # HTML 基础
│   │   ├── CSS/                  # CSS 基础
│   │   ├── JavaScript/           # JavaScript 相关
│   │   ├── React/                # React 框架
│   │   ├── Node/                 # Node.js 后端
│   │   ├── MySQL/                # MySQL 数据库
│   │   ├── Python/               # Python 编程
│   │   ├── Echarts/              # ECharts 图表
│   │   ├── Git/                  # Git 版本控制
│   │   ├── Projects/             # 项目实战
│   │   ├── Navigation/           # 程序员导航
│   │   └── log/                  # 更新日志
│   ├── en/                       # 英文文档（同中文结构）
│   └── public/                   # 静态资源
├── package.json
└── README.md
```

## 文档内容

### 指南
- 快速开始 - 本地开发环境搭建
- 学习路线 - 完整的前端学习路径
- 关于作者 - 作者介绍和联系方式
- 更新日志 - 版本更新记录

### 前端基础
- HTML - 标签、表单、语义化、HTML5 新特性
- CSS - 选择器、Flex/Grid 布局、动画、响应式设计
- JavaScript - 从基础到高级，ES6+、异步编程、面向对象
- 正则表达式 - 模式匹配、表单验证
- DOM 操作 - 元素操作、事件、BOM、本地存储
- ECharts - 数据可视化图表

### WebGIS 开发
- 百度地图 - JavaScript API、控件、覆盖物、路线规划
- 高德地图 - JS API、定位、搜索、多种导航方式
- 天地图 - 国家地理信息公共服务平台
- ECharts 地图 - 中国地图、世界地图、热力图、迁徙图

### 前端框架
- Vue - Vue 2/3 合并文档，选项式 + 组合式 API
- React - JSX、Hooks、Redux、Router
- TypeScript - 类型系统、TSX、模块化

### 后端开发
- Node.js - fs/http 模块、Express、数据库连接
- MySQL - SQL 语句、CRUD 操作、Node.js 集成
- Python - 语法基础、数据结构、文件操作

### 项目实战
- 网易云音乐 - Vue 2 + Vant + Axios 移动端应用
- 后台管理系统 - Vue 3 + Element Plus + TypeScript

### 开发工具
- Git - 安装配置、常用命令、分支管理
- 程序员导航 - 分类整理的开发工具和资源

## 本地开发

```bash
# 克隆项目
git clone https://github.com/DevCrafter-GZF/DevCrafter-Blog.git

# 进入目录
cd DevCrafter-Blog

# 安装依赖
npm install
# 或
yarn install

# 启动开发服务器
npm run docs:dev

# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 特性

- 多语言支持 - 中英文双语版本
- 响应式设计 - 适配各种设备
- 代码高亮 - Catppuccin 主题，支持多种语言
- 图片缩放 - 点击放大查看
- 导航栏 - 程序员常用工具导航
- 进度条 - 页面切换进度提示
- 烟花特效 - 首页庆祝动画
- 深色模式 - 自动/手动切换

## 导航栏结构

```
🏠 首页
📖 指南（快速开始、学习路线、关于作者、更新日志）
📚 文档（前端基础、WebGIS、框架）
🍎 导航
VitePress x.x.x（外链）
📅 日志
```

## 代码块主题

使用 Catppuccin 主题：
- 亮色模式: `catppuccin-latte`
- 暗色模式: `catppuccin-mocha`

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT](LICENSE)

---

Made with by [DevCrafter](https://github.com/DevCrafter-GZF)
