# Web API - DOM 操作 <Badge type="tip" text="DOM" />

> [!TIP]
> DOM 操作是 JavaScript 与网页交互的核心，掌握 DOM 操作可以实现动态网页效果。

## 📋 学习大纲

| 章节 | 内容 | 难度 |
|------|------|------|
| [获取元素](#一-获取-dom-元素) | getElementById、querySelector 等 | ⭐ |
| [事件基础](#二-事件基础) | 事件三要素、绑定方式 | ⭐⭐ |
| [操作内容](#三-操作元素内容) | innerText、innerHTML、表单 value | ⭐⭐ |
| [操作属性](#四-操作元素属性) | 标准属性、data-*、get/setAttribute | ⭐⭐ |
| [操作样式](#五-操作元素样式) | style、className、classList | ⭐⭐ |
| [节点操作](#六-节点操作) | 创建、添加、删除、克隆节点 | ⭐⭐⭐ |
| [事件对象](#七-事件对象) | event 属性、阻止默认/冒泡 | ⭐⭐⭐ |
| [事件委托](#八-事件委托) | 原理和应用场景 | ⭐⭐⭐ |
| [BOM 操作](#九-bom-操作) | window、location、history | ⭐⭐ |
| [本地存储](#十-本地存储) | localStorage、sessionStorage | ⭐⭐ |
| [元素尺寸位置](#十一-元素尺寸与位置) | clientWidth、offsetWidth、getBoundingClientRect | ⭐⭐⭐ |

## 🎯 前置知识

学习本教程前，建议先掌握：

- [HTML 基础](../HTML/index.md) - 网页结构
- [JavaScript 完全指南](../fundamentals/javascript.md) - JS 语法基础

## 🎯 学习目标

完成本教程后，你将能够：

- ✅ 获取和操作 DOM 元素
- ✅ 处理各种用户事件
- ✅ 动态修改元素内容和样式
- ✅ 使用本地存储保存数据
- ✅ 实现常见的交互效果

## 🔗 相关文档

- [JavaScript 完全指南](../fundamentals/javascript.md) - JavaScript 语法
- [Vue 完全指南](../frameworks/vue.md) - 虚拟 DOM 对比


## 获取 DOM 元素

### 1. 根据 ID 获取

```javascript
const element = document.getElementById('id');
```

### 2. 根据标签名获取

```javascript
// 返回 HTMLCollection（伪数组）
const elements = document.getElementsByTagName('div');
```

### 3. 根据类名获取

```javascript
// 返回 HTMLCollection（伪数组）
const elements = document.getElementsByClassName('class-name');
```

### 4. 使用选择器获取

```javascript
// 返回第一个匹配的元素
const element = document.querySelector('.box');
const element = document.querySelector('#id');
const element = document.querySelector('ul li');

// 返回所有匹配的元素（NodeList）
const elements = document.querySelectorAll('.item');
```

### 5. 特殊元素获取

```javascript
// 获取 body
document.body;

// 获取 html
document.documentElement;

// 获取 head
document.head;

// 获取 title
document.title;
```

## 事件基础

### 事件三要素

1. **事件源**：被操作的元素
2. **事件类型**：用户操作（如 click）
3. **事件处理程序**：执行的代码

### 绑定事件

```javascript
// 方式1：DOM0 级事件
btn.onclick = function() {
    console.log('点击了');
};

// 方式2：DOM2 级事件（推荐）
btn.addEventListener('click', function() {
    console.log('点击了');
});

// 移除事件
btn.removeEventListener('click', fn);
```

### 常用事件类型

| 事件 | 说明 |
|------|------|
| `click` | 点击 |
| `dblclick` | 双击 |
| `mouseenter` | 鼠标移入 |
| `mouseleave` | 鼠标移出 |
| `mousemove` | 鼠标移动 |
| `mousedown` | 鼠标按下 |
| `mouseup` | 鼠标释放 |
| `keydown` | 键盘按下 |
| `keyup` | 键盘释放 |
| `focus` | 获得焦点 |
| `blur` | 失去焦点 |
| `input` | 输入 |
| `change` | 内容改变 |
| `submit` | 表单提交 |
| `load` | 加载完成 |
| `resize` | 窗口大小改变 |
| `scroll` | 滚动 |

## 操作元素内容

### innerText 和 innerHTML

```javascript
// 获取内容
const text = element.innerText;    // 纯文本
const html = element.innerHTML;    // 包含 HTML

// 设置内容
element.innerText = '纯文本内容';   // 不解析 HTML
element.innerHTML = '<b>加粗</b>'; // 解析 HTML
```

### 表单元素操作

```javascript
// 获取值
const value = input.value;

// 设置值
input.value = '新值';

// 禁用元素
input.disabled = true;

// 选中状态
checkbox.checked = true;

// 表单重置
form.reset();
```

## 操作元素属性

### 标准属性

```javascript
// 获取属性
const src = img.src;
const href = link.href;

// 设置属性
img.src = 'new.jpg';
link.href = 'https://example.com';

// 自定义属性（data-*）
element.dataset.id = '123';
const id = element.dataset.id;
```

### getAttribute / setAttribute

```javascript
// 获取任意属性
const value = element.getAttribute('data-id');

// 设置任意属性
element.setAttribute('data-id', '123');

// 移除属性
element.removeAttribute('data-id');
```

## 操作元素样式

### style 属性

```javascript
// 设置样式（行内样式）
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '16px';

// 注意：CSS 属性名转为驼峰命名
// background-color → backgroundColor
// font-size → fontSize
```

### className

```javascript
// 设置类名（会覆盖原有类名）
element.className = 'new-class';

// 保留原有类名
element.className += ' new-class';
```

### classList（推荐）

```javascript
// 添加类名
element.classList.add('active');

// 移除类名
element.classList.remove('active');

// 切换类名
element.classList.toggle('active');

// 判断是否包含类名
const hasClass = element.classList.contains('active');

// 替换类名
element.classList.replace('old', 'new');
```

## 节点操作

### 创建节点

```javascript
// 创建元素节点
const div = document.createElement('div');

// 创建文本节点
const text = document.createTextNode('文本内容');
```

### 添加节点

```javascript
// 末尾追加
parent.appendChild(child);

// 插入到指定位置
parent.insertBefore(newChild, referenceChild);

// 现代方法（推荐）
parent.append(child);           // 末尾添加
parent.prepend(child);          // 开头添加
referenceElement.before(child); // 前面插入
referenceElement.after(child);  // 后面插入
```

### 删除节点

```javascript
// 删除子节点
parent.removeChild(child);

// 现代方法（推荐）
element.remove();
```

### 克隆节点

```javascript
// 浅克隆（只克隆节点本身）
const clone = element.cloneNode();

// 深克隆（克隆节点及其所有子节点）
const deepClone = element.cloneNode(true);
```

### 替换节点

```javascript
parent.replaceChild(newChild, oldChild);
```

## 事件对象

### 常用属性

```javascript
element.addEventListener('click', function(event) {
    // 事件类型
    event.type;        // 'click'
    
    // 目标元素
    event.target;
    
    // 当前元素
    event.currentTarget;
    
    // 鼠标坐标
    event.clientX;     // 相对于视口
    event.clientY;
    event.pageX;       // 相对于页面
    event.pageY;
    event.offsetX;     // 相对于元素
    event.offsetY;
    
    // 键盘按键
    event.key;         // 按键名称
    event.keyCode;     // 按键编码（已废弃）
    event.code;        // 物理按键
    
    // 是否按下修饰键
    event.ctrlKey;
    event.shiftKey;
    event.altKey;
    event.metaKey;
});
```

### 阻止默认行为

```javascript
link.addEventListener('click', function(e) {
    e.preventDefault();  // 阻止默认行为
});
```

### 阻止事件冒泡

```javascript
child.addEventListener('click', function(e) {
    e.stopPropagation();  // 阻止事件冒泡
});
```

## 事件委托

```javascript
// 给父元素绑定事件，利用事件冒泡处理子元素事件
ul.addEventListener('click', function(e) {
    // 判断点击的是否是 li
    if (e.target.tagName === 'LI') {
        console.log('点击了：', e.target.innerText);
    }
});
```

## BOM 操作

### window 对象

```javascript
// 窗口大小
window.innerWidth;   // 视口宽度
window.innerHeight;  // 视口高度

// 打开新窗口
window.open('https://example.com', '_blank');

// 关闭窗口
window.close();

// 对话框
window.alert('提示');
window.confirm('确认？');  // 返回布尔值
window.prompt('请输入：'); // 返回输入值

// 定时器
const timer1 = window.setTimeout(fn, 1000);    // 延迟执行
const timer2 = window.setInterval(fn, 1000);   // 定时执行

// 清除定时器
window.clearTimeout(timer1);
window.clearInterval(timer2);

// 滚动
window.scrollTo(x, y);
window.scrollBy(dx, dy);
```

### location 对象

```javascript
// 完整 URL
location.href;

// 协议
location.protocol;  // 'https:'

// 主机名
location.hostname;  // 'example.com'

// 端口
location.port;      // '8080'

// 路径
location.pathname;  // '/path/page'

// 查询参数
location.search;    // '?id=1&name=zhang'

// 哈希
location.hash;      // '#section1'

// 跳转页面
location.href = 'https://example.com';
location.assign('https://example.com');
location.replace('https://example.com');  // 不保留历史记录

// 刷新页面
location.reload();       // 正常刷新
location.reload(true);   // 强制刷新
```

### history 对象

```javascript
// 后退
history.back();
history.go(-1);

// 前进
history.forward();
history.go(1);

// 跳转到指定历史记录
history.go(-2);

// 历史记录数量
history.length;

// HTML5 History API
history.pushState(state, title, url);    // 添加历史记录
history.replaceState(state, title, url); // 替换当前历史记录
```

### navigator 对象

```javascript
// 浏览器信息
navigator.userAgent;

// 是否在线
navigator.onLine;

// 获取地理位置
navigator.geolocation.getCurrentPosition(
    position => console.log(position.coords),
    error => console.log(error)
);
```

### screen 对象

```javascript
// 屏幕宽度
screen.width;

// 屏幕高度
screen.height;

// 可用宽度（除去任务栏）
screen.availWidth;

// 可用高度
screen.availHeight;

// 色深
screen.colorDepth;
```

## 本地存储

### localStorage

```javascript
// 存储数据（永久保存）
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify({ name: '张三' }));

// 获取数据
const value = localStorage.getItem('key');
const user = JSON.parse(localStorage.getItem('user'));

// 删除数据
localStorage.removeItem('key');

// 清空所有
localStorage.clear();

// 获取键名
localStorage.key(index);

// 存储数量
localStorage.length;
```

### sessionStorage

```javascript
// 用法与 localStorage 相同，但页面关闭后数据清除
sessionStorage.setItem('key', 'value');
sessionStorage.getItem('key');
sessionStorage.removeItem('key');
sessionStorage.clear();
```

## 元素尺寸与位置

### 元素尺寸

```javascript
// 内容尺寸（不含边框）
element.clientWidth;   // 内容宽度 + padding
element.clientHeight;  // 内容高度 + padding

// 包含边框的尺寸
element.offsetWidth;   // 内容 + padding + border
element.offsetHeight;  // 内容 + padding + border

// 滚动尺寸
element.scrollWidth;   // 滚动内容宽度
element.scrollHeight;  // 滚动内容高度
element.scrollTop;     // 垂直滚动距离
element.scrollLeft;    // 水平滚动距离
```

### 元素位置

```javascript
// 相对于 offsetParent 的位置
element.offsetTop;
element.offsetLeft;

// 相对于视口的位置（getBoundingClientRect）
const rect = element.getBoundingClientRect();
rect.top;      // 上边界距离视口顶部
rect.left;     // 左边界距离视口左边
rect.right;    // 右边界距离视口左边
rect.bottom;   // 下边界距离视口顶部
rect.width;    // 元素宽度
rect.height;   // 元素高度
rect.x;        // 同 left
rect.y;        // 同 top
```
