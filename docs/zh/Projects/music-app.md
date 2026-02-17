# 网易云音乐项目 <Badge type="tip" text="Vue 2" />

> [!TIP]
> 基于 Vue 2 + Vant 开发的移动端音乐播放应用，包含推荐歌单、搜索、播放等核心功能。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 2.x | 前端框架 |
| Vue Router | 3.x | 路由管理 |
| Axios | 1.x | HTTP 请求 |
| Vant | 2.x | UI 组件库 |
| PostCSS | - | CSS 处理 |

## 项目搭建

### 创建项目

```bash
# 使用 Vue CLI 创建项目
vue create music-app

# 选择 Vue 2 + Babel + Router
```

### 安装依赖

```bash
# 核心依赖
yarn add axios vant vue-router

# 开发依赖
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

## 项目结构

```
src/
├── api/                 # API 接口封装
│   └── music.js
├── assets/              # 静态资源
│   ├── images/
│   └── styles/
├── components/          # 公共组件
│   ├── Player.vue
│   └── SongList.vue
├── router/              # 路由配置
│   └── index.js
├── utils/               # 工具函数
│   └── request.js
├── views/               # 页面组件
│   ├── Home/
│   ├── Search/
│   └── Play/
├── App.vue
└── main.js
```

## 核心功能实现

### 1. 路由配置

```javascript
// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout';
import Home from '@/views/Home';
import Search from '@/views/Search';
import Play from '@/views/Play';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: Home,
                meta: { title: '首页', keepAlive: true }
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
        component: Play,
        meta: { title: '播放' }
    }
];

const router = new VueRouter({
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

export default router;
```

### 2. 网络请求封装

```javascript
// utils/request.js
import axios from 'axios';
import { Toast } from 'vant';

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 显示加载提示
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        Toast.clear();
        return response.data;
    },
    error => {
        Toast.clear();
        Toast.fail('网络错误，请稍后重试');
        return Promise.reject(error);
    }
);

export default request;
```

### 3. API 封装

```javascript
// api/music.js
import request from '@/utils/request';

// 获取轮播图
export const getBanner = () => {
    return request.get('/banner');
};

// 获取推荐歌单
export const getRecommendList = (limit = 6) => {
    return request.get('/personalized', {
        params: { limit }
    });
};

// 获取热搜列表
export const getHotSearch = () => {
    return request.get('/search/hot');
};

// 搜索音乐
export const searchMusic = (keywords, offset = 0, limit = 20) => {
    return request.get('/search', {
        params: { keywords, offset, limit }
    });
};

// 获取歌曲详情
export const getSongDetail = (ids) => {
    return request.get('/song/detail', {
        params: { ids }
    });
};

// 获取音乐 URL
export const getSongUrl = (id) => {
    return request.get('/song/url', {
        params: { id }
    });
};

// 获取歌词
export const getLyric = (id) => {
    return request.get('/lyric', {
        params: { id }
    });
};

// 获取歌单详情
export const getPlaylistDetail = (id) => {
    return request.get('/playlist/detail', {
        params: { id }
    });
};
```

### 4. 首页推荐歌单

```vue
<!-- views/Home/index.vue -->
<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="banner in banners" :key="banner.bannerId">
        <img :src="banner.pic" @click="goLink(banner.url)" />
      </van-swipe-item>
    </van-swipe>
    
    <!-- 推荐歌单 -->
    <van-cell title="推荐歌单" is-link to="/playlists" />
    <van-row gutter="10" class="playlist-row">
      <van-col span="8" v-for="item in recommendList" :key="item.id">
        <div class="playlist-item" @click="goDetail(item.id)">
          <div class="play-count">
            <van-icon name="play-circle-o" />
            {{ formatCount(item.playCount) }}
          </div>
          <img v-lazy="item.picUrl" />
          <p class="name">{{ item.name }}</p>
        </div>
      </van-col>
    </van-row>
    
    <!-- 最新音乐 -->
    <van-cell title="最新音乐" is-link />
    <van-cell-group>
      <van-cell
        v-for="song in newSongs"
        :key="song.id"
        :title="song.name"
        :label="song.song.artists[0].name + ' - ' + song.song.album.name"
        @click="play(song.id)"
      >
        <template #icon>
          <img :src="song.picUrl" class="song-img" />
        </template>
        <template #right-icon>
          <van-icon name="play-circle-o" class="play-icon" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getBanner, getRecommendList, getNewSongs } from '@/api/music';
