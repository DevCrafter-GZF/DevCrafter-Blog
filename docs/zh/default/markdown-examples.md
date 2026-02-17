# Markdown 语法教程

本页面展示了 VitePress 提供的内置 Markdown 扩展语法，帮助你更好地编写文档。

## 基础链接

支持各种外部链接：

[Bilibili](https://www.bilibili.com/) | [YouTube](https://www.youtube.com/) | [百度](https://www.baidu.com/) | [GitHub](https://www.github.com/) | [Google](https://www.google.com/)

---

## 代码高亮

VitePress 使用 [Shiki](https://shiki.style/) 提供强大的代码高亮功能，支持行高亮、代码组等特性。

### 行高亮

使用 `{行号}` 语法高亮指定行：

**输入：**

````md
```js{4}
export default {
  data () {
    return {
      msg: '第4行被高亮!'
    }
  }
}
```
````

**效果：**

```js{4}
export default {
  data () {
    return {
      msg: '第4行被高亮!'
    }
  }
}
```

### 多行高亮

使用 `{3-5}` 高亮多行，或使用 `{1,3,5}` 高亮不连续行：

````md
```js{2,4-6}
export default {
  name: 'MyComponent',
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  }
}
```
````

### 代码块行号控制

```sh
# 默认显示行号
pnpm -v
```

```sh:no-line-numbers
# 使用 :no-line-numbers 关闭行号
pnpm -v
```

---

## 代码组

使用 `::: code-group` 创建多标签代码组，方便展示同一功能的不同实现方式：

**输入：**

```md
::: code-group

```sh [pnpm]
# 使用 pnpm 安装
pnpm install
```

```sh [npm]
# 使用 npm 安装
npm install
```

```sh [yarn]
# 使用 yarn 安装
yarn install
```

:::
```

**效果：**

::: code-group

```sh [pnpm]
# 使用 pnpm 安装
pnpm install
```

```sh [npm]
# 使用 npm 安装
npm install
```

```sh [yarn]
# 使用 yarn 安装
yarn install
```

:::

## 提示容器

VitePress 提供了多种提示容器，用于突出显示重要信息。

### 传统语法

```md
::: info
这是信息提示框，用于展示一般性信息。
:::

::: tip
这是提示框，用于展示有用的提示。
:::

::: warning
这是警告框，用于展示需要注意的内容。
:::

::: danger
这是危险警告框，用于展示可能带来负面影响的行为。
:::
```

**效果：**

::: info
这是信息提示框，用于展示一般性信息。
:::

::: tip
这是提示框，用于展示有用的提示。
:::

::: warning
这是警告框，用于展示需要注意的内容。
:::

::: danger
这是危险警告框，用于展示可能带来负面影响的行为。
:::

### GitHub 风格语法

VitePress 也支持 GitHub 风格的提示语法：

```md
> [!NOTE]
> 这是注意事项，用于补充说明。

> [!TIP]
> 这是使用技巧，帮助用户更好地使用功能。

> [!IMPORTANT]
> 这是重要信息，需要特别关注。

> [!WARNING]
> 这是警告信息，需要注意潜在问题。

> [!CAUTION]
> 这是谨慎提示，提醒可能的不良后果。
```

**效果：**

> [!NOTE]
> 这是注意事项，用于补充说明。

> [!TIP]
> 这是使用技巧，帮助用户更好地使用功能。

> [!IMPORTANT]
> 这是重要信息，需要特别关注。

> [!WARNING]
> 这是警告信息，需要注意潜在问题。

> [!CAUTION]
> 这是谨慎提示，提醒可能的不良后果。

### 详情折叠

使用 `::: details` 创建可折叠的内容块：

```md
::: details 点击展开详情
这里是被折叠的详细内容，可以包含任何 Markdown 语法。

- 列表项 1
- 列表项 2
- 列表项 3
:::
```

**效果：**

::: details 点击展开详情
这里是被折叠的详细内容，可以包含任何 Markdown 语法。

- 列表项 1
- 列表项 2
- 列表项 3
:::

---

## 徽章

使用 Badge 组件展示版本号、状态等信息：

```md
- VitePress <Badge type="info" text="v1.0" />
- 新功能 <Badge type="tip" text="^2.0" />
- 测试版 <Badge type="warning" text="beta" />
- 已弃用 <Badge type="danger" text="deprecated" />
```

**效果：**

- VitePress <Badge type="info" text="v1.0" />
- 新功能 <Badge type="tip" text="^2.0" />
- 测试版 <Badge type="warning" text="beta" />
- 已弃用 <Badge type="danger" text="deprecated" />

---

## 表格

支持标准 Markdown 表格语法，以及文本对齐：

```md
| 功能 | 描述 | 价格 |
| ------ | :----------: | ----: |
| 基础版 | 包含基本功能 | 免费 |
| 专业版 | 包含高级功能 | $12/月 |
| 企业版 | 包含全部功能 | $99/月 |
```

**效果：**

| 功能  |   描述   |    价格 |
|-----|:------:|------:|
| 基础版 | 包含基本功能 |    免费 |
| 专业版 | 包含高级功能 | $12/月 |
| 企业版 | 包含全部功能 | $99/月 |

对齐方式：

- `:---` 左对齐
- `:---:` 居中对齐
- `---:` 右对齐

---

## 自定义组件

### 链接卡片

使用 LinkCard 组件展示精美的链接卡片：

```md
<LinkCard 
  url="https://vitepress.yiov.top/" 
  title="VitePress 中文搭建教程" 
  description="详细的中文 VitePress 搭建指南" 
  logo="https://vitepress.yiov.top/logo.png"
/>
```

**效果：**

<LinkCard 
  url="https://vitepress.yiov.top/" 
  title="VitePress 中文搭建教程" 
  description="详细的中文 VitePress 搭建指南" 
  logo="https://vitepress.yiov.top/logo.png"
/>

### 视频播放器

使用 WatermelonPlayer 组件嵌入视频：

**输入：**

```md
<WatermelonPlayer 
  url="https://www.w3schools.com/html/mov_bbb.mp4" 
  poster="/logo/003.png" 
/>
```

**效果：**

<WatermelonPlayer 
  url="https://www.w3schools.com/html/mov_bbb.mp4" 
  poster="/logo/003.png" 
/>

### 时间线

使用 timeline 语法创建时间线：

```md
::: timeline 2024-01-15
- 项目启动
  - 完成需求分析
  - 确定技术栈
- 团队组建完成
:::

::: timeline 2024-02-01
- 第一阶段开发完成
  - 核心功能实现
  - 基础 UI 设计
:::
```

**效果：**

::: timeline 2024-01-15
- 项目启动
  - 完成需求分析
  - 确定技术栈
- 团队组建完成
:::

::: timeline 2024-02-01
- 第一阶段开发完成
  - 核心功能实现
  - 基础 UI 设计
:::

### 图片缩放

VitePress 自动为图片添加点击缩放功能（点击图片查看效果）：

**输入：**

```md
![本地图片](/logo/003.png)

![网络图片](https://picsum.photos/400/200?random=1)
```

**效果：**

![本地图片](/logo/003.png)

![网络图片](https://picsum.photos/400/200?random=1)

### 文字标记

使用自定义样式标记重点文字：

```md
<span class="marker-text">普通重点标记</span>

<span class="marker-text-highlight">高亮重点标记</span>

<span class="marker-evy">悬浮效果标记</span>
```

**效果：**

<span class="marker-text">普通重点标记</span>

<span class="marker-text-highlight">高亮重点标记</span>

<span class="marker-evy">悬浮效果标记</span>

---

## 更多资源

查看 [VitePress Markdown 扩展官方文档](https://vitepress.dev/guide/markdown) 了解更多语法。
