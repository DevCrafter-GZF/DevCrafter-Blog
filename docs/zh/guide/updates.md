# 更新日志 <Badge type="tip" text="v0.3.0" />

> [!NOTE]
> 记录 DevCrafter Blog 的更新历史和新功能发布。

## 📅 2026 年

### 2 月

#### 2月 18 日

**新增功能：**

- ✨ **音乐播放器组件** - 全新悬浮式音乐播放器，支持网易云音乐热歌榜
  - 悬浮球设计，点击展开/收起交互
  - 支持歌曲搜索功能（内置热门歌曲+API搜索）
  - 自动播放下一首，过滤无版权歌曲
  - 支持播放模式切换（列表循环、单曲循环、随机播放）
  - 本地存储播放历史和设置
  - 移动端适配优化

**优化改进：**

- 🎨 **主题配置优化**
  - 更新代码块主题为 catppuccin-frappe
  - 优化 escook-override.css 样式覆盖
  - 隐藏侧边栏滚动条，提升视觉体验
- 🎯 **交互体验优化**
  - 播放器面板智能位置判断（左下角/右下角）
  - 搜索防抖优化，提升响应速度
  - 键盘快捷键支持
  - 错误提示和加载状态优化

**问题修复：**

- 🔧 修复音乐播放器搜索空格和点击播放问题
- 🔧 修复音频元素正确绑定，确保播放功能稳定
- 🔧 修复播放失败处理逻辑，自动跳过无版权歌曲
- 🔧 修复移动端播放器触摸交互问题
- 🔧 修复播放器定位和溢出问题
- 🔧 修复bsz组件显示问题，添加不蒜子统计脚本
- 🔧 修复Giscus评论系统配置，更新category和theme设置

**其他改进：**

- 📝 翻译Markdown语法教程为英文文档
- 🎨 添加页面滚动条隐藏功能，保持滚动功能
- 📁 完善.gitignore文件，添加前端项目常见忽略项
- 🔧 修复组件插槽冲突问题，优化布局结构

## 📅 2025 年

### 2 月

#### 2月 17 日

**新增功能：**

- ✨ **项目架构重组** - 全面重构文档结构，提升阅读体验
  - 合并 Vue 2/3 文档为统一完整指南
  - 合并 JavaScript 基础+高级为完全指南
  - 合并 TypeScript + TSX 为统一文档
  - 创建独立的 WebGIS 分类（百度地图、高德地图、天地图、ECharts地图）
- 🌍 **英文文档完整同步** - 新增 6 个完整英文技术文档
  - Python 基础 (624行)
  - MySQL 基础操作 (404行)
  - Web API - DOM 操作 (484行)
  - Node.js 后端开发 (573行)
  - React 框架 (695行)
  - 项目实战案例 (587行)
- 💬 **Giscus 评论系统** - 集成评论功能，支持深色/浅色主题自适应

**优化改进：**

- 🎨 **导航结构优化**
  - 导航栏精简为 6 个按钮（首页、指南、文档、导航、VitePress、日志）
  - 统一导航命名（前端基础 → 前端）
  - 侧边栏结构与导航保持一致
- 🚀 **GitHub Pages 部署**
  - 配置自动部署工作流
  - 修复路径问题，支持 base 路径配置
  - 首页图片路径修复
- 🎨 **代码主题优化** - 更新代码块主题为 catppuccin-frappe

**问题修复：**

- 🔧 修复快速开始文档中的错误链接
- 🔧 修复目录结构描述（preface → guide）
- 🔧 统一中英文导航命名规范
- 🔧 修复所有空文档问题
- 🔧 修复 WebGIS 文档链接，适配 cleanUrls 模式
- 🔧 修复文档中的相对路径链接

#### 2月 13 日

**新增功能：**

