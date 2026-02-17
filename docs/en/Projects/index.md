# Project Cases <Badge type="tip" text="Practice" />

> [!TIP]
> Learn frontend development through real-world project cases, covering complete project practice with Vue 2/3, React, Node.js and other tech stacks.

## 📋 Project List

| Project Name | Tech Stack | Difficulty | Highlights |
|--------------|------------|------------|------------|
| [NetEase Cloud Music](./music-app.md) | Vue 2 + Vant + Axios | ⭐⭐⭐ | Music playback, search, recommended playlists |
| [Admin System](./admin-system.md) | Vue 3 + Element Plus + TS | ⭐⭐⭐ | Permission management, data visualization |
| [React Mall](#react-mall-case) | React + Redux + Ant Design | ⭐⭐⭐ | Shopping cart, order management |
| [Node.js API](#nodejs-api-service) | Express + MySQL + JWT | ⭐⭐⭐ | RESTful API, authentication |

## 🎯 Learning Goals

Through learning project cases, you will be able to:

- ✅ Master the complete project development process
- ✅ Learn component-based development and code organization
- ✅ Understand front-end and back-end separation architecture
- ✅ Master state management and routing configuration
- ✅ Learn API encapsulation and error handling

## 🔗 Related Documents

- [Vue Complete Guide](../frameworks/vue.md) - Vue 2/3 Options + Composition API
- [React](../React/index.md) - React Framework
- [Node.js](../Node/index.md) - Backend Development
- [TypeScript Complete Guide](../frameworks/typescript.md) - TS Type System


## NetEase Cloud Music Case

Detailed tutorial: [NetEase Cloud Music Project](./music-app.md)

### Project Overview

Mobile music playback app developed based on Vue 2 + Vant, including:

- Recommended playlist display
- Music search (debounce optimization)
- Song playback
- Lyrics display


## Admin System Case

Detailed tutorial: [Admin System Project](./admin-system.md)

### Project Overview

Enterprise-level admin management system developed based on Vue 3 + Element Plus + TypeScript, including:

- Permission management (RBAC)
- Data visualization (ECharts)
- Dynamic routing
- User/Role/Menu management


## React Mall Case

### Tech Stack

- Vue 2
- Vue Router
- Axios
- Vant UI
- PostCSS

### Project Setup

```bash
# Create project
vue create music-app

# Install dependencies
yarn add axios vant vue-router
yarn add babel-plugin-import -D
yarn add postcss postcss-pxtorem@5.1.1 -D
```

### Vant On-demand Import Configuration

```javascript
// babel.config.js
module.exports = {
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
};
```

### PostCSS Configuration

```javascript
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 37.5,  // Design draft width / 10
            propList: ['*']
        }
    }
};
```

### Routing Configuration

```javascript
// router/index.js
const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'home',
                component: Home,
                meta: { title: 'Home' }
            },
            {
                path: 'search',
                component: Search,
                meta: { title: 'Search' }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
];
```

### Network Request Encapsulation

```javascript
// utils/request.js
import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
});

// Request interceptor
request.interceptors.request.use(config => {
    // Add token, etc.
    return config;
});

// Response interceptor
request.interceptors.response.use(
    response => response.data,
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export default request;
```

### API Encapsulation

```javascript
// api/music.js
import request from '@/utils/request';

export const getRecommendList = () => {
    return request.get('/personalized');
};

export const getHotSearch = () => {
    return request.get('/search/hot');
};

export const searchMusic = (keywords) => {
    return request.get('/search', {
        params: { keywords }
    });
};
```

### Home Recommended Playlists

```vue
<template>
  <div class="home">
    <!-- Carousel -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.pic" />
      </van-swipe-item>
    </van-swipe>
    
    <!-- Recommended Playlists -->
    <van-cell title="Recommended Playlists" />
    <van-row gutter="10">
      <van-col span="8" v-for="item in recommendList" :key="item.id">
        <div class="playlist-item" @click="goDetail(item.id)">
          <img :src="item.picUrl" />
          <p>{{ item.name }}</p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getBanner, getRecommendList } from '@/api/music';

export default {
    data() {
        return {
            banners: [],
            recommendList: []
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            const bannerRes = await getBanner();
            this.banners = bannerRes.banners;
            
            const recommendRes = await getRecommendList();
            this.recommendList = recommendRes.result.slice(0, 6);
        },
        goDetail(id) {
            this.$router.push(`/playlist/${id}`);
        }
    }
};
</script>
```

### Search Function (Debounce)

```vue
<template>
  <div class="search">
    <van-search
      v-model="keyword"
      placeholder="Please enter search keywords"
      @input="onInput"
    />
    
    <!-- Hot Search -->
    <div class="hot-search" v-if="!keyword">
      <h3>Hot Search</h3>
      <div 
        class="hot-item" 
        v-for="(item, index) in hotList" 
        :key="index"
        @click="search(item.first)"
      >
        <span :class="{ top: index < 3 }">{{ index + 1 }}</span>
        <span>{{ item.first }}</span>
      </div>
    </div>
    
    <!-- Search Results -->
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="No more"
      @load="onLoad"
    >
      <van-cell 
        v-for="item in searchResults" 
        :key="item.id"
        :title="item.name"
        :label="item.artists[0].name"
        @click="play(item.id)"
      />
    </van-list>
  </div>
</template>

<script>
import { getHotSearch, searchMusic } from '@/api/music';

export default {
    data() {
        return {
            keyword: '',
            hotList: [],
            searchResults: [],
            loading: false,
            finished: false,
            timer: null
        };
    },
    created() {
        this.loadHotSearch();
    },
    methods: {
        async loadHotSearch() {
            const res = await getHotSearch();
            this.hotList = res.result.hots;
        },
        onInput() {
            // Debounce processing
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (this.keyword) {
                    this.search(this.keyword);
                }
            }, 500);
        },
        async search(keyword) {
            this.keyword = keyword;
            const res = await searchMusic(keyword);
            this.searchResults = res.result.songs;
        },
        onLoad() {
            // Load more
            this.loading = false;
        },
        play(id) {
            this.$router.push(`/play?id=${id}`);
        }
    }
};
</script>
```

## Big Event Case

### Tech Stack

- jQuery
- Layui
- Ajax
- Rich text editor

### Page Navigation

```javascript
// Jump to homepage
location.href = 'index.html';

// Using jQuery
$(location).attr('href', 'index.html');
```

### Ajax Preprocessing

```javascript
// Unified processing before sending requests
$.ajaxPrefilter(function(options) {
    // Unified add baseURL
    options.url = 'http://localhost:3000' + options.url;
    
    // Unified add request headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        };
    }
});
```

### Form Operations

```javascript
// Get form data
var data = $(this).serialize();
// Result: name=value&password=value

// Get single field
var password = $('#form_reg [name=password]').val().trim();

// Attribute selector
$('[name=password]');  // Select elements with name attribute as password

// Reset form
$('.layui-form')[0].reset();
```

### File Upload

```javascript
// Listen for file selection
$('#file').on('change', function(e) {
    var file = e.target.files[0];
    
    // Create temporary URL
    var imgURL = URL.createObjectURL(file);
    
    // Preview image
    $('#preview').attr('src', imgURL);
});

// FormData upload
var formData = new FormData();
formData.append('file', file);

$.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function(res) {
        console.log(res.url);
    }
});
```

### Rich Text Editor

```html
<!-- Import -->
<link rel="stylesheet" href="/assets/lib/tinymce/skins/ui/oxide/skin.min.css">
<script src="/assets/lib/tinymce/tinymce.min.js"></script>

<!-- Use -->
<textarea id="editor"></textarea>

<script>
tinymce.init({
    selector: '#editor',
    language: 'zh_CN',
    plugins: 'lists link image',
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright'
});

// Get content
tinymce.activeEditor.getContent();

// Set content
tinymce.activeEditor.setContent('content');
</script>
```

## E-commerce Admin Backend API

### Interface Specification

```
Base URL: http://localhost:8888/api/private/v1/
```

### Login Interface

```javascript
// POST /login
{
    "username": "admin",
    "password": "123456"
}

// Response
{
    "data": {
        "token": "Bearer xxx"
    },
    "meta": {
        "msg": "Login successful",
        "status": 200
    }
}
```

### User Management Interface

```javascript
// Get user list
// GET /users?query=&pagenum=1&pagesize=10

// Add user
// POST /users
{
    "username": "newuser",
    "password": "123456",
    "email": "user@example.com",
    "mobile": "13800138000"
}

// Modify user status
// PUT /users/:id/state/:type

// Delete user
// DELETE /users/:id
```

### Permission Management Interface

```javascript
// Get permission list
// GET /rights/list

// Get role list
// GET /roles

// Assign permissions
// POST /roles/:id/rights
{
    "rids": "101,102,103"
}
```

### Product Management Interface

```javascript
// Get product list
// GET /goods?query=&pagenum=1&pagesize=10

// Add product
// POST /goods
{
    "goods_name": "Product Name",
    "goods_price": 99.99,
    "goods_number": 100,
    "goods_weight": 1,
    "goods_introduce": "Product introduction",
    "pics": [],
    "attrs": []
}

// Upload image
// POST /upload
// Content-Type: multipart/form-data
```

## Project Development Standards

### Directory Structure

```
project/
├── public/              # Static resources
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/             # API encapsulation
│   ├── assets/          # Static resources
│   ├── components/      # Common components
│   ├── router/          # Routing configuration
│   ├── store/           # State management
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Folder | Lowercase, hyphen for multiple words | `user-management` |
| Component | PascalCase | `UserList.vue` |
| JS File | camelCase | `userService.js` |
| Constant | UPPER_SNAKE_CASE | `MAX_COUNT` |
| Variable/Function | camelCase | `getUserList` |
| Class | PascalCase | `UserService` |

### Git Commit Standards

```
feat: New feature
fix: Bug fix
docs: Documentation update
style: Code formatting (no functional changes)
refactor: Refactoring
test: Test related
chore: Build/tool related
```

```bash
# Examples
git commit -m "feat: Add user login feature"
git commit -m "fix: Fix homepage carousel display issue"
git commit -m "docs: Update API documentation"
```