import { Swipe, SwipeItem, Cell, CellGroup, Row, Col, Icon } from 'vant';

export default {
    name: 'Home',
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon
    },
    data() {
        return {
            banners: [],
            recommendList: [],
            newSongs: []
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            try {
                // 并行请求
                const [bannerRes, recommendRes, newSongsRes] = await Promise.all([
                    getBanner(),
                    getRecommendList(),
                    getNewSongs()
                ]);
                
                this.banners = bannerRes.banners;
                this.recommendList = recommendRes.result;
                this.newSongs = newSongsRes.result.slice(0, 10);
            } catch (error) {
                console.error('加载数据失败:', error);
            }
        },
        formatCount(count) {
            if (count > 100000000) {
                return (count / 100000000).toFixed(1) + '亿';
            }
            if (count > 10000) {
                return (count / 10000).toFixed(1) + '万';
            }
            return count;
        },
        goDetail(id) {
            this.$router.push(`/playlist/${id}`);
        },
        goLink(url) {
            if (url) {
                window.location.href = url;
            }
        },
        play(id) {
            this.$router.push(`/play?id=${id}`);
        }
    }
};
</script>

<style scoped>
.home {
    padding-bottom: 50px;
}
.van-swipe {
    height: 150px;
}
.van-swipe img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.playlist-row {
    padding: 0 10px;
}
.playlist-item {
    position: relative;
    margin-bottom: 10px;
}
.playlist-item img {
    width: 100%;
    border-radius: 8px;
}
.play-count {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
}
.play-count .van-icon {
    margin-right: 3px;
}
.playlist-item .name {
    font-size: 12px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.song-img {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin-right: 10px;
}
.play-icon {
    font-size: 24px;
    color: #999;
}
</style>
```

### 5. 搜索功能（防抖）

```vue
<!-- views/Search/index.vue -->
<template>
  <div class="search-page">
    <!-- 搜索框 -->
    <form action="/" class="search-form">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
      />
    </form>
    
    <!-- 搜索历史 -->
    <div class="search-history" v-if="!keyword && history.length > 0">
      <div class="history-header">
        <span>历史记录</span>
        <van-icon name="delete" @click="clearHistory" />
      </div>
      <div class="history-list">
        <van-tag
          v-for="(item, index) in history"
          :key="index"
          @click="search(item)"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>
    
    <!-- 热搜榜 -->
    <div class="hot-search" v-if="!keyword">
      <h3>热搜榜</h3>
      <div 
        class="hot-item" 
        v-for="(item, index) in hotList" 
        :key="index"
        @click="search(item.first)"
      >
        <span :class="['rank', { top: index < 3 }]">{{ index + 1 }}</span>
        <div class="info">
          <div class="word">
            {{ item.first }}
            <van-tag v-if="item.iconType" :type="item.iconType === 1 ? 'danger' : 'primary'">
              {{ item.iconType === 1 ? '热' : '新' }}
            </van-tag>
          </div>
          <div class="desc">{{ item.second }}</div>
        </div>
        <span class="score">{{ item.score }}</span>
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
        :label="formatArtists(item.artists)"
        @click="play(item.id)"
      >
        <template #right-icon>
          <van-icon name="play-circle-o" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getHotSearch, searchMusic } from '@/api/music';
import { Search, List, Cell, Icon, Tag } from 'vant';