- 🤖 **AI工具分类** - 新增完整的AI工具导航模块，包含6个子分类
  - AI对话助手: ChatGPT、Claude、Gemini、DeepSeek、Kimi、文心一言、通义千问、豆包、智谱清言、Perplexity
  - AI写作与润色: Grammarly、QuillBot、DeepL Write、Notion AI、秘塔写作猫
  - AI编程助手: GitHub Copilot、Cursor、Trae、Windsurf、Codeium、Tabnine、CodeGeeX、通义灵码
  - AI图像生成: Midjourney、DALL·E 3、Stable Diffusion、Leonardo.ai、文心一格、通义万相、即梦
  - AI视频生成: Sora、Runway、Pika、HeyGen、可灵、即梦视频
  - AI办公效率: Notion、Gamma、Tome、讯飞听见、通义听悟

**优化改进：**

- 📚 **前端框架生态扩展**
  - Vue生态新增: Vue 2、VueUse、Vant、Cube UI、NutUI
  - React生态新增: React Router、UmiJS、Ant Design Mobile、Valtio、Jotai、MobX、ahooks
- 🎨 **导航数据结构优化** - 所有工具卡片均配有图标，提升视觉体验

**问题修复：**

- 🔧 修复animejs v4导入错误，更新为命名导出
- 🔧 修复VitePress Markdown frontmatter解析问题
- 🔧 修复NAV_DATA导入问题

---

## 📅 2024 年

### 2 月

#### 2月 13 日

**新增内容：**

- ✨ **ECharts 配置指南** - 新增完整的中文版 ECharts 文档
    - title、legend、tooltip、toolbox 组件
    - grid、xAxis、yAxis 配置
    - series 数据系列（折线图、柱状图、饼图、散点图）
    - visualMap、dataZoom 组件
    - 完整示例和速查表
- 🌍 **ECharts 英文版** - 同步发布英文翻译
- 📚 **序言页面** - 完善博客介绍和使用指南
- 📖 **快速开始** - 新增详细的使用教程
- 📋 **目录页面** - 完整的内容索引
- 👤 **关于作者** - 作者介绍页面

**优化改进：**

- 🎨 优化侧边栏树形结构，支持三级嵌套
- 🔧 完善中英文侧边栏配置
- 📐 表格样式优化，支持全宽显示

### 1 月

#### 1月 下旬

**新增内容：**

- 🧭 **程序员导航** - 上线完整的工具导航
    - IDE & 编辑器（VS Code、JetBrains 系列等）
    - 编程语言（JavaScript、TypeScript、Python、Go、Rust 等）
    - 前端框架（Vue、React、Angular、Svelte 等）
    - CSS 框架（Tailwind CSS、Bootstrap 等）
    - 构建工具（Vite、Webpack、Rollup 等）
    - UI 设计工具（Figma、Sketch、Axure、蓝湖、墨刀等）
    - 开发工具（Postman、Docker、Git 客户端等）
    - 小程序开发（微信开发者工具、Taro、uni-app 等）
    - AI 工具（ChatGPT、Claude、DeepSeek、文心一言等）
    - 学习资源（MDN、Stack Overflow、GitHub 等）
- 🌍 **双语支持** - 中英文版本同步上线
- 🎨 **UI 美化** - 使用 VitePress 自定义主题

**功能特性：**

- 🔍 文档搜索功能
- 🌓 深色/浅色主题切换
- 📱 响应式设计，支持移动端
- ⚡ 基于 Vite 的快速构建

## 🚀 项目里程碑

| 版本     | 日期      | 主要更新            |
|--------|---------|-----------------|
| v0.1.0 | 2024.02 | ECharts 文档、页面完善 |
| v0.0.2 | 2024.01 | 程序员导航上线         |
| v0.0.1 | 2024.01 | 项目初始化，基础架构搭建    |

## 📋 计划中的功能

> [!TIP]
> 以下功能正在规划或开发中

- [ ] 更多技术文档（Vue、React、TypeScript 等）
- [ ] 代码示例在线预览
- [ ] 评论系统接入
- [ ] 文章分享功能
- [ ] RSS 订阅支持

## 💬 反馈与建议

如果你有任何建议或发现需要改进的地方，欢迎：

- 在 GitHub 提交 Issue
- 通过邮件联系

**感谢你的关注与支持！** 🙏
