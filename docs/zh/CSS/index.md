# CSS 基础 <Badge type="tip" text="CSS3" />

> [!TIP]
> 本教程涵盖 CSS3 核心技术，从基础选择器到 Flex/Grid 布局、动画和响应式设计。

## 📋 学习大纲

| 章节 | 内容 | 预计时间 |
|------|------|----------|
| [选择器](#一-选择器) | 基础、复合、伪类、伪元素选择器 | 20 分钟 |
| [字体样式](#二-字体样式) | font 属性、字体系列 | 10 分钟 |
| [文本样式](#三-文本样式) | 颜色、对齐、装饰、溢出处理 | 15 分钟 |
| [背景样式](#四-背景样式) | 颜色、图片、渐变 | 15 分钟 |
| [盒子模型](#五-盒子模型) | 边框、内边距、外边距、box-sizing | 20 分钟 |
| [浮动](#六-浮动) | float、清除浮动 | 15 分钟 |
| [定位](#七-定位) | static、relative、absolute、fixed、sticky | 20 分钟 |
| [Flex 布局](#八-flex-布局) | 容器属性、项目属性 | 30 分钟 |
| [Grid 布局](#九-grid-布局) | 网格定义、区域划分 | 25 分钟 |
| [过渡与动画](#十-过渡与动画) | transition、animation、transform | 25 分钟 |
| [CSS3 新特性](#十一-css3-新特性) | 阴影、渐变、滤镜、变量 | 20 分钟 |
| [响应式设计](#十二-响应式设计) | 媒体查询、rem/vw、移动适配 | 20 分钟 |

**总预计学习时间：** 约 4-5 小时

## 🎯 学习目标

完成本教程后，你将能够：

- ✅ 熟练使用各种 CSS 选择器
- ✅ 掌握字体、文本、背景样式设置
- ✅ 理解盒子模型和多种布局方式
- ✅ 使用 Flex 和 Grid 进行现代布局
- ✅ 制作过渡动画和变换效果
- ✅ 实现响应式网页设计

## 🔗 相关文档

- [HTML 基础](../HTML/index.md) - 网页结构搭建
- [JavaScript 完全指南](../fundamentals/javascript.md) - 动态样式操作
- [Vue 完全指南](../frameworks/vue.md) - 组件样式 scoped


## 选择器

### 基础选择器

| 选择器 | 示例 | 说明 |
|--------|------|------|
| 标签选择器 | `p` | 选择所有 `<p>` 元素 |
| 类选择器 | `.box` | 选择 class="box" 的元素 |
| ID 选择器 | `#header` | 选择 id="header" 的元素 |
| 通配符选择器 | `*` | 选择所有元素 |

### 复合选择器

```css
/* 后代选择器 */
.box p { }        /* .box 内的所有 p */

/* 子代选择器 */
.box > a { }      /* .box 的直接子元素 a */

/* 并集选择器 */
div, p { }        /* 所有 div 和 p */

/* 交集选择器 */
div.box { }       /* class="box" 的 div */
```

### 伪类选择器

```css
/* 链接伪类 */
a:link { }        /* 未访问的链接 */
a:visited { }     /* 已访问的链接 */
a:hover { }       /* 鼠标悬停 */
a:active { }      /* 鼠标按下 */

/* 结构伪类 */
li:first-child { }    /* 第一个子元素 */
li:last-child { }     /* 最后一个子元素 */
li:nth-child(n) { }   /* 第 n 个子元素 */
li:nth-child(2n) { }  /* 偶数项 */
li:nth-child(odd) { } /* 奇数项 */

/* 表单伪类 */
input:focus { }       /* 获得焦点 */
input:checked { }     /* 选中状态 */
input:disabled { }    /* 禁用状态 */
```

### 伪元素选择器

```css
/* 在元素内容前插入 */
.box::before {
    content: "前缀";
}

/* 在元素内容后插入 */
.box::after {
    content: "";
    display: block;
    clear: both;
}

/* 选中文本 */
::selection {
    background: yellow;
}
```

### 选择器优先级

优先级从高到低：

```
!important > 行内样式 > ID 选择器 > 类/伪类/属性选择器 > 标签选择器 > 通配符
```

| 选择器 | 权重值 |
|--------|--------|
| 行内样式 | 1000 |
| ID 选择器 | 100 |
| 类/伪类/属性 | 10 |
| 标签选择器 | 1 |
| 通配符 | 0 |

## 字体样式

### font 属性

```css
/* 复合写法 */
font: font-style font-weight font-size/line-height font-family;

/* 示例 */
font: italic bold 16px/1.5 "Microsoft YaHei", sans-serif;

/* 必须包含 font-size 和 font-family */
font: 16px "Microsoft YaHei";
```

### 字体属性详解

| 属性 | 说明 | 常用值 |
|------|------|--------|
| `font-size` | 字体大小 | 12px, 14px, 16px |
| `font-weight` | 字体粗细 | normal(400), bold(700) |
| `font-style` | 字体样式 | normal, italic |
| `font-family` | 字体系列 | "Microsoft YaHei", Arial |
| `line-height` | 行高 | 1.5, 24px |

## 文本样式

| 属性 | 说明 | 常用值 |
|------|------|--------|
| `color` | 文本颜色 | red, #333, rgb(0,0,0) |
| `text-align` | 水平对齐 | left, center, right |
| `text-decoration` | 文本装饰 | none, underline, line-through |
| `text-indent` | 文本缩进 | 2em, 24px |
| `text-shadow` | 文字阴影 | 2px 2px 4px rgba(0,0,0,0.5) |
| `white-space` | 空白处理 | nowrap, pre-wrap |
| `text-overflow` | 溢出显示 | ellipsis |

### 单行文本溢出省略

```css
.single-line {
    white-space: nowrap;        /* 不换行 */
    overflow: hidden;           /* 溢出隐藏 */
    text-overflow: ellipsis;    /* 省略号 */
}
```

### 多行文本溢出省略

```css
.multi-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;      /* 显示 3 行 */
    overflow: hidden;
}
```

## 背景样式

| 属性 | 说明 | 常用值 |
|------|------|--------|
| `background-color` | 背景颜色 | #fff, rgba(0,0,0,0.5) |
| `background-image` | 背景图片 | url("image.jpg") |
| `background-repeat` | 背景平铺 | repeat, no-repeat |
| `background-position` | 背景位置 | center, 10px 20px |
| `background-size` | 背景大小 | cover, contain, 100% |
| `background-attachment` | 背景固定 | scroll, fixed |

### 复合写法

```css
background: color image repeat position/size;

/* 示例 */
background: #f5f5f5 url("bg.jpg") no-repeat center/cover;
```

## 盒子模型

### 边框

```css
/* 边框样式 */
border-style: solid;    /* 实线 */
border-style: dashed;   /* 虚线 */
border-style: dotted;   /* 点线 */
border-style: none;     /* 无边框 */

/* 复合写法 */
border: 1px solid #ccc;
border-top: 2px dashed red;

/* 圆角 */
border-radius: 4px;           /* 统一圆角 */
border-radius: 10px 20px;     /* 左上右下 / 右上左下 */
border-radius: 50%;           /* 圆形 */
```

### 内边距

```css
padding: 10px;            /* 四边相同 */
padding: 10px 20px;       /* 上下 / 左右 */
padding: 10px 20px 30px;  /* 上 / 左右 / 下 */
padding: 10px 20px 30px 40px; /* 上 / 右 / 下 / 左 */

/* 单独设置 */
padding-top: 10px;
padding-right: 20px;
```

### 外边距

```css
margin: 10px;
margin: 10px auto;        /* 上下 10px，左右居中 */

/* 外边距合并问题 */
/* 解决方案： */
.parent {
    overflow: hidden;     /* 创建 BFC */
    /* 或 */
    border: 1px solid transparent;
    /* 或 */
    padding: 1px;
}
```

### 盒子模型类型

```css
/* 标准盒模型（默认值） */
box-sizing: content-box;
/* width/height = 内容宽高 */
/* 实际宽度 = width + padding + border */

/* 怪异盒模型（推荐） */
box-sizing: border-box;
/* width/height = 实际宽高 */
/* 内容宽度 = width - padding - border */
```

## 浮动

```css
.float-left {
    float: left;
}

.float-right {
    float: right;
}
```

### 清除浮动

```css
/* 方式1：额外标签法 */
.clear {
    clear: both;
}

/* 方式2：伪元素法（推荐） */
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}

/* 方式3：双伪元素法 */
.clearfix::before,
.clearfix::after {
    content: "";
    display: table;
}
.clearfix::after {
    clear: both;
}
```

## 定位

| 定位类型 | 说明 | 参照物 |
|----------|------|--------|
| `static` | 静态定位（默认） | 正常文档流 |
| `relative` | 相对定位 | 自身原位置 |
| `absolute` | 绝对定位 | 最近的定位祖先元素 |
| `fixed` | 固定定位 | 浏览器视口 |
| `sticky` | 粘性定位 | 滚动容器 |

```css
/* 相对定位 */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* 绝对定位 */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

/* 固定定位 */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

/* 粘性定位 */
.sticky {
    position: sticky;
    top: 0;
}

/* 层级 */
.z-index: 10;
```

## Flex 布局

### 容器属性

```css
.container {
    display: flex;
    
    /* 主轴方向 */
    flex-direction: row;           /* 水平（默认） */
    flex-direction: row-reverse;   /* 水平反向 */
    flex-direction: column;        /* 垂直 */
    flex-direction: column-reverse;/* 垂直反向 */
    
    /* 换行 */
    flex-wrap: nowrap;             /* 不换行（默认） */
    flex-wrap: wrap;               /* 换行 */
    flex-wrap: wrap-reverse;       /* 反向换行 */
    
    /* 简写 */
    flex-flow: row wrap;
    
    /* 主轴对齐 */
    justify-content: flex-start;   /* 左对齐 */
    justify-content: flex-end;     /* 右对齐 */
    justify-content: center;       /* 居中 */
    justify-content: space-between;/* 两端对齐 */
    justify-content: space-around; /* 均匀分布 */
    justify-content: space-evenly; /* 完全均匀 */
    
    /* 交叉轴对齐 */
    align-items: stretch;          /* 拉伸（默认） */
    align-items: flex-start;       /* 顶部对齐 */
    align-items: flex-end;         /* 底部对齐 */
    align-items: center;           /* 垂直居中 */
    align-items: baseline;         /* 基线对齐 */
    
    /* 多行对齐 */
    align-content: flex-start;
    align-content: center;
    align-content: space-between;
}
```

### 项目属性

```css
.item {
    /* 排序 */
    order: 1;
    
    /* 放大比例 */
    flex-grow: 1;
    
    /* 缩小比例 */
    flex-shrink: 0;
    
    /* 基础大小 */
    flex-basis: 200px;
    
    /* 简写 */
    flex: 1;              /* flex-grow: 1 */
    flex: 0 0 200px;      /* 不放大不缩小，固定 200px */
    flex: 1 1 auto;       /* 可放大可缩小 */
    
    /* 单独对齐 */
    align-self: center;
}
```

## Grid 布局

### 容器属性

```css
.container {
    display: grid;
    
    /* 定义列 */
    grid-template-columns: 100px 100px 100px;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    
    /* 定义行 */
    grid-template-rows: 100px 200px;
    
    /* 间距 */
    gap: 10px;
    column-gap: 10px;
    row-gap: 10px;
    
    /* 对齐 */
    justify-items: center;
    align-items: center;
    place-items: center center;
    
    justify-content: center;
    align-content: center;
}
```

### 项目属性

```css
.item {
    /* 跨列 */
    grid-column: 1 / 3;       /* 从第1列到第3列 */
    grid-column: span 2;      /* 跨2列 */
    
    /* 跨行 */
    grid-row: 1 / 3;
    grid-row: span 2;
    
    /* 简写 */
    grid-area: 1 / 1 / 3 / 3; /* 行起始/列起始/行结束/列结束 */
}
```

## 过渡与动画

### 过渡 Transition

```css
.box {
    transition: property duration timing-function delay;
    
    /* 示例 */
    transition: all 0.3s ease;
    transition: width 0.5s ease-in-out 0.1s;
    
    /* 分别设置 */
    transition-property: width, height;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
}

/* 时间函数 */
ease;           /* 慢-快-慢 */
linear;         /* 匀速 */
ease-in;        /* 慢开始 */
ease-out;       /* 慢结束 */
ease-in-out;    /* 慢开始慢结束 */
cubic-bezier(); /* 贝塞尔曲线 */
```

### 动画 Animation

```css
/* 定义动画 */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

/* 使用动画 */
.box {
    animation: slideIn 0.5s ease forwards;
    animation: bounce 1s ease infinite;
    
    /* 分别设置 */
    animation-name: slideIn;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;      /* 播放次数 */
    animation-direction: normal;        /* 播放方向 */
    animation-fill-mode: forwards;      /* 结束状态 */
    animation-play-state: running;      /* 播放状态 */
}
```

### 变换 Transform

```css
/* 位移 */
transform: translateX(100px);
transform: translateY(50px);
transform: translate(100px, 50px);

/* 缩放 */
transform: scale(1.5);
transform: scaleX(2);
transform: scaleY(0.5);

/* 旋转 */
transform: rotate(45deg);
transform: rotateX(45deg);
transform: rotateY(45deg);

/* 倾斜 */
transform: skewX(30deg);
transform: skewY(30deg);

/* 组合 */
transform: translateX(100px) rotate(45deg) scale(1.5);

/* 变换原点 */
transform-origin: center center;
transform-origin: left top;
```

## CSS3 新特性

### 阴影

```css
/* 盒子阴影 */
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
box-shadow: 
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1);

/* 内阴影 */
box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);

/* 文字阴影 */
text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
```

### 渐变

```css
/* 线性渐变 */
background: linear-gradient(to right, red, blue);
background: linear-gradient(45deg, red, blue, green);
background: linear-gradient(to right, red 0%, blue 50%, green 100%);

/* 径向渐变 */
background: radial-gradient(circle, red, blue);
background: radial-gradient(ellipse at center, red, blue);
```

### 滤镜

```css
filter: blur(5px);           /* 模糊 */
filter: brightness(1.5);     /* 亮度 */
filter: contrast(2);         /* 对比度 */
filter: grayscale(1);        /* 灰度 */
filter: sepia(1);            /* 褐色 */
filter: hue-rotate(90deg);   /* 色相旋转 */
filter: saturate(2);         /* 饱和度 */
filter: opacity(0.5);        /* 透明度 */
filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3)); /* 投影 */
```

### 计算函数

```css
width: calc(100% - 40px);
width: calc(50vw + 20px);
font-size: calc(16px + 2vw);
```

### 变量

```css
:root {
    --primary-color: #1890ff;
    --text-color: #333;
    --font-size: 14px;
}

.box {
    color: var(--primary-color);
    font-size: var(--font-size);
}
```

## 响应式设计

### 媒体查询

```css
/* 移动端优先 */
.container {
    width: 100%;
}

/* 平板 */
@media screen and (min-width: 768px) {
    .container {
        width: 750px;
    }
}

/* 桌面 */
@media screen and (min-width: 992px) {
    .container {
        width: 970px;
    }
}

/* 大屏 */
@media screen and (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}
```

### 视口设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 常用单位

| 单位 | 说明 |
|------|------|
| `px` | 像素，绝对单位 |
| `%` | 百分比，相对父元素 |
| `em` | 相对父元素字体大小 |
| `rem` | 相对根元素字体大小 |
| `vw` | 视口宽度的百分比 |
| `vh` | 视口高度的百分比 |
| `vmin` | vw 和 vh 中的较小值 |
| `vmax` | vw 和 vh 中的较大值 |
