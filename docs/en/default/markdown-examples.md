# Markdown Syntax Tutorial

This page demonstrates the built-in Markdown extension syntax provided by VitePress to help you write better documentation.

## Basic Links

Supports various external links:

[Bilibili](https://www.bilibili.com/) | [YouTube](https://www.youtube.com/) | [Baidu](https://www.baidu.com/) | [GitHub](https://www.github.com/) | [Google](https://www.google.com/)

## Code Highlighting

VitePress uses [Shiki](https://shiki.style/) to provide powerful code highlighting features, including line highlighting, code groups, and more.

### Line Highlighting

Use `{line number}` syntax to highlight specific lines:

**Input:**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Line 4 is highlighted!'
    }
  }
}
```
````

**Output:**

```js{4}
export default {
  data () {
    return {
      msg: 'Line 4 is highlighted!'
    }
  }
}
```

### Multi-line Highlighting

Use `{3-5}` to highlight multiple lines, or `{1,3,5}` to highlight non-consecutive lines:

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

### Code Block Line Number Control

```sh
# Line numbers are shown by default
pnpm -v
```

```sh:no-line-numbers
# Use :no-line-numbers to disable line numbers
pnpm -v
```

## Code Groups

Use `::: code-group` to create multi-tab code groups, which are convenient for showing different implementations of the same functionality:

**Input:**

```md
::: code-group

```sh [pnpm]
# Check pnpm version
pnpm -v
```

```sh [yarn]
# Check yarn version
yarn -v
```

:::

**Output:**

::: code-group

```sh [pnpm]
# Install with pnpm
pnpm install
```

```sh [npm]
# Install with npm
npm install
```

```sh [yarn]
# Install with yarn
yarn install
```

:::

## Alert Containers

VitePress provides various alert containers for highlighting important information.

### Traditional Syntax

```md
::: info
This is an information alert box for displaying general information.
:::

::: tip
This is a tip alert box for displaying useful tips.
:::

::: warning
This is a warning alert box for displaying content that requires attention.
:::

::: danger
This is a danger alert box for displaying behaviors that may have negative impacts.
:::
```

**Output:**

::: info
This is an information alert box for displaying general information.
:::

::: tip
This is a tip alert box for displaying useful tips.
:::

::: warning
This is a warning alert box for displaying content that requires attention.
:::

::: danger
This is a danger alert box for displaying behaviors that may have negative impacts.
:::

### GitHub Style Syntax

VitePress also supports GitHub-style alert syntax:

```md
> [!NOTE]
> This is a note for supplementary explanation.

> [!TIP]
> This is a usage tip to help users better use features.

> [!IMPORTANT]
> This is important information that requires special attention.

> [!WARNING]
> This is warning information that requires attention to potential issues.

> [!CAUTION]
> This is a cautionary note to remind of possible adverse consequences.
```

**Output:**

> [!NOTE]
> This is a note for supplementary explanation.

> [!TIP]
> This is a usage tip to help users better use features.

> [!IMPORTANT]
> This is important information that requires special attention.

> [!WARNING]
> This is warning information that requires attention to potential issues.

> [!CAUTION]
> This is a cautionary note to remind of possible adverse consequences.

### Collapsible Details

Use `::: details` to create collapsible content blocks:

```md
::: details Click to expand details
Here is the collapsed detailed content, which can include any Markdown syntax.

- List item 1
- List item 2
- List item 3
  :::
```

**Output:**

::: details Click to expand details
Here is the collapsed detailed content, which can include any Markdown syntax.

- List item 1
- List item 2
- List item 3
  :::


## Badges

Use the `Badge` component to display version numbers, status, and other information:

```md
- VitePress <Badge type="info" text="v1.0" />
- New feature <Badge type="tip" text="^2.0" />
- Beta version <Badge type="warning" text="beta" />
- Deprecated <Badge type="danger" text="deprecated" />
```

**Output:**

- VitePress <Badge type="info" text="v1.0" />
- New feature <Badge type="tip" text="^2.0" />
- Beta version <Badge type="warning" text="beta" />
- Deprecated <Badge type="danger" text="deprecated" />

## Tables

Supports standard Markdown table syntax, as well as text alignment:

```md
| Feature | Description | Price |
| ------ | :----------: | ----: |
| Basic | Includes basic features | Free |
| Pro | Includes advanced features | $12/month |
| Enterprise | Includes all features | $99/month |
```

**Output:**

| Feature | Description | Price |
| ----- | :------: | ------: |
| Basic | Includes basic features | Free |
| Pro | Includes advanced features | $12/month |
| Enterprise | Includes all features | $99/month |

Alignment methods:

- `:---` Left alignment
- `:---:` Center alignment
- `---:` Right alignment

## Custom Components

### Link Cards

Use the `LinkCard` component to display beautiful link cards:

```md
<LinkCard 
  url="https://vitepress.yiov.top/" 
  title="VitePress Chinese Setup Guide" 
  description="Detailed Chinese VitePress setup guide" 
  logo="https://vitepress.yiov.top/logo.png"
/>
```

**Output:**

<LinkCard 
  url="https://vitepress.yiov.top/" 
  title="VitePress Chinese Setup Guide" 
  description="Detailed Chinese VitePress setup guide" 
  logo="https://vitepress.yiov.top/logo.png"
/>

### Video Player

Use the `WatermelonPlayer` component to embed videos:

**Input:**

```md
<WatermelonPlayer 
  url="https://www.w3schools.com/html/mov_bbb.mp4" 
  poster="/logo/003.png" 
/>
```

**Output:**

<WatermelonPlayer 
  url="https://www.w3schools.com/html/mov_bbb.mp4" 
  poster="/logo/003.png" 
/>

For online videos, you can use the `<iframe>` tag:

**Input:**

```MD
<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="https://www.youtube.com/embed/bzyMLoSwYvk" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>


<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="//player.bilibili.com/player.html?bvid=BV1YptMeMEcV" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>
```

**Output:**

<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="https://www.youtube.com/embed/bzyMLoSwYvk" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>


<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="//player.bilibili.com/player.html?bvid=BV1YptMeMEcV" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>

### Timeline

Use timeline syntax to create timelines:

```md
::: timeline 2024-01-15

- Project start
    - Completed requirements analysis
    - Determined technology stack
- Team formation completed
  :::

::: timeline 2024-02-01

- First phase development completed
    - Core functionality implemented
    - Basic UI design
      :::
```

**Output:**

::: timeline 2024-01-15

- Project start
  - Completed requirements analysis
  - Determined technology stack
- Team formation completed
  :::

::: timeline 2024-02-01

- First phase development completed
  - Core functionality implemented
  - Basic UI design
    :::

### Image Zoom

VitePress automatically adds click-to-zoom functionality to images (click on images to see the effect):

**Input:**

```md
![Local image](/logo/003.png)

![Network image](https://picsum.photos/400/200?random=1)
```

**Output:**

![Local image](/logo/003.png)

![Network image](https://picsum.photos/400/200?random=1)

### Text Markers

Use custom styles to mark important text:

```md
<span class="marker-text">Normal important marker</span>

<span class="marker-text-highlight">Highlighted important marker</span>

<span class="marker-evy">Hover effect marker</span>
```

**Output:**

<span class="marker-text">Normal important marker</span>

<span class="marker-text-highlight">Highlighted important marker</span>

<span class="marker-evy">Hover effect marker</span>


## More Resources

Check the [VitePress Markdown Extension Official Documentation](https://vitepress.dev/guide/markdown) to learn more syntax.
