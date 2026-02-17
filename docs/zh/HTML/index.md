# HTML 基础 <Badge type="tip" text="HTML5" />

> [!TIP]
> 本教程涵盖 HTML5 核心技术，从基础标签到语义化、多媒体和表单验证。

## 📋 学习大纲

| 章节 | 内容 | 预计时间 |
|------|------|----------|
| [基础标签](#一-基础标签) | 文本、标题、格式化标签 | 15 分钟 |
| [图像标签](#二-图像标签) | img 属性、路径类型 | 10 分钟 |
| [超链接](#三-超链接) | 链接类型、target 属性 | 10 分钟 |
| [表格](#四-表格) | table、合并单元格 | 15 分钟 |
| [列表](#五-列表) | 有序、无序、自定义列表 | 10 分钟 |
| [表单](#六-表单) | form 属性、输入控件 | 20 分钟 |
| [input 类型](#七-input-类型) | 文本、选择、按钮、HTML5 新类型 | 25 分钟 |
| [语义化标签](#八-html5-语义化标签) | header、nav、main、article 等 | 15 分钟 |
| [多媒体](#九-多媒体标签) | audio、video 标签 | 10 分钟 |
| [HTML5 新特性](#十-html5-新特性) | Canvas、本地存储、地理定位 | 20 分钟 |
| [文档结构](#十一-html-文档结构) | 完整页面结构、meta 标签 | 10 分钟 |

**总预计学习时间：** 约 2-3 小时

## 🎯 学习目标

完成本教程后，你将能够：

- ✅ 使用 HTML 标签构建网页结构
- ✅ 掌握图像、链接、表格、列表的使用
- ✅ 创建各种表单实现用户交互
- ✅ 使用 HTML5 语义化标签优化结构
- ✅ 嵌入音频、视频多媒体内容
- ✅ 了解 Canvas、本地存储等新特性

## 🔗 相关文档

- [CSS 基础](../CSS/index.md) - 网页样式美化
- [JavaScript 完全指南](../fundamentals/javascript.md) - 网页交互逻辑
- [DOM 操作](../WebApi/index.md) - 动态操作 HTML 元素


## 基础标签

### 文本标签

```html
<!-- 段落 -->
<p>这是一个段落</p>

<!-- 标题 -->
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>

<!-- 换行 -->
<br>

<!-- 水平线 -->
<hr>

<!-- 文本格式化 -->
<strong>加粗</strong> 或 <b>加粗</b>
<em>倾斜</em> 或 <i>倾斜</i>
<del>删除线</del> 或 <s>删除线</s>
<ins>下划线</ins> 或 <u>下划线</u>

<!-- 容器 -->
<div>块级容器</div>
<span>行内容器</span>
```

## 图像标签

```html
<img src="图片路径" alt="替代文本" title="提示文本" width="宽度" height="高度">
```

### 属性说明

| 属性 | 说明 |
|------|------|
| `src` | 图片路径（必填） |
| `alt` | 图片无法显示时的替代文本 |
| `title` | 鼠标悬停时的提示文本 |
| `width` | 图片宽度 |
| `height` | 图片高度 |
| `border` | 边框粗细 |

### 路径类型

```html
<!-- 相对路径 -->
<img src="image.jpg">           <!-- 同级目录 -->
<img src="images/image.jpg">    <!-- 下级目录 -->
<img src="../image.jpg">        <!-- 上级目录 -->

<!-- 绝对路径 -->
<img src="https://example.com/image.jpg">
<img src="/images/image.jpg">
```

## 超链接

```html
<a href="跳转目标" target="打开方式">链接文本</a>
```

### 链接类型

```html
<!-- 外部链接 -->
<a href="https://www.example.com">外部网站</a>

<!-- 内部链接 -->
<a href="about.html">关于我们</a>

<!-- 空链接 -->
<a href="#">空链接</a>

<!-- 下载链接 -->
<a href="file.zip" download>下载文件</a>

<!-- 锚点链接 -->
<a href="#section1">跳转到第一节</a>
<h2 id="section1">第一节</h2>

<!-- 邮件链接 -->
<a href="mailto:email@example.com">发送邮件</a>

<!-- 电话链接 -->
<a href="tel:13800138000">拨打电话</a>
```

### target 属性

| 值 | 说明 |
|----|------|
| `_self` | 当前窗口打开（默认） |
| `_blank` | 新窗口打开 |
| `_parent` | 父框架打开 |
| `_top` | 顶层窗口打开 |

## 表格

```html
<table>
    <thead>
        <tr>
            <th>表头1</th>
            <th>表头2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>数据1</td>
            <td>数据2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>总计</td>
            <td>100</td>
        </tr>
    </tfoot>
</table>
```

### 表格属性

| 属性 | 说明 |
|------|------|
| `border` | 边框粗细 |
| `cellspacing` | 单元格间距 |
| `cellpadding` | 单元格内边距 |
| `width` | 表格宽度 |
| `align` | 对齐方式 |

### 合并单元格

```html
<!-- 跨行合并 -->
<td rowspan="2">合并两行</td>

<!-- 跨列合并 -->
<td colspan="3">合并三列</td>
```

## 列表

### 无序列表

```html
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
</ul>
```

### 有序列表

```html
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>

<!-- 指定起始编号 -->
<ol start="5">
    <li>第五项</li>
    <li>第六项</li>
</ol>

<!-- 指定编号类型 -->
<ol type="A">
    <li>A. 第一项</li>
    <li>B. 第二项</li>
</ol>
```

### 自定义列表

```html
<dl>
    <dt>名词1</dt>
    <dd>解释1</dd>
    <dd>解释2</dd>
    
    <dt>名词2</dt>
    <dd>解释3</dd>
</dl>
```

## 表单

### 表单基础

```html
<form action="提交地址" method="提交方法" name="表单名称">
    <!-- 表单元素 -->
</form>
```

### 表单属性

| 属性 | 说明 |
|------|------|
| `action` | 表单提交地址 |
| `method` | 提交方法（get/post） |
| `name` | 表单名称 |
| `target` | 提交后的打开方式 |
| `enctype` | 编码类型 |

## input 类型

### 文本输入

```html
<!-- 单行文本 -->
<input type="text" placeholder="请输入">

<!-- 密码 -->
<input type="password" placeholder="请输入密码">

<!-- 多行文本 -->
<textarea rows="3" cols="20"></textarea>
```

### 选择类型

```html
<!-- 单选按钮 -->
<input type="radio" name="gender" value="male" id="male">
<label for="male">男</label>
<input type="radio" name="gender" value="female" id="female">
<label for="female">女</label>

<!-- 复选框 -->
<input type="checkbox" name="hobby" value="reading"> 阅读
<input type="checkbox" name="hobby" value="sports"> 运动
<input type="checkbox" name="hobby" value="music"> 音乐

<!-- 下拉选择 -->
<select name="city">
    <option value="">请选择</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>

<!-- 多选下拉 -->
<select name="hobbies" multiple>
    <option value="reading">阅读</option>
    <option value="sports">运动</option>
</select>
```

### 按钮类型

```html
<!-- 提交按钮 -->
<input type="submit" value="提交">
<button type="submit">提交</button>

<!-- 重置按钮 -->
<input type="reset" value="重置">
<button type="reset">重置</button>

<!-- 普通按钮 -->
<input type="button" value="点击">
<button type="button">点击</button>
```

### HTML5 新增类型

```html
<!-- 邮箱 -->
<input type="email" placeholder="请输入邮箱">

<!-- 数字 -->
<input type="number" min="0" max="100" step="1">

<!-- 范围滑块 -->
<input type="range" min="0" max="100" value="50">

<!-- 日期 -->
<input type="date">
<input type="datetime-local">
<input type="month">
<input type="week">
<input type="time">

<!-- 颜色 -->
<input type="color">

<!-- 搜索 -->
<input type="search" placeholder="搜索...">

<!-- 电话 -->
<input type="tel" placeholder="请输入电话">

<!-- URL -->
<input type="url" placeholder="请输入网址">

<!-- 文件上传 -->
<input type="file">
<input type="file" multiple>  <!-- 多文件 -->
<input type="file" accept=".jpg,.png">  <!-- 限制类型 -->

<!-- 隐藏域 -->
<input type="hidden" name="id" value="123">
```

### input 常用属性

| 属性 | 说明 |
|------|------|
| `name` | 表单字段名称 |
| `value` | 默认值 |
| `placeholder` | 占位提示文本 |
| `required` | 必填 |
| `readonly` | 只读 |
| `disabled` | 禁用 |
| `checked` | 默认选中（单选/复选） |
| `selected` | 默认选中（下拉） |
| `maxlength` | 最大长度 |
| `min` / `max` | 最小/最大值 |
| `autofocus` | 自动聚焦 |
| `autocomplete` | 自动完成（on/off） |
| `multiple` | 多选 |
| `pattern` | 正则验证 |

## HTML5 语义化标签

```html
<!-- 页面结构 -->
<header>头部区域</header>
<nav>导航链接</nav>
<main>主要内容</main>
<article>独立的文章内容</article>
<section>文档中的节或区块</section>
<aside>侧边栏内容</aside>
<footer>底部区域</footer>

<!-- 其他语义标签 -->
<figure>
    <img src="image.jpg" alt="图片">
    <figcaption>图片标题</figcaption>
</figure>

<details>
    <summary>标题</summary>
    <p>详细内容</p>
</details>

<mark>高亮文本</mark>
<time datetime="2024-01-01">2024年1月1日</time>
<progress value="70" max="100">70%</progress>
<meter value="0.6" min="0" max="1">60%</meter>
```

## 多媒体标签

### 音频

```html
<audio src="music.mp3" controls autoplay loop muted>
    您的浏览器不支持音频播放
</audio>

<!-- 多格式兼容 -->
<audio controls>
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    您的浏览器不支持音频播放
</audio>
```

### 视频

```html
<video src="movie.mp4" controls width="640" height="360" poster="cover.jpg">
    您的浏览器不支持视频播放
</video>

<!-- 多格式兼容 -->
<video controls width="640">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    您的浏览器不支持视频播放
</video>
```

### 媒体属性

| 属性 | 说明 |
|------|------|
| `controls` | 显示控制条 |
| `autoplay` | 自动播放 |
| `loop` | 循环播放 |
| `muted` | 静音 |
| `poster` | 视频封面（视频标签） |
| `preload` | 预加载（auto/metadata/none） |

## HTML5 新特性

### 画布 Canvas

```html
<canvas id="myCanvas" width="500" height="300"></canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // 绘制矩形
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 50);
    
    // 绘制圆形
    ctx.beginPath();
    ctx.arc(150, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
</script>
```

### 本地存储

```javascript
// LocalStorage - 永久存储
localStorage.setItem('key', 'value');
localStorage.getItem('key');
localStorage.removeItem('key');

// SessionStorage - 会话级存储
sessionStorage.setItem('key', 'value');
sessionStorage.getItem('key');
```

### 地理定位

```javascript
navigator.geolocation.getCurrentPosition(
    position => {
        console.log('纬度：', position.coords.latitude);
        console.log('经度：', position.coords.longitude);
    },
    error => {
        console.log('获取位置失败：', error);
    }
);
```

### 拖放 API

```html
<div draggable="true" ondragstart="drag(event)">拖动我</div>
<div ondrop="drop(event)" ondragover="allowDrop(event)">放置区域</div>

<script>
    function drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    }
    
    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData('text');
        ev.target.appendChild(document.getElementById(data));
    }
</script>
```

## 特殊字符

| 字符 | 实体名称 | 实体编号 |
|------|----------|----------|
| 空格 | `&nbsp;` | `&#160;` |
| < | `&lt;` | `&#60;` |
| > | `&gt;` | `&#62;` |
| & | `&amp;` | `&#38;` |
| " | `&quot;` | `&#34;` |
| ' | `&apos;` | `&#39;` |
| © | `&copy;` | `&#169;` |
| ® | `&reg;` | `&#174;` |
| ¥ | `&yen;` | `&#165;` |
| € | `&euro;` | `&#8364;` |
| × | `&times;` | `&#215;` |
| ÷ | `&divide;` | `&#247;` |

## HTML 文档结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="页面描述">
    <meta name="keywords" content="关键词">
    <title>页面标题</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="favicon.ico">
</head>
<body>
    <!-- 页面内容 -->
    
    <script src="script.js"></script>
</body>
</html>
```

### Meta 标签

```html
<!-- 字符编码 -->
<meta charset="UTF-8">

<!-- 视口设置（响应式必备） -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 页面描述 -->
<meta name="description" content="页面描述，用于搜索引擎">

<!-- 关键词 -->
<meta name="keywords" content="关键词1, 关键词2">

<!-- 作者 -->
<meta name="author" content="作者名">

<!-- 刷新页面 -->
<meta http-equiv="refresh" content="30">

<!-- 禁止缓存 -->
<meta http-equiv="Cache-Control" content="no-cache">

<!-- IE 兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

## Link 标签

```html
<!-- 引入 CSS -->
<link rel="stylesheet" href="style.css">

<!-- 网站图标 -->
<link rel="icon" type="image/x-icon" href="favicon.ico">

<!-- 预加载 -->
<link rel="preload" href="font.woff2" as="font">

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//example.com">

<!-- 样式备用 -->
<link rel="alternate stylesheet" href="dark.css" title="Dark">
```
