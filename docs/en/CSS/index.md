# CSS Basics <Badge type="tip" text="CSS3" />

> [!TIP]
> This tutorial covers CSS3 core technologies, from basic selectors to Flex/Grid layouts, animations, and responsive design.

## 📋 Learning Outline

| Chapter | Content | Duration |
|---------|---------|----------|
| [Selectors](#selectors) | Basic, compound, pseudo-class, pseudo-element | 20 min |
| [Font Styles](#font-styles) | font properties, font families | 10 min |
| [Text Styles](#text-styles) | Color, alignment, decoration, overflow | 15 min |
| [Background Styles](#background-styles) | Color, images, gradients | 15 min |
| [Box Model](#box-model) | Border, padding, margin, box-sizing | 20 min |
| [Float](#float) | float, clear float | 15 min |
| [Positioning](#positioning) | static, relative, absolute, fixed, sticky | 20 min |
| [Flex Layout](#flex-layout) | Container and item properties | 30 min |
| [Grid Layout](#grid-layout) | Grid definition, area division | 25 min |
| [Transitions & Animations](#transitions--animations) | transition, animation, transform | 25 min |
| [CSS3 Features](#css3-new-features) | Shadows, gradients, filters, variables | 20 min |
| [Responsive Design](#responsive-design) | Media queries, rem/vw, mobile adaptation | 20 min |

**Total Estimated Learning Time:** About 4-5 hours

## 🎯 Learning Objectives

After completing this tutorial, you will be able to:

- ✅ Proficiently use various CSS selectors
- ✅ Master font, text, and background styling
- ✅ Understand box model and various layout methods
- ✅ Use Flex and Grid for modern layouts
- ✅ Create transition animations and transform effects
- ✅ Implement responsive web design

## 🔗 Related Documentation

- [HTML Basics](../HTML/index.md) - Web page structure
- [JavaScript Complete Guide](../fundamentals/javascript.md) - Dynamic style manipulation
- [Vue Complete Guide](../frameworks/vue.md) - Component scoped styles


## Selectors

### Basic Selectors

| Selector | Example | Description |
|----------|---------|-------------|
| Tag selector | `p` | Select all `<p>` elements |
| Class selector | `.box` | Select elements with class="box" |
| ID selector | `#header` | Select element with id="header" |
| Universal selector | `*` | Select all elements |

### Compound Selectors

```css
/* Descendant selector */
.box p { }        /* All p inside .box */

/* Child selector */
.box > a { }      /* Direct child a of .box */

/* Union selector */
div, p { }        /* All div and p elements */

/* Intersection selector */
div.box { }       /* div with class="box" */
```

### Pseudo-class Selectors

```css
/* Link pseudo-classes */
a:link { }        /* Unvisited link */
a:visited { }     /* Visited link */
a:hover { }       /* Mouse hover */
a:active { }      /* Mouse pressed */

/* Structural pseudo-classes */
li:first-child { }    /* First child */
li:last-child { }     /* Last child */
li:nth-child(n) { }   /* nth child */
li:nth-child(2n) { }  /* Even items */
li:nth-child(odd) { } /* Odd items */

/* Form pseudo-classes */
input:focus { }       /* Focus state */
input:checked { }     /* Checked state */
input:disabled { }    /* Disabled state */
```

### Pseudo-element Selectors

```css
/* Insert before element content */
.box::before {
    content: "Prefix";
}

/* Insert after element content */
.box::after {
    content: "";
    display: block;
    clear: both;
}

/* Selected text */
::selection {
    background: yellow;
}
```

### Selector Specificity

Specificity from high to low:

```
!important > inline style > ID selector > class/pseudo-class/attribute > tag selector > universal
```

| Selector | Weight |
|----------|--------|
| Inline style | 1000 |
| ID selector | 100 |
| Class/pseudo-class/attribute | 10 |
| Tag selector | 1 |
| Universal | 0 |

## Font Styles

### font Property

```css
/* Shorthand */
font: font-style font-weight font-size/line-height font-family;

/* Example */
font: italic bold 16px/1.5 "Microsoft YaHei", sans-serif;

/* Must include font-size and font-family */
font: 16px "Microsoft YaHei";
```

### Font Properties Detail

| Property | Description | Common Values |
|----------|-------------|---------------|
| `font-size` | Font size | 12px, 14px, 16px |
| `font-weight` | Font weight | normal(400), bold(700) |
| `font-style` | Font style | normal, italic |
| `font-family` | Font family | "Microsoft YaHei", Arial |
| `line-height` | Line height | 1.5, 24px |

## Text Styles

| Property | Description | Common Values |
|----------|-------------|---------------|
| `color` | Text color | red, #333, rgb(0,0,0) |
| `text-align` | Horizontal alignment | left, center, right |
| `text-decoration` | Text decoration | none, underline, line-through |
| `text-indent` | Text indent | 2em, 24px |
| `text-shadow` | Text shadow | 2px 2px 4px rgba(0,0,0,0.5) |
| `white-space` | White space handling | nowrap, pre-wrap |
| `text-overflow` | Overflow display | ellipsis |

### Single Line Text Overflow Ellipsis

```css
.single-line {
    white-space: nowrap;        /* No wrap */
    overflow: hidden;           /* Hide overflow */
    text-overflow: ellipsis;    /* Ellipsis */
}
```

### Multi-line Text Overflow Ellipsis

```css
.multi-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;      /* Show 3 lines */
    overflow: hidden;
}
```

## Background Styles

| Property | Description | Common Values |
|----------|-------------|---------------|
| `background-color` | Background color | #fff, rgba(0,0,0,0.5) |
| `background-image` | Background image | url("image.jpg") |
| `background-repeat` | Background repeat | repeat, no-repeat |
| `background-position` | Background position | center, 10px 20px |
| `background-size` | Background size | cover, contain, 100% |
| `background-attachment` | Background attachment | scroll, fixed |

### Shorthand

```css
background: color image repeat position/size attachment;

/* Example */
background: #f5f5f5 url("bg.jpg") no-repeat center/cover fixed;
```

### Linear Gradient

```css
/* Basic gradient */
background: linear-gradient(to right, red, blue);

/* Multi-color gradient */
background: linear-gradient(45deg, red, yellow, green);

/* With color stops */
background: linear-gradient(to bottom, red 0%, blue 50%, green 100%);
```

### Radial Gradient

```css
background: radial-gradient(circle, red, blue);
background: radial-gradient(ellipse at center, red 0%, blue 100%);
```

## Box Model

```css
.box {
    /* Content area */
    width: 300px;
    height: 200px;
    
    /* Padding */
    padding: 20px;              /* All sides */
    padding: 10px 20px;         /* Top/bottom Left/right */
    padding: 10px 20px 30px 40px; /* Top Right Bottom Left */
    
    /* Border */
    border: 1px solid #ccc;
    border-radius: 8px;         /* Rounded corners */
    
    /* Margin */
    margin: 20px auto;          /* Center horizontally */
}
```

### box-sizing

```css
/* Content box (default) - width/height = content */
box-sizing: content-box;

/* Border box - width/height = content + padding + border */
box-sizing: border-box;  /* Recommended */
```

### Box Shadow

```css
/* Basic shadow */
box-shadow: 2px 2px 4px rgba(0,0,0,0.3);

/* Multiple shadows */
box-shadow: 
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1);

/* Inset shadow */
box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
```

## Float

```css
.left {
    float: left;
}

.right {
    float: right;
}
```

### Clear Float

```css
/* Method 1: Clear property */
.clear {
    clear: both;
}

/* Method 2: Clearfix */
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}

/* Method 3: BFC */
.container {
    overflow: hidden;
}
```

## Positioning

| Value | Description |
|-------|-------------|
| `static` | Default, normal document flow |
| `relative` | Relative to original position |
| `absolute` | Relative to nearest positioned ancestor |
| `fixed` | Relative to viewport |
| `sticky` | Hybrid of relative and fixed |

```css
/* Relative positioning */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* Absolute positioning */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

/* Fixed positioning */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

/* Sticky positioning */
.sticky {
    position: sticky;
    top: 0;
}
```

### Centering Techniques

```css
/* Horizontal center */
.center-x {
    margin: 0 auto;
}

/* Absolute center */
.center-absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Flex center */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

## Flex Layout

### Container Properties

```css
.container {
    display: flex;
    
    /* Main axis direction */
    flex-direction: row;        /* row | row-reverse | column | column-reverse */
    
    /* Wrap items */
    flex-wrap: wrap;            /* nowrap | wrap | wrap-reverse */
    
    /* Shorthand */
    flex-flow: row wrap;
    
    /* Main axis alignment */
    justify-content: center;    /* flex-start | flex-end | center | space-between | space-around | space-evenly */
    
    /* Cross axis alignment */
    align-items: center;        /* flex-start | flex-end | center | stretch | baseline */
    
    /* Multi-line alignment */
    align-content: space-between; /* flex-start | flex-end | center | stretch | space-between | space-around */
    
    /* Gap between items */
    gap: 20px;
    row-gap: 20px;
    column-gap: 10px;
}
```

### Item Properties

```css
.item {
    /* Growth factor */
    flex-grow: 1;               /* 0 = don't grow */
    
    /* Shrink factor */
    flex-shrink: 0;             /* 0 = don't shrink */
    
    /* Base size */
    flex-basis: 200px;
    
    /* Shorthand: grow shrink basis */
    flex: 1 0 200px;
    flex: 1;                    /* Equal distribution */
    
    /* Override align-items for this item */
    align-self: flex-end;       /* auto | flex-start | flex-end | center | stretch */
    
    /* Order (default 0) */
    order: 1;
}
```

### Common Flex Patterns

```css
/* Equal columns */
.equal-columns {
    display: flex;
    gap: 20px;
}
.equal-columns > * {
    flex: 1;
}

/* Sidebar layout */
.sidebar-layout {
    display: flex;
}
.sidebar {
    width: 200px;
    flex-shrink: 0;
}
.main {
    flex: 1;
}

/* Center content */
.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
```

## Grid Layout

### Grid Container

```css
.container {
    display: grid;
    
    /* Define columns */
    grid-template-columns: 200px 1fr 200px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    
    /* Define rows */
    grid-template-rows: 100px 1fr 100px;
    
    /* Gap */
    gap: 20px;
    row-gap: 20px;
    column-gap: 10px;
    
    /* Alignment */
    justify-items: center;      /* Horizontal alignment */
    align-items: center;        /* Vertical alignment */
    place-items: center;        /* Shorthand */
    
    justify-content: center;    /* Container alignment */
    align-content: center;
}
```

### Grid Items

```css
.item {
    /* Position */
    grid-column: 1 / 3;         /* Start at 1, end at 3 */
    grid-column: span 2;        /* Span 2 columns */
    
    grid-row: 1 / 2;
    
    /* Shorthand */
    grid-area: row-start / col-start / row-end / col-end;
    grid-area: 1 / 1 / 2 / 3;
    
    /* Named area */
    grid-area: header;
}
```

### Named Grid Areas

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Transitions & Animations

### Transitions

```css
.box {
    width: 100px;
    height: 100px;
    background: red;
    transition: all 0.3s ease;
    /* Or specify properties */
    transition: width 0.3s ease, height 0.5s linear;
}

.box:hover {
    width: 200px;
    height: 200px;
    background: blue;
}
```

### Transition Properties

| Property | Description |
|----------|-------------|
| `transition-property` | Properties to transition |
| `transition-duration` | Duration |
| `transition-timing-function` | Timing function |
| `transition-delay` | Delay |

### Timing Functions

- `ease` - Slow start, fast middle, slow end
- `linear` - Constant speed
- `ease-in` - Slow start
- `ease-out` - Slow end
- `ease-in-out` - Slow start and end
- `cubic-bezier()` - Custom curve

### Animations

```css
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

.box {
    animation: slideIn 0.5s ease forwards;
    /* Or */
    animation: bounce 1s ease infinite;
}
```

### Animation Properties

| Property | Description |
|----------|-------------|
| `animation-name` | Keyframe name |
| `animation-duration` | Duration |
| `animation-timing-function` | Timing function |
| `animation-delay` | Delay |
| `animation-iteration-count` | Iterations (number/infinite) |
| `animation-direction` | Direction (normal/reverse/alternate) |
| `animation-fill-mode` | Fill mode (forwards/backwards/both) |
| `animation-play-state` | Play state (running/paused) |

### Transform

```css
/* Translate */
transform: translateX(100px);
transform: translateY(-50%);
transform: translate(100px, 50px);

/* Scale */
transform: scale(1.5);
transform: scaleX(2);

/* Rotate */
transform: rotate(45deg);

/* Skew */
transform: skewX(10deg);

/* Multiple transforms */
transform: translateX(100px) rotate(45deg) scale(1.5);

/* 3D transforms */
transform: rotateX(45deg);
transform: rotateY(45deg);
transform: perspective(500px) rotateY(45deg);
```

## CSS3 New Features

### Box Shadow

```css
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.1);
```

### Text Shadow

```css
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
text-shadow: 0 0 10px red, 0 0 20px blue;
```

### Border Radius

```css
border-radius: 8px;
border-radius: 50%;         /* Circle */
border-radius: 10px 20px;   /* Different corners */
```

### CSS Variables

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --spacing: 16px;
}

.button {
    background: var(--primary-color);
    padding: var(--spacing);
}

.button:hover {
    background: var(--secondary-color);
}
```

### Filters

```css
.filter {
    filter: blur(5px);
    filter: brightness(1.5);
    filter: contrast(200%);
    filter: grayscale(100%);
    filter: sepia(100%);
    filter: hue-rotate(90deg);
    filter: invert(100%);
    filter: saturate(200%);
    filter: opacity(50%);
    filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
}
```

### Object Fit

```css
.image {
    width: 100%;
    height: 300px;
    object-fit: cover;          /* Fill while maintaining ratio */
    object-fit: contain;        /* Show full image */
    object-fit: fill;           /* Stretch to fill */
}
```

## Responsive Design

### Media Queries

```css
/* Mobile first approach */
.container {
    width: 100%;
    padding: 16px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}

/* Large screens */
@media (min-width: 1440px) {
    .container {
        width: 1200px;
    }
}
```

### Common Breakpoints

| Device | Width |
|--------|-------|
| Mobile | < 768px |
| Tablet | 768px - 1023px |
| Desktop | 1024px - 1439px |
| Large | >= 1440px |

### Responsive Units

```css
/* rem - relative to root font size */
html { font-size: 16px; }
.box { width: 10rem; }      /* 160px */

/* em - relative to parent */
.parent { font-size: 20px; }
.child { padding: 1em; }    /* 20px */

/* vw/vh - viewport units */
.full-width { width: 100vw; }
.full-height { height: 100vh; }
.half-screen { width: 50vw; }

/* calc() - calculations */
.sidebar { width: calc(100% - 200px); }
```

### Mobile Adaptation

```css
/* Viewport settings (in HTML) */
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* Touch action */
.touch-element {
    touch-action: manipulation; /* Optimize for touch */
}

/* Prevent text zoom on iOS */
input, textarea {
    font-size: 16px;
}

/* Responsive images */
img {
    max-width: 100%;
    height: auto;
}
```

### Container Queries

```css
/* Define container */
.card-container {
    container-type: inline-size;
    container-name: card;
}

/* Query container */
@container card (min-width: 400px) {
    .card {
        display: flex;
    }
}
```
