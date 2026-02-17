# Markdown Extension Examples -- chinese

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [哔哩哔哩](https://www.bilibili.com/), with additional features like line-highlighting:

[Youtube](https://www.youtube.com/)

[baidu](https://www.baidu.com/)

[github](https://www.github.com/)

[google](https://www.google.com/)

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

> [!Info]
> This is a dangerous warning.

::: tip
This is a tip.
:::

> [!tip]
> This is a dangerous warning.


::: warning
This is a warning.
:::

> [!warning]
> This is a dangerous warning.

::: danger
This is a dangerous warning.
:::

> [!danger]
> 行为可能带来的负面影响。

> [!Note]
> This is a details block.

> [!important]
> 行为可能带来的负面影响。

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

> [!Info]
> This is a dangerous warning.

::: tip
This is a tip.
:::

> [!tip]
> This is a dangerous warning.


::: warning
This is a warning.
:::

> [!warning]
> This is a dangerous warning.

::: danger
This is a dangerous warning.
:::

> [!danger]
> 行为可能带来的负面影响。

> [!Note]
> This is a details block.

> [!important]
> 行为可能带来的负面影响。

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).

## 自定义容器

<span class="marker-evy">这里是重重点悬浮效果</span>

<span class="marker-text">这里是重重点</span>

<span class="marker-text-highlight">这里是重重点</span>

## 代码块

```sh
#默认有行号
pnpm -v
```

```sh:no-line-numbers
#关闭行号
pnpm -v
```

## 代码组
::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

:::

## 徽章
![](https://img.shields.io/badge/any_text-you_like-blue)

## 表格
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## 自定义组件 - 链接卡片
<LinkCard url="https://vitepress.yiov.top/" title="Vitepress中文搭建教程" description="https://vitepress.yiov.top/" logo="https://vitepress.yiov.top/logo.png"/>


## 自定义组件 - 视频播放器
<WatermelonPlayer url="../../public/video/a.mp4" poster="../../public/logo/003.png" />

<update />

## 自定义组件 - 时间线

::: timeline 2023-04-24
- 一个非常棒的开源项目 H5-Dooring 目前 star 3.1k
  - 开源地址 https://github.com/MrXujiang/h5-Dooring
  - 基本介绍 http://h5.dooring.cn/doc/zh/guide/
- 《深入浅出webpack》 http://webpack.wuhaolin.cn/
:::

::: timeline 2023-04-23
:::

## 自定义组件 - 图片缩放

![](../../public/logo/003.png)

![](https://vuepress.yiov.top/beautification/02.png)

## 自定义组件 - 图标代码组

::: code-group
```ts [ts]
console.log("I'm TypeScript");
```

```js [js]
console.log("I'm JavaScript");
```

```md [md]
Markdown图标演示
```

```css [css]
h1 {
  background: red;
}
```

:::

## 自定义组件 - Badge组件

* VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" />
* VitePress <Badge type="info">custom element</Badge>