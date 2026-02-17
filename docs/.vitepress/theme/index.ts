// https://vitepress.dev/guide/custom-theme
import {h, onMounted, watch, nextTick} from 'vue'
import type {Theme} from 'vitepress'
import {useData, inBrowser, useRoute} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import {NProgress} from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import MyLayout from '../theme/components/myLayout.vue'
import LinkCard from "../theme/components/linkCard.vue" // 卡片
import HomeUnderline from "./components/HomeUnderline.vue" // 首页下划线
import WatermelonPlayer from "./components/WatermelonPlayer.vue" // 音频播放器
import confetti from "./components/confetti.vue" // 烟花
import update from "./components/update.vue" // 更新
import mediumZoom from 'medium-zoom'; // 图片缩放
import MNavLinks from './components/MNavLinks.vue' // 导航
import ArticleMetadata from './components/ArticleMetadata.vue' // 文章信息
import GiscusComment from './components/GiscusComment.vue' // Giscus评论
import MusicPlayer from './components/MusicPlayer.vue' // 音乐播放器
import './styles/index.css'
import 'virtual:group-icons.css' //代码组样式

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout: () => {
    // 获取 frontmatter
    const {frontmatter} = useData()
    
    /* 添加自定义 class */
    const props = frontmatter.value?.layoutClass
      ? { class: frontmatter.value.layoutClass }
      : {}
    
    return h(MyLayout, props)
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', {background: 'var(--vp-c-bg)'}); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    }),
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
  },
  enhanceApp({app, router, siteData}) {
    app.component('LinkCard', LinkCard)
    app.component('HomeUnderline', HomeUnderline)
    app.component('WatermelonPlayer', WatermelonPlayer)
    app.component('confetti', confetti)
    app.component('update', update)
    app.component('MNavLinks', MNavLinks)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('GiscusComment', GiscusComment)
    app.component('MusicPlayer', MusicPlayer)
    
    if (inBrowser) {
      NProgress.configure({showSpinner: false})
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
        NProgress.done() // 停止进度条
      }
    }
    
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
          () => router.route.data.relativePath,
          () => updateHomePageStyle(location.pathname === '/en/' || location.pathname === '/'),
          {immediate: true},
      )
    }
  }
} satisfies Theme

// 彩虹背景动画样式 - 首页
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return
    
    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return
    
    homePageStyle.remove()
    homePageStyle = undefined
  }
}
