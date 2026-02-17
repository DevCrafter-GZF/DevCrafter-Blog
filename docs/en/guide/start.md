# Quick Start <Badge type="tip" text="Guide" />

> [!TIP]
> This guide will help you quickly understand how to use DevCrafter Blog.

## 📖 Blog Structure

DevCrafter Blog is organized in a modular way, with main content distributed as follows:

```
docs/
├── en/                          # English Documentation
│   ├── guide/                   # Guide
│   │   ├── start.md            # Quick Start
│   │   ├── directory.md        # Learning Path
│   │   ├── about.md            # About Author
│   │   ├── updates.md          # Updates
│   │   └── preface.md          # Preface
│   ├── fundamentals/            # Frontend Basics
│   │   └── javascript.md       # JavaScript Guide
│   ├── frameworks/              # Frontend Frameworks
│   │   ├── vue.md              # Vue Guide
│   │   └── typescript.md       # TypeScript Guide
│   ├── WebGIS/                  # WebGIS Development
│   │   ├── index.md            # Overview
│   │   ├── baidu.md            # Baidu Map
│   │   ├── gaode.md            # AMap
│   │   ├── tianditu.md         # Tianditu
│   │   └── echarts-map.md      # ECharts Map
│   ├── HTML/                    # HTML Basics
│   ├── CSS/                     # CSS Basics
│   ├── JavaScript/              # JavaScript Related
│   ├── React/                   # React Framework
│   ├── Node/                    # Node.js Backend
│   ├── MySQL/                   # MySQL Database
│   ├── Python/                  # Python Programming
│   ├── Echarts/                 # ECharts Charts
│   ├── Git/                     # Git Version Control
│   ├── Projects/                # Project Cases
│   ├── Navigation/              # Developer Navigation
│   └── log/                     # Changelog
└── zh/                          # Chinese Documentation
    └── ...
```

## 🚀 How to Use

### 1. Browse Navigation

Click the **"Navigation"** link in the top navigation bar to enter the developer tools navigation page:

- 🔧 **Development Tools** - IDE, editors, version control, etc.
- 🎨 **UI Design** - Prototyping, collaboration tools
- 🤖 **AI Tools** - ChatGPT, DeepSeek, and other AI services
- 📚 **Learning Resources** - Tutorials, documentation, communities

### 2. Read Documentation

Select topics of interest through the left sidebar:

| Category | Content | Use Case |
|----------|---------|----------|
| **Git** | Configuration guide, common commands | Version control learning |
| **ECharts** | Configuration details, examples | Data visualization development |
| **Navigation** | Tool navigation, resource organization | Finding development tools |

### 3. Switch Language

Click the **language switch button** in the upper right corner to switch between Chinese and English.

## 🛠️ Local Development

If you want to run locally or contribute code:

::: code-group

```bash [Install Dependencies]
# Using npm
npm install

# Or using yarn
yarn install
```

```bash [Start Dev Server]
# Using npm
npm run docs:dev

# Or using yarn
yarn docs:dev
```

```bash [Build Production]
# Using npm
npm run docs:build

# Or using yarn
yarn docs:build
```

:::

> [!NOTE]
> Dev server runs at `http://localhost:5173` by default

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `docs:dev` | Start development server |
| `docs:build` | Build production version |
| `docs:preview` | Preview production build |

## 🎯 Recommended Reading

> [!IMPORTANT]
> If this is your first visit, it is recommended to read in the following order:

1. [Preface](../guide/preface.md) - Understand blog positioning and purpose
2. [Learning Path](../guide/directory.md) - View complete content structure
3. [Git Configuration](../Git/gitSetting.md) - Essential development tool
4. [Developer Navigation](../Navigation/index.md) - Discover useful tools

## 💬 Feedback & Suggestions

If you have questions or suggestions, welcome to contact us through:

- Submit [Issue](https://github.com) on GitHub
- Send email to contact address


**Enjoy your reading!** 🎉
