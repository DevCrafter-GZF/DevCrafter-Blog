# HTML Basics <Badge type="tip" text="HTML5" />

> [!TIP]
> This tutorial covers HTML5 core technologies, from basic tags to semantic markup, multimedia, and form validation.

## 📋 Learning Outline

| Chapter | Content | Duration |
|---------|---------|----------|
| [Basic Tags](#basic-tags) | Text, headings, formatting tags | 15 min |
| [Image Tags](#image-tags) | img attributes, path types | 10 min |
| [Hyperlinks](#hyperlinks) | Link types, target attributes | 10 min |
| [Tables](#tables) | table, cell merging | 15 min |
| [Lists](#lists) | Ordered, unordered, definition lists | 10 min |
| [Forms](#forms) | form attributes, input controls | 20 min |
| [Input Types](#input-types) | Text, select, button, HTML5 new types | 25 min |
| [Semantic Tags](#html5-semantic-tags) | header, nav, main, article, etc. | 15 min |
| [Multimedia](#multimedia-tags) | audio, video tags | 10 min |
| [HTML5 Features](#html5-new-features) | Canvas, local storage, geolocation | 20 min |
| [Document Structure](#html-document-structure) | Complete page structure, meta tags | 10 min |

**Total Estimated Learning Time:** About 2-3 hours

## 🎯 Learning Objectives

After completing this tutorial, you will be able to:

- ✅ Use HTML tags to build web page structures
- ✅ Master the use of images, links, tables, and lists
- ✅ Create various forms for user interaction
- ✅ Use HTML5 semantic tags to optimize structure
- ✅ Embed audio and video multimedia content
- ✅ Understand new features like Canvas and local storage

## 🔗 Related Documentation

- [CSS Basics](../CSS/index.md) - Web page styling
- [JavaScript Complete Guide](../fundamentals/javascript.md) - Web interaction logic
- [DOM Operations](../WebApi/index.md) - Dynamic HTML element manipulation


## Basic Tags

### Text Tags

```html
<!-- Paragraph -->
<p>This is a paragraph</p>

<!-- Headings -->
<h1>Heading Level 1</h1>
<h2>Heading Level 2</h2>
<h3>Heading Level 3</h3>
<h4>Heading Level 4</h4>
<h5>Heading Level 5</h5>
<h6>Heading Level 6</h6>

<!-- Line break -->
<br>

<!-- Horizontal line -->
<hr>

<!-- Text formatting -->
<strong>Bold</strong> or <b>Bold</b>
<em>Italic</em> or <i>Italic</i>
<del>Strikethrough</del> or <s>Strikethrough</s>
<ins>Underline</ins> or <u>Underline</u>

<!-- Containers -->
<div>Block-level container</div>
<span>Inline container</span>
```

## Image Tags

```html
<img src="image-path" alt="alternative-text" title="tooltip-text" width="width" height="height">
```

### Attribute Description

| Attribute | Description |
|-----------|-------------|
| `src` | Image path (required) |
| `alt` | Alternative text when image cannot be displayed |
| `title` | Tooltip text on hover |
| `width` | Image width |
| `height` | Image height |
| `border` | Border thickness |

### Path Types

```html
<!-- Relative paths -->
<img src="image.jpg">           <!-- Same directory -->
<img src="images/image.jpg">    <!-- Subdirectory -->
<img src="../image.jpg">        <!-- Parent directory -->

<!-- Absolute paths -->
<img src="https://example.com/image.jpg">
<img src="/images/image.jpg">
```

## Hyperlinks

```html
<a href="target" target="open-method">Link text</a>
```

### Link Types

```html
<!-- External link -->
<a href="https://www.example.com">External website</a>

<!-- Internal link -->
<a href="about.html">About us</a>

<!-- Empty link -->
<a href="#">Empty link</a>

<!-- Download link -->
<a href="file.zip" download>Download file</a>

<!-- Anchor link -->
<a href="#section1">Jump to Section 1</a>
<h2 id="section1">Section 1</h2>

<!-- Email link -->
<a href="mailto:email@example.com">Send email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call phone</a>
```

### Target Attribute

| Value | Description |
|-------|-------------|
| `_self` | Open in current window (default) |
| `_blank` | Open in new window |
| `_parent` | Open in parent frame |
| `_top` | Open in top-level window |

## Tables

```html
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Total</td>
            <td>100</td>
        </tr>
    </tfoot>
</table>
```

### Table Attributes

| Attribute | Description |
|-----------|-------------|
| `border` | Border thickness |
| `cellspacing` | Cell spacing |
| `cellpadding` | Cell padding |
| `width` | Table width |
| `align` | Alignment |

### Cell Merging

```html
<!-- Rowspan -->
<td rowspan="2">Merge two rows</td>

<!-- Colspan -->
<td colspan="3">Merge three columns</td>
```

## Lists

### Unordered List

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

### Ordered List

```html
<ol>
    <li>Step 1</li>
    <li>Step 2</li>
    <li>Step 3</li>
</ol>

<!-- Specify start number -->
<ol start="5">
    <li>Item 5</li>
    <li>Item 6</li>
</ol>

<!-- Specify number type -->
<ol type="A">
    <li>A. Item 1</li>
    <li>B. Item 2</li>
</ol>
```

### Definition List

```html
<dl>
    <dt>Term 1</dt>
    <dd>Definition 1</dd>
    <dd>Definition 2</dd>
    
    <dt>Term 2</dt>
    <dd>Definition 3</dd>
</dl>
```

## Forms

### Form Basics

```html
<form action="submit-url" method="submit-method" name="form-name">
    <!-- Form elements -->
</form>
```

### Form Attributes

| Attribute | Description |
|-----------|-------------|
| `action` | Form submission URL |
| `method` | Submission method (get/post) |
| `name` | Form name |
| `target` | Opening method after submission |
| `enctype` | Encoding type |

## Input Types

### Text Input

```html
<!-- Single line text -->
<input type="text" placeholder="Please enter">

<!-- Password -->
<input type="password" placeholder="Please enter password">

<!-- Multi-line text -->
<textarea rows="3" cols="20"></textarea>
```

### Selection Types

```html
<!-- Radio buttons -->
<input type="radio" name="gender" value="male" id="male">
<label for="male">Male</label>
<input type="radio" name="gender" value="female" id="female">
<label for="female">Female</label>

<!-- Checkboxes -->
<input type="checkbox" name="hobby" value="reading"> Reading
<input type="checkbox" name="hobby" value="sports"> Sports
<input type="checkbox" name="hobby" value="music"> Music

<!-- Dropdown select -->
<select name="city">
    <option value="">Please select</option>
    <option value="beijing">Beijing</option>
    <option value="shanghai">Shanghai</option>
    <option value="guangzhou">Guangzhou</option>
</select>

<!-- Multi-select dropdown -->
<select name="hobbies" multiple>
    <option value="reading">Reading</option>
    <option value="sports">Sports</option>
</select>
```

### Button Types

```html
<!-- Submit button -->
<input type="submit" value="Submit">
<button type="submit">Submit</button>

<!-- Reset button -->
<input type="reset" value="Reset">
<button type="reset">Reset</button>

<!-- Regular button -->
<input type="button" value="Click">
<button type="button">Click</button>
```

### HTML5 New Input Types

```html
<!-- Email -->
<input type="email" placeholder="Please enter email">

<!-- Number -->
<input type="number" min="0" max="100" step="1">

<!-- Range slider -->
<input type="range" min="0" max="100" value="50">

<!-- Date -->
<input type="date">
<input type="datetime-local">
<input type="month">
<input type="week">
<input type="time">

<!-- Color -->
<input type="color">

<!-- Search -->
<input type="search" placeholder="Search...">

<!-- Telephone -->
<input type="tel" placeholder="Please enter phone">

<!-- URL -->
<input type="url" placeholder="Please enter URL">

<!-- File upload -->
<input type="file">
<input type="file" multiple>  <!-- Multiple files -->
<input type="file" accept=".jpg,.png">  <!-- Restrict types -->

<!-- Hidden field -->
<input type="hidden" name="id" value="123">
```

### Common Input Attributes

| Attribute | Description |
|-----------|-------------|
| `name` | Form field name |
| `value` | Default value |
| `placeholder` | Placeholder hint text |
| `required` | Required field |
| `readonly` | Read-only |
| `disabled` | Disabled |
| `checked` | Default checked (radio/checkbox) |
| `selected` | Default selected (dropdown) |
| `maxlength` | Maximum length |
| `min` / `max` | Minimum/Maximum value |
| `autofocus` | Auto focus |
| `autocomplete` | Auto-complete (on/off) |
| `multiple` | Multiple selection |
| `pattern` | Regex validation |

## HTML5 Semantic Tags

```html
<!-- Page structure -->
<header>Header area</header>
<nav>Navigation links</nav>
<main>Main content</main>
<article>Independent article content</article>
<section>Section or block in document</section>
<aside>Sidebar content</aside>
<footer>Footer area</footer>

<!-- Other semantic tags -->
<figure>
    <img src="image.jpg" alt="Image">
    <figcaption>Image caption</figcaption>
</figure>

<details>
    <summary>Title</summary>
    <p>Detailed content</p>
</details>

<mark>Highlighted text</mark>
<time datetime="2024-01-01">January 1, 2024</time>
<progress value="70" max="100">70%</progress>
<meter value="0.6" min="0" max="1">60%</meter>
```

## Multimedia Tags

### Audio

```html
<audio src="music.mp3" controls autoplay loop muted>
    Your browser does not support audio playback
</audio>

<!-- Multi-format compatibility -->
<audio controls>
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    Your browser does not support audio playback
</audio>
```

### Video

```html
<video src="movie.mp4" controls width="640" height="360" poster="cover.jpg">
    Your browser does not support video playback
</video>

<!-- Multi-format compatibility -->
<video controls width="640">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    Your browser does not support video playback
</video>
```

### Media Attributes

| Attribute | Description |
|-----------|-------------|
| `controls` | Show playback controls |
| `autoplay` | Auto play |
| `loop` | Loop playback |
| `muted` | Muted |
| `preload` | Preload (auto/metadata/none) |
| `poster` | Video cover image |

## HTML5 New Features

### Canvas

```html
<canvas id="myCanvas" width="500" height="300"></canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 100);
    
    // Draw text
    ctx.font = '20px Arial';
    ctx.fillText('Hello Canvas', 10, 150);
</script>
```

### Local Storage

```javascript
// Local storage - persistent
localStorage.setItem('username', 'John');
localStorage.getItem('username');  // 'John'
localStorage.removeItem('username');
localStorage.clear();

// Session storage - cleared when tab closes
sessionStorage.setItem('token', 'abc123');
sessionStorage.getItem('token');  // 'abc123'
```

### Geolocation

```javascript
// Get current position
navigator.geolocation.getCurrentPosition(
    position => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
    },
    error => {
        console.error('Error:', error.message);
    }
);
```

### Drag and Drop

```html
<div draggable="true" ondragstart="drag(event)">Drag me</div>
<div ondrop="drop(event)" ondragover="allowDrop(event)">Drop here</div>

<script>
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
}
</script>
```

## HTML Document Structure

### Complete Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <meta name="author" content="Your Name">
    
    <title>Page Title</title>
    
    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    
    <!-- External CSS -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Internal CSS -->
    <style>
        body {
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </header>
    
    <main>
        <h1>Welcome</h1>
        <p>This is the main content.</p>
    </main>
    
    <footer>
        <p>&copy; 2024 Your Website</p>
    </footer>
    
    <!-- External JavaScript -->
    <script src="script.js"></script>
</body>
</html>
```

### Common Meta Tags

| Meta Tag | Description |
|----------|-------------|
| `charset="UTF-8"` | Character encoding |
| `viewport` | Responsive viewport settings |
| `description` | Page description (SEO) |
| `keywords` | Keywords (SEO) |
| `author` | Author information |
| `robots` | Search engine indexing control |
| `theme-color` | Browser theme color |
| `og:title` | Open Graph title |
| `og:description` | Open Graph description |
| `og:image` | Open Graph image |
