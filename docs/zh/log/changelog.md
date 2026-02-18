# 📅 更新日志

## 2026-02-18

### ✨ 新增功能

- **音乐播放器组件**: 全新悬浮式音乐播放器，支持网易云音乐热歌榜
  - 悬浮球设计，点击展开/收起交互
  - 支持歌曲搜索功能（内置热门歌曲+API搜索）
  - 自动播放下一首，过滤无版权歌曲
  - 支持播放模式切换（列表循环、单曲循环、随机播放）
  - 本地存储播放历史和设置
  - 移动端适配优化

### 🔄 更新优化

- **主题配置优化**:
  - 更新代码块主题为 catppuccin-frappe
  - 优化 escook-override.css 样式覆盖
  - 隐藏侧边栏滚动条，提升视觉体验

- **交互体验优化**:
  - 播放器面板智能位置判断（左下角/右下角）
  - 搜索防抖优化，提升响应速度
  - 键盘快捷键支持
  - 错误提示和加载状态优化

### 🐛 问题修复

- 修复音乐播放器搜索空格和点击播放问题
- 修复音频元素正确绑定，确保播放功能稳定
- 修复播放失败处理逻辑，自动跳过无版权歌曲
- 修复移动端播放器触摸交互问题
- 修复播放器定位和溢出问题

## 2025-02-17

### ✨ 新增功能

- **项目架构重组**: 全面重构文档结构，提升阅读体验
  - 合并 Vue 2/3 文档为统一完整指南
  - 合并 JavaScript 基础+高级为完全指南
  - 合并 TypeScript + TSX 为统一文档
  - 创建独立的 WebGIS 分类（百度地图、高德地图、天地图、ECharts地图）

- **英文文档完整同步**: 新增 6 个完整英文技术文档
  - Python 基础 (624行)
  - MySQL 基础操作 (404行)
  - Web API - DOM 操作 (484行)
  - Node.js 后端开发 (573行)
  - React 框架 (695行)
  - 项目实战案例 (587行)

- **Giscus 评论系统**: 集成评论功能，支持深色/浅色主题自适应

### 🔄 更新优化

- **导航结构优化**:
  - 导航栏精简为 6 个按钮（首页、指南、文档、导航、VitePress、日志）
  - 统一导航命名（前端基础 → 前端）
  - 侧边栏结构与导航保持一致

- **GitHub Pages 部署**:
  - 配置自动部署工作流
  - 修复路径问题，支持 base 路径配置
  - 首页图片路径修复

- **代码主题优化**: 更新代码块主题为 catppuccin-frappe

### 🐛 问题修复

- 修复快速开始文档中的错误链接
- 修复目录结构描述（preface → guide）
- 统一中英文导航命名规范
- 修复所有空文档问题
- 修复 WebGIS 文档链接，适配 cleanUrls 模式
- 修复文档中的相对路径链接

## 2025-02-13

### ✨ 新增功能

- **AI工具分类**: 新增完整的AI工具导航模块，包含6个子分类
  - AI对话助手: ChatGPT、Claude、Gemini、DeepSeek、Kimi、文心一言、通义千问、豆包、智谱清言、Perplexity
  - AI写作与润色: Grammarly、QuillBot、DeepL Write、Notion AI、秘塔写作猫
  - AI编程助手: GitHub Copilot、Cursor、Trae、Windsurf、Codeium、Tabnine、CodeGeeX、通义灵码
  - AI图像生成: Midjourney、DALL·E 3、Stable Diffusion、Leonardo.ai、文心一格、通义万相、即梦
  - AI视频生成: Sora、Runway、Pika、HeyGen、可灵、即梦视频
  - AI办公效率: Notion、Gamma、Tome、讯飞听见、通义听悟

### 🔄 更新优化

- **前端框架生态扩展**:
  - Vue生态新增: Vue 2、VueUse、Vant、Cube UI、NutUI
  - React生态新增: React Router、UmiJS、Ant Design Mobile、Valtio、Jotai、MobX、ahooks

- **导航数据结构优化**: 所有工具卡片均配有图标，提升视觉体验

### 🐛 问题修复

- 修复animejs v4导入错误，更新为命名导出
- 修复VitePress Markdown frontmatter解析问题
- 修复NAV_DATA导入问题