# Markdown Extension Examples -- English

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Bilibili](https://www.bilibili.com/), with additional features like line-highlighting:

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
> Possible negative impacts of behavior。

> [!Note]
> This is a details block.

> [!important]
> Possible negative impacts of behavior。

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
> Possible negative impacts of behavior。

> [!Note]
> This is a details block.

> [!important]
> Possible negative impacts of behavior。

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).

## 自定义容器

<span class="marker-evy">This is the key suspension effect</span>

<span class="marker-text">This is the key point</span>

<span class="marker-text-highlight">This is the key point</span>

## Code Block

```sh
#Default line number
pnpm -v
```

```sh:no-line-numbers
#Close line number
pnpm -v
```

## Code group
::: code-group

```sh [pnpm]
#Query PNPM version
pnpm -v
```

```sh [yarn]
#Query yarn version
yarn -v
```

:::

##badge
![](https://img.shields.io/badge/any_text-you_like-blue)

## form
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Custom Components - Link Cards
<LinkCard url="https://vitepress.yiov.top/" title="Vitepress Chinese Building Tutorial" description="https://vitepress.yiov.top/" logo="https://vitepress.yiov.top/logo.png"/>


## Custom Components - Video Player
<WatermelonPlayer url="../../public/video/a.mp4" poster="../../public/logo/003.png" />

<update />

## Custom Components - Timeline

::: timeline 2023-04-24
- A fantastic open-source project H5-Dooring at present star 3.1k
  - Open source address: https://github.com/MrXujiang/h5-Dooring
  - Basic Introduction: http://h5.dooring.cn/doc/zh/guide/
- 《Easy to understand webpack》: http://webpack.wuhaolin.cn/
:::

::: timeline 2023-04-23
:::

## Custom Component - Image Scaling

![](../../public/logo/003.png)

![](https://vuepress.yiov.top/beautification/02.png)

## Custom Components - Icon Code Group

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

## Custom Components - Badge Components

* VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" />
* VitePress <Badge type="info">custom element</Badge>