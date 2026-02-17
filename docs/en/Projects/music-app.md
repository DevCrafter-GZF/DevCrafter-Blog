# NetEase Cloud Music Project <Badge type="tip" text="Vue 2" />

> [!TIP]
> Mobile music playback app developed based on Vue 2 + Vant, including recommended playlists, search, playback and other core features.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue | 2.x | Frontend Framework |
| Vue Router | 3.x | Route Management |
| Axios | 1.x | HTTP Requests |
| Vant | 2.x | UI Component Library |
| PostCSS | - | CSS Processing |

## Project Setup

### Create Project

```bash
# Create project using Vue CLI
vue create music-app

# Select Vue 2 + Babel + Router
```

### Install Dependencies

```bash
# Core dependencies
yarn add axios vant vue-router

# Development dependencies
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
            rootValue: 37.5,
            propList: ['*']
        }
    }
};
```

## Project Structure

```
src/
├── api/                 # API interface encapsulation
├── assets/              # Static resources
├── components/          # Common components
├── router/              # Route configuration
├── utils/               # Utility functions
├── views/               # Page components
├── App.vue
└── main.js
```

## Core Features

### 1. Route Configuration

```javascript
// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            { path: 'home', component: Home },
            { path: 'search', component: Search }
        ]
    },
    { path: '/play', component: Play }
];

export default new VueRouter({ routes });
```

### 2. Network Request Encapsulation

```javascript
// utils/request.js
import axios from 'axios';
import { Toast } from 'vant';

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
});

// Request interceptor
request.interceptors.request.use(config => {
    Toast.loading({ message: 'Loading...', forbidClick: true });
    return config;
});

// Response interceptor
request.interceptors.response.use(response => {
    Toast.clear();
    return response.data;
});

export default request;
```

### 3. API Encapsulation

```javascript
// api/music.js
import request from '@/utils/request';

export const getBanner = () => request.get('/banner');
export const getRecommendList = (limit = 6) => request.get('/personalized', { params: { limit } });
export const getHotSearch = () => request.get('/search/hot');
export const searchMusic = (keywords) => request.get('/search', { params: { keywords } });
export const getSongUrl = (id) => request.get('/song/url', { params: { id } });
export const getLyric = (id) => request.get('/lyric', { params: { id } });
```

### 4. Home Page

```vue
<template>
  <div class="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.pic" />
      </van-swipe-item>
    </van-swipe>

    <div class="recommend">
      <h3>Recommended Playlists</h3>
      <div class="list">
        <div class="item" v-for="item in recommendList" :key="item.id">
          <img :src="item.picUrl" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getRecommendList } from '@/api/music';

export default {
  data() {
    return { banners: [], recommendList: [] };
  },
  async created() {
    const bannerRes = await getBanner();
    this.banners = bannerRes.banners;
    const recommendRes = await getRecommendList();
    this.recommendList = recommendRes.result;
  }
};
</script>
```

### 5. Search Page - Debounce

```vue
<template>
  <div class="search">
    <van-search v-model="keywords" placeholder="Search songs..." @input="onInput" />
    
    <div class="hot-search" v-if="!keywords">
      <h4>Hot Search</h4>
      <van-tag v-for="item in hotList" :key="item.id" @click="search(item.name)">
        {{ item.name }}
      </van-tag>
    </div>

    <div class="result" v-else>
      <van-cell v-for="song in searchResult" :key="song.id" :title="song.name" />
    </div>
  </div>
</template>

<script>
import { getHotSearch, searchMusic } from '@/api/music';

export default {
  data() {
    return { keywords: '', hotList: [], searchResult: [], timer: null };
  },
  async created() {
    const res = await getHotSearch();
    this.hotList = res.result.hots;
  },
  methods: {
    onInput() {
      clearTimeout(this.timer);
      if (!this.keywords.trim()) return;
      this.timer = setTimeout(() => this.doSearch(), 500);
    },
    async doSearch() {
      const res = await searchMusic(this.keywords);
      this.searchResult = res.result.songs || [];
    }
  }
};
</script>
```

### 6. Player Page

```vue
<template>
  <div class="play">
    <van-nav-bar :title="song.name" left-arrow @click-left="$router.back()" />
    
    <div class="cover" :class="{ playing: isPlaying }">
      <img :src="song.picUrl" />
    </div>

    <div class="controls">
      <van-icon name="pause" v-if="isPlaying" @click="togglePlay" />
      <van-icon name="play" v-else @click="togglePlay" />
    </div>

    <audio ref="audio" :src="songUrl" @ended="next"></audio>
  </div>
</template>

<script>
import { getSongUrl, getLyric } from '@/api/music';

export default {
  data() {
    return { song: {}, songUrl: '', isPlaying: false };
  },
  async created() {
    const { id } = this.$route.query;
    const urlRes = await getSongUrl(id);
    this.songUrl = urlRes.data[0].url;
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audio;
      this.isPlaying ? audio.pause() : audio.play();
      this.isPlaying = !this.isPlaying;
    }
  }
};
</script>

<style scoped>
.cover { width: 200px; height: 200px; margin: 50px auto; border-radius: 50%; }
.cover.playing { animation: rotate 20s linear infinite; }
@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
```

## Project Highlights

- **Vant On-demand Import**: Reduce bundle size
- **PostCSS px to rem**: Adapt to mobile screens
- **Axios Interceptors**: Unified request/response handling
- **Debounce Search**: Optimize search performance
- **Lyric Sync**: Real-time lyric display