const HISTORY_KEY = 'search_history';

export default {
    name: 'Search',
    components: {
        [Search.name]: Search,
        [List.name]: List,
        [Cell.name]: Cell,
        [Icon.name]: Icon,
        [Tag.name]: Tag
    },
    data() {
        return {
            keyword: '',
            hotList: [],
            searchResults: [],
            history: [],
            loading: false,
            finished: false,
            page: 0,
            timer: null
        };
    },
    created() {
        this.loadHotSearch();
        this.loadHistory();
    },
    methods: {
        async loadHotSearch() {
            const res = await getHotSearch();
            this.hotList = res.result.hots;
        },
        loadHistory() {
            const history = localStorage.getItem(HISTORY_KEY);
            this.history = history ? JSON.parse(history) : [];
        },
        saveHistory() {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history));
        },
        clearHistory() {
            this.history = [];
            localStorage.removeItem(HISTORY_KEY);
        },
        onInput() {
            // 防抖处理
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (this.keyword.trim()) {
                    this.search(this.keyword);
                }
            }, 500);
        },
        onSearch() {
            if (this.keyword.trim()) {
                this.search(this.keyword);
            }
        },
        onCancel() {
            this.keyword = '';
            this.searchResults = [];
        },
        async search(keyword) {
            this.keyword = keyword;
            this.page = 0;
            this.finished = false;
            this.searchResults = [];
            
            // 添加到历史记录
            if (!this.history.includes(keyword)) {
                this.history.unshift(keyword);
                if (this.history.length > 10) {
                    this.history.pop();
                }
                this.saveHistory();
            }
            
            await this.loadMore();
        },
        async onLoad() {
            await this.loadMore();
        },
        async loadMore() {
            this.page++;
            const res = await searchMusic(this.keyword, (this.page - 1) * 20);
            
            this.searchResults.push(...res.result.songs);
            this.loading = false;
            
            if (res.result.songs.length < 20) {
                this.finished = true;
            }
        },
        formatArtists(artists) {
            return artists.map(a => a.name).join(' / ');
        },
        play(id) {
            this.$router.push(`/play?id=${id}`);
        }
    }
};
</script>

<style scoped>
.search-page {
    min-height: 100vh;
    background: #f5f5f5;
}
.search-form {
    position: sticky;
    top: 0;
    z-index: 100;
}
.search-history {
    padding: 15px;
    background: #fff;
    margin-bottom: 10px;
}
.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.history-list .van-tag {
    margin: 0 10px 10px 0;
    padding: 5px 10px;
}
.hot-search {
    background: #fff;
    padding: 15px;
}
.hot-search h3 {
    margin-bottom: 15px;
}
.hot-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;
}
.hot-item .rank {
    width: 30px;
    text-align: center;
    color: #999;
}
.hot-item .rank.top {
    color: #ee0a24;
}
.hot-item .info {
    flex: 1;
    margin: 0 10px;
}
.hot-item .word {
    font-size: 14px;
    margin-bottom: 5px;
}
.hot-item .desc {
    font-size: 12px;
    color: #999;
}
.hot-item .score {
    font-size: 12px;
    color: #ccc;
}
</style>
```

## 学习要点

1. **移动端适配** - 使用 postcss-pxtorem 实现 px 自动转 rem
2. **组件按需加载** - 使用 babel-plugin-import 减少打包体积
3. **防抖优化** - 搜索输入使用防抖减少请求次数
4. **数据缓存** - 搜索历史使用 localStorage 持久化
5. **图片懒加载** - 使用 v-lazy 指令优化长列表性能

## 🔗 相关文档

- [Vue 完全指南](../frameworks/vue.md) - Vue 2/3 基础教程
- [Vue Router](https://router.vuejs.org/zh/) - 官方路由文档
- [Vant](https://vant-ui.github.io/vant/v2/) - Vant 2 组件库文档
