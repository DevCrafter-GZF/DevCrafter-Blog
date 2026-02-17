# 项目案例 <Badge type="tip" text="实战" />

> [!TIP]
> 通过真实项目案例学习前端开发，涵盖 Vue 2/3、React、Node.js 等技术栈的完整项目实战。

## 📋 项目列表

| 项目名称 | 技术栈 | 难度 | 功能亮点 |
|----------|--------|------|----------|
| [网易云音乐](./music-app.md) | Vue 2 + Vant + Axios | ⭐⭐⭐ | 音乐播放、搜索、推荐歌单 |
| [后台管理系统](./admin-system.md) | Vue 3 + Element Plus + TS | ⭐⭐⭐ | 权限管理、数据可视化 |
| [React 商城](#react-商城案例) | React + Redux + Ant Design | ⭐⭐⭐ | 购物车、订单管理 |
| [Node.js API](#nodejs-api-服务) | Express + MySQL + JWT | ⭐⭐⭐ | RESTful API、认证授权 |

## 🎯 学习目标

通过学习项目案例，你将能够：

- ✅ 掌握完整项目开发流程
- ✅ 学会组件化开发和代码组织
- ✅ 理解前后端分离架构
- ✅ 掌握状态管理和路由配置
- ✅ 学会接口封装和错误处理

## 🔗 相关文档

- [Vue 完全指南](../frameworks/vue.md) - Vue 2/3 选项式+组合式 API
- [React](../React/index.md) - React 框架
- [Node.js](../Node/index.md) - 后端开发
- [TypeScript 完全指南](../frameworks/typescript.md) - TS 类型系统


## 网易云音乐案例

详细教程请查看：[网易云音乐项目](./music-app.md)

### 项目概述

基于 Vue 2 + Vant 开发的移动端音乐播放应用，包含：

- 推荐歌单展示
- 音乐搜索（防抖优化）
- 歌曲播放
- 歌词显示


## 后台管理系统案例

详细教程请查看：[后台管理系统项目](./admin-system.md)

### 项目概述

基于 Vue 3 + Element Plus + TypeScript 开发的企业级后台管理系统，包含：

- 权限管理（RBAC）
- 数据可视化（ECharts）
- 动态路由
- 用户/角色/菜单管理


## React 商城案例

### 技术栈

- Vue 2
- Vue Router
- Axios
- Vant UI
- PostCSS

### 项目搭建

```bash
# 创建项目
vue create music-app

# 安装依赖
yarn add axios vant vue-router
yarn add babel-plugin-import -D
yarn add postcss postcss-pxtorem@5.1.1 -D
```

### Vant 按需引入配置

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

### PostCSS 配置

```javascript
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 37.5,  // 设计稿宽度 / 10
            propList: ['*']
        }
    }
};
```

### 路由配置

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
                meta: { title: '首页' }
            },
            {
                path: 'search',
                component: Search,
                meta: { title: '搜索' }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
];
```

### 网络请求封装

```javascript
// utils/request.js
import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(config => {
    // 添加 token 等
    return config;
});

// 响应拦截器
request.interceptors.response.use(
    response => response.data,
    error => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

export default request;
```

### API 封装

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

### 首页推荐歌单

```vue
<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.pic" />
      </van-swipe-item>
    </van-swipe>
    
    <!-- 推荐歌单 -->
    <van-cell title="推荐歌单" />
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

### 搜索功能（防抖）

```vue
<template>
  <div class="search">
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      @input="onInput"
    />
    
    <!-- 热搜 -->
    <div class="hot-search" v-if="!keyword">
      <h3>热搜榜</h3>
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
    
    <!-- 搜索结果 -->
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
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
            // 防抖处理
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
            // 加载更多
            this.loading = false;
        },
        play(id) {
            this.$router.push(`/play?id=${id}`);
        }
    }
};
</script>
```

## 大事件案例

### 技术栈

- jQuery
- Layui
- Ajax
- 富文本编辑器

### 页面跳转

```javascript
// 跳转到主页
location.href = 'index.html';

// 使用 jQuery
$(location).attr('href', 'index.html');
```

### Ajax 预处理

```javascript
// 在发送请求前统一处理
$.ajaxPrefilter(function(options) {
    // 统一添加 baseURL
    options.url = 'http://localhost:3000' + options.url;
    
    // 统一添加请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        };
    }
});
```

### 表单操作

```javascript
// 获取表单数据
var data = $(this).serialize();
// 结果: name=value&password=value

// 获取单个字段
var password = $('#form_reg [name=password]').val().trim();

// 属性选择器
$('[name=password]');  // 选择 name 属性为 password 的元素

// 重置表单
$('.layui-form')[0].reset();
```

### 文件上传

```javascript
// 监听文件选择
$('#file').on('change', function(e) {
    var file = e.target.files[0];
    
    // 创建临时 URL
    var imgURL = URL.createObjectURL(file);
    
    // 预览图片
    $('#preview').attr('src', imgURL);
});

// FormData 上传
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

### 富文本编辑器

```html
<!-- 引入 -->
<link rel="stylesheet" href="/assets/lib/tinymce/skins/ui/oxide/skin.min.css">
<script src="/assets/lib/tinymce/tinymce.min.js"></script>

<!-- 使用 -->
<textarea id="editor"></textarea>

<script>
tinymce.init({
    selector: '#editor',
    language: 'zh_CN',
    plugins: 'lists link image',
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright'
});

// 获取内容
tinymce.activeEditor.getContent();

// 设置内容
tinymce.activeEditor.setContent('内容');
</script>
```

## 电商管理后台 API 接口

### 接口规范

```
Base URL: http://localhost:8888/api/private/v1/
```

### 登录接口

```javascript
// POST /login
{
    "username": "admin",
    "password": "123456"
}

// 响应
{
    "data": {
        "token": "Bearer xxx"
    },
    "meta": {
        "msg": "登录成功",
        "status": 200
    }
}
```

### 用户管理接口

```javascript
// 获取用户列表
// GET /users?query=&pagenum=1&pagesize=10

// 添加用户
// POST /users
{
    "username": "newuser",
    "password": "123456",
    "email": "user@example.com",
    "mobile": "13800138000"
}

// 修改用户状态
// PUT /users/:id/state/:type

// 删除用户
// DELETE /users/:id
```

### 权限管理接口

```javascript
// 获取权限列表
// GET /rights/list

// 获取角色列表
// GET /roles

// 分配权限
// POST /roles/:id/rights
{
    "rids": "101,102,103"
}
```

### 商品管理接口

```javascript
// 获取商品列表
// GET /goods?query=&pagenum=1&pagesize=10

// 添加商品
// POST /goods
{
    "goods_name": "商品名称",
    "goods_price": 99.99,
    "goods_number": 100,
    "goods_weight": 1,
    "goods_introduce": "商品介绍",
    "pics": [],
    "attrs": []
}

// 上传图片
// POST /upload
// Content-Type: multipart/form-data
```

## 项目开发规范

### 目录结构

```
project/
├── public/              # 静态资源
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/             # 接口封装
│   ├── assets/          # 静态资源
│   ├── components/      # 公共组件
│   ├── router/          # 路由配置
│   ├── store/           # 状态管理
│   ├── utils/           # 工具函数
│   ├── views/           # 页面组件
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 文件夹 | 小写，多个单词用连字符 | `user-management` |
| 组件 | 大驼峰 | `UserList.vue` |
| JS 文件 | 小驼峰 | `userService.js` |
| 常量 | 全大写下划线 | `MAX_COUNT` |
| 变量/函数 | 小驼峰 | `getUserList` |
| 类 | 大驼峰 | `UserService` |

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

```bash
# 示例
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复首页轮播图显示问题"
git commit -m "docs: 更新 API 文档"
```
