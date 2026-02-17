# Web API - DOM Manipulation <Badge type="tip" text="DOM" />

> [!TIP]
> DOM manipulation is the core of JavaScript interacting with web pages. Mastering DOM manipulation enables dynamic web effects.

## 📋 Learning Outline

| Chapter | Content | Difficulty |
|---------|---------|------------|
| [Get Elements](#getting-dom-elements) | getElementById, querySelector, etc. | ⭐ |
| [Event Basics](#event-basics) | Event three elements, binding methods | ⭐⭐ |
| [Manipulate Content](#manipulating-element-content) | innerText, innerHTML, form value | ⭐⭐ |
| [Manipulate Attributes](#manipulating-element-attributes) | Standard attributes, data-*, get/setAttribute | ⭐⭐ |
| [Manipulate Styles](#manipulating-element-styles) | style, className, classList | ⭐⭐ |
| [Node Operations](#node-operations) | Create, add, delete, clone nodes | ⭐⭐⭐ |
| [Event Object](#event-object) | event properties, prevent default/bubbling | ⭐⭐⭐ |
| [Event Delegation](#event-delegation) | Principle and application scenarios | ⭐⭐⭐ |
| [BOM Operations](#bom-operations) | window, location, history | ⭐⭐ |
| [Local Storage](#local-storage) | localStorage, sessionStorage | ⭐⭐ |

## 🎯 Prerequisites

Before learning this tutorial, it is recommended to master:

- [HTML Basics](../HTML/index.md) - Web page structure
- [JavaScript Complete Guide](../fundamentals/javascript.md) - JS syntax basics

## 🎯 Learning Goals

After completing this tutorial, you will be able to:

- ✅ Get and manipulate DOM elements
- ✅ Handle various user events
- ✅ Dynamically modify element content and styles
- ✅ Use local storage to save data
- ✅ Implement common interaction effects

## 🔗 Related Documents

- [JavaScript Complete Guide](../fundamentals/javascript.md) - JavaScript syntax
- [Vue Complete Guide](../frameworks/vue.md) - Virtual DOM comparison


## Getting DOM Elements

### 1. Get by ID

```javascript
const element = document.getElementById('id');
```

### 2. Get by Tag Name

```javascript
// Returns HTMLCollection (pseudo-array)
const elements = document.getElementsByTagName('div');
```

### 3. Get by Class Name

```javascript
// Returns HTMLCollection (pseudo-array)
const elements = document.getElementsByClassName('class-name');
```

### 4. Get by Selector

```javascript
// Returns first matching element
const element = document.querySelector('.box');
const element = document.querySelector('#id');
const element = document.querySelector('ul li');

// Returns all matching elements (NodeList)
const elements = document.querySelectorAll('.item');
```

### 5. Get Special Elements

```javascript
// Get body
document.body;

// Get html
document.documentElement;

// Get head
document.head;

// Get title
document.title;
```

## Event Basics

### Event Three Elements

1. **Event Source**: The element being operated on
2. **Event Type**: User operation (e.g., click)
3. **Event Handler**: The code to be executed

### Binding Events

```javascript
// Method 1: DOM Level 0 event
btn.onclick = function() {
    console.log('Clicked');
};

// Method 2: DOM Level 2 event (recommended)
btn.addEventListener('click', function() {
    console.log('Clicked');
});

// Remove event
btn.removeEventListener('click', fn);
```

### Common Event Types

| Event | Description |
|-------|-------------|
| `click` | Click |
| `dblclick` | Double click |
| `mouseenter` | Mouse enter |
| `mouseleave` | Mouse leave |
| `mousemove` | Mouse move |
| `mousedown` | Mouse down |
| `mouseup` | Mouse up |
| `keydown` | Key down |
| `keyup` | Key up |
| `focus` | Get focus |
| `blur` | Lose focus |
| `input` | Input |
| `change` | Content change |
| `submit` | Form submit |
| `load` | Load complete |
| `resize` | Window resize |
| `scroll` | Scroll |

## Manipulating Element Content

### innerText and innerHTML

```javascript
// Get content
const text = element.innerText;    // Plain text
const html = element.innerHTML;    // Contains HTML

// Set content
element.innerText = 'Plain text content';   // Does not parse HTML
element.innerHTML = '<b>Bold</b>'; // Parses HTML
```

### Form Element Operations

```javascript
// Get value
const value = input.value;

// Set value
input.value = 'new value';

// Disable element
input.disabled = true;

// Checked status
checkbox.checked = true;

// Form reset
form.reset();
```

## Manipulating Element Attributes

### Standard Attributes

```javascript
// Get attribute
const src = img.src;
const href = link.href;

// Set attribute
img.src = 'new.jpg';
link.href = 'https://example.com';

// Custom attributes (data-*)
element.dataset.id = '123';
const id = element.dataset.id;
```

### getAttribute / setAttribute

```javascript
// Get any attribute
const value = element.getAttribute('data-id');

// Set any attribute
element.setAttribute('data-id', '123');

// Remove attribute
element.removeAttribute('data-id');

// Check if attribute exists
element.hasAttribute('data-id');
```

## Manipulating Element Styles

### style Property

```javascript
// Set single style
element.style.color = 'red';
element.style.fontSize = '20px';
element.style.backgroundColor = '#f0f0f0';

// Set multiple styles
element.style.cssText = 'color: red; font-size: 20px;';

// Get style (only inline styles)
const color = element.style.color;
```

### className

```javascript
// Set class (overwrites)
element.className = 'box active';

// Get class
const className = element.className;
```

### classList (Recommended)

```javascript
// Add class
element.classList.add('active');

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active');

// Check if class exists
element.classList.contains('active');

// Replace class
element.classList.replace('old', 'new');
```

## Node Operations

### Create Node

```javascript
// Create element
const div = document.createElement('div');

// Create text node
const text = document.createTextNode('Hello');

// Create document fragment
const fragment = document.createDocumentFragment();
```

### Add Node

```javascript
// Append to end
parent.appendChild(child);

// Insert before reference node
parent.insertBefore(newNode, referenceNode);

// Append (newer method, can append multiple)
parent.append(node1, node2);

// Prepend
parent.prepend(node);
```

### Delete Node

```javascript
// Remove child node
parent.removeChild(child);

// Remove self (newer method)
element.remove();
```

### Clone Node

```javascript
// Shallow clone (no child nodes)
const clone = element.cloneNode();

// Deep clone (includes child nodes)
const deepClone = element.cloneNode(true);
```

## Event Object

### Event Object Properties

```javascript
element.addEventListener('click', function(event) {
    // event is the event object
    console.log(event.type);      // Event type
    console.log(event.target);    // Triggered element
    console.log(event.currentTarget); // Bound element
    console.log(event.clientX);   // Mouse X coordinate
    console.log(event.clientY);   // Mouse Y coordinate
    console.log(event.key);       // Keyboard key
});
```

### Prevent Default

```javascript
// Prevent default behavior
link.addEventListener('click', function(e) {
    e.preventDefault();
});

// Prevent form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle form data
});
```

### Stop Propagation

```javascript
// Stop event bubbling
child.addEventListener('click', function(e) {
    e.stopPropagation();
});
```

## Event Delegation

### Principle

Use event bubbling to bind events to parent elements, reducing the number of event listeners.

```javascript
// Without delegation - bind event to each li
const lis = document.querySelectorAll('li');
lis.forEach(li => {
    li.addEventListener('click', function() {
        console.log(this.innerText);
    });
});

// With delegation - bind event to parent ul
const ul = document.querySelector('ul');
ul.addEventListener('click', function(e) {
    // Check if clicked element is li
    if (e.target.tagName === 'LI') {
        console.log(e.target.innerText);
    }
});
```

## BOM Operations

### window Object

```javascript
// Window size
window.innerWidth;   // Viewport width
window.innerHeight;  // Viewport height

// Open new window
window.open('https://example.com', '_blank');

// Close window
window.close();

// Scroll
window.scrollTo(0, 100);
window.scrollBy(0, 50);

// Timer
const timer = setTimeout(() => {}, 1000);
clearTimeout(timer);

const interval = setInterval(() => {}, 1000);
clearInterval(interval);
```

### location Object

```javascript
// Get URL info
location.href;      // Full URL
location.protocol;  // Protocol
location.host;      // Host
location.hostname;  // Hostname
location.port;      // Port
location.pathname;  // Path
location.search;    // Query string
location.hash;      // Hash

// Navigation
location.href = 'https://example.com';
location.assign('https://example.com');
location.replace('https://example.com'); // No history
location.reload();   // Refresh
location.reload(true); // Force refresh
```

### history Object

```javascript
// Back
history.back();

// Forward
history.forward();

// Go
history.go(-1);  // Back one page
history.go(1);   // Forward one page

// History length
history.length;
```

## Local Storage

### localStorage

```javascript
// Store data (persists after browser close)
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify({name: 'Tom', age: 18}));

// Get data
const value = localStorage.getItem('key');
const user = JSON.parse(localStorage.getItem('user'));

// Remove data
localStorage.removeItem('key');

// Clear all
localStorage.clear();

// Get key by index
const key = localStorage.key(0);

// Get count
const count = localStorage.length;
```

### sessionStorage

```javascript
// Store data (cleared when browser closes)
sessionStorage.setItem('key', 'value');

// Other methods same as localStorage
sessionStorage.getItem('key');
sessionStorage.removeItem('key');
sessionStorage.clear();
```

### Storage Event

```javascript
// Listen for storage changes (triggered in other pages)
window.addEventListener('storage', function(e) {
    console.log(e.key);      // Changed key
    console.log(e.oldValue); // Old value
    console.log(e.newValue); // New value
    console.log(e.url);      // Page URL
});
```
