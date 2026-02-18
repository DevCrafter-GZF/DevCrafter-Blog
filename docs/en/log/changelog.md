# 📅 Changelog

## 2026-02-18

### ✨ New Features

- **Music Player Component**: Brand new floating music player supporting NetEase Cloud Music hot songs
  - Floating ball design with click to expand/collapse interaction
  - Song search functionality (built-in popular songs + API search)
  - Auto play next track, filtering songs without copyright
  - Playback mode switching (list loop, single loop, shuffle)
  - Local storage for playback history and settings
  - Mobile device adaptation optimization

### 🔄 Updates & Improvements

- **Theme Configuration Optimization**:
  - Updated code block theme to catppuccin-frappe
  - Optimized escook-override.css style overrides
  - Hidden sidebar scrollbar for better visual experience

- **Interactive Experience Optimization**:
  - Intelligent player panel position judgment (bottom-left/bottom-right)
  - Search debouncing optimization for improved response speed
  - Keyboard shortcut support
  - Error prompts and loading state optimization

### 🐛 Bug Fixes

- Fixed music player search space and click playback issues
- Fixed audio element proper binding to ensure stable playback functionality
- Fixed playback failure handling logic, automatically skipping songs without copyright
- Fixed mobile device player touch interaction issues
- Fixed player positioning and overflow issues

## 2025-02-17

### ✨ New Features

- **Project Architecture Restructure**: Complete documentation structure reorganization for better reading experience
  - Merged Vue 2/3 documents into unified complete guide
  - Merged JavaScript basic+advanced into complete guide
  - Merged TypeScript + TSX into unified document
  - Created independent WebGIS category (Baidu Map, AMap, Tianditu, ECharts Map)

- **Complete English Documentation Sync**: Added 6 complete English technical documents
  - Python Basics (624 lines)
  - MySQL Basic Operations (404 lines)
  - Web API - DOM Manipulation (484 lines)
  - Node.js Backend Development (573 lines)
  - React Framework (695 lines)
  - Project Practice Cases (587 lines)

- **Giscus Comment System**: Integrated comment functionality with dark/light theme adaptation

### 🔄 Updates & Improvements

- **Navigation Structure Optimization**:
  - Navigation bar streamlined to 6 buttons (Home, Guide, Docs, Navigation, VitePress, Changelog)
  - Unified navigation naming (Frontend Basics → Frontend)
  - Sidebar structure aligned with navigation

- **GitHub Pages Deployment**:
  - Configured automatic deployment workflow
  - Fixed path issues, supporting base path configuration
  - Fixed homepage image paths

- **Code Theme Optimization**: Updated code block theme to catppuccin-frappe

### 🐛 Bug Fixes

- Fixed incorrect links in quick start documentation
- Fixed directory structure description (preface → guide)
- Unified Chinese and English navigation naming conventions
- Fixed all empty document issues
- Fixed WebGIS document links, adapted to cleanUrls mode
- Fixed relative path links in documents

## 2025-02-13

### ✨ New Features

- **AI Tools Category**: Added comprehensive AI tools navigation module with 6 subcategories
  - AI Chatbots: ChatGPT, Claude, Gemini, DeepSeek, Kimi, ERNIE Bot, Tongyi Qianwen, Doubao, ChatGLM, Perplexity
  - AI Writing & Editing: Grammarly, QuillBot, DeepL Write, Notion AI, Xiezuocat
  - AI Coding Assistants: GitHub Copilot, Cursor, Trae, Windsurf, Codeium, Tabnine, CodeGeeX, Tongyi Lingma
  - AI Image Generation: Midjourney, DALL·E 3, Stable Diffusion, Leonardo.ai, ERNIE Yige, Tongyi Wanxiang, Jimeng
  - AI Video Generation: Sora, Runway, Pika, HeyGen, Kling, Jimeng Video
  - AI Productivity: Notion, Gamma, Tome, iFlytek, Tongyi Tingwu

### 🔄 Updates & Improvements

- **Frontend Framework Ecosystem Expansion**:
  - Vue Ecosystem added: Vue 2, VueUse, Vant, Cube UI, NutUI
  - React Ecosystem added: React Router, UmiJS, Ant Design Mobile, Valtio, Jotai, MobX, ahooks

- **Navigation Data Structure Optimization**: All tool cards now have icons for better visual experience

### 🐛 Bug Fixes

- Fixed animejs v4 import error, updated to named exports
- Fixed VitePress Markdown frontmatter parsing issue
- Fixed NAV_DATA import issue