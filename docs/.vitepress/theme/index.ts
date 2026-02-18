// 基于 @escook/vitepress-theme 进行二次开发
import { h, onMounted, watch, nextTick, provide } from 'vue'
import type { Theme } from 'vitepress'
import { useData, inBrowser, useRoute } from 'vitepress'
import escookTheme from '@escook/vitepress-theme'
import '@escook/vitepress-theme/style.css'
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'
import mediumZoom from 'medium-zoom'

// 导入自定义组件
import LinkCard from './components/linkCard.vue'
import HomeUnderline from './components/HomeUnderline.vue'
import WatermelonPlayer from './components/WatermelonPlayer.vue'
import confetti from './components/confetti.vue'
import update from './components/update.vue'
import MNavLinks from './components/MNavLinks.vue'
import ArticleMetadata from './components/ArticleMetadata.vue'
import GiscusComment from './components/GiscusComment.vue'
import BackToTop from './components/backToTop.vue'
import MouseFollower from './components/MouseFollower.vue'
import MouseClick from './components/MouseClick.vue'
import MusicBall from './components/MusicBall.vue'

// 导入自定义样式
import './styles/index.css'
import 'virtual:group-icons.css'

let homePageStyle: HTMLStyleElement | undefined

// 自定义亮暗色切换动画
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

export default {
  // 继承 escook 主题
  extends: escookTheme,
  
  // 使用 setup 来提供 toggle-appearance（确保在组件层级正确注入）
  setup() {
    const { isDark } = useData()
    const route = useRoute()
    
    // 提供自定义的亮暗色切换动画（圆形扩散效果）
    provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
      if (!enableTransitions()) {
        isDark.value = !isDark.value
        return
      }

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y)
        )}px at ${x}px ${y}px)`
      ]

      await document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
      }).ready

      document.documentElement.animate(
        { clipPath: isDark.value ? clipPath.reverse() : clipPath },
        {
          duration: 300,
          easing: 'ease-in',
          pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
        }
      )
    })
    
    // 图片缩放
    const initZoom = () => {
      mediumZoom('.VPContent img', { background: 'var(--vp-c-bg)' })
    }
    
    onMounted(() => {
      initZoom()
    })
    
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
  
  // 自定义 Layout，使用 escook 的 Layout 并添加插槽
  Layout: () => {
    const { frontmatter } = useData()
    const route = useRoute()
    
    const props = frontmatter.value?.layoutClass
      ? { class: frontmatter.value.layoutClass }
      : {}
    
    // 判断是否在导航页面
    const isNavigationPage = route.path.includes('/navigation/') || route.path.includes('/Navigation/')
    
    return h(escookTheme.Layout, props, {
      // 在文档底部之前添加回到顶部按钮
      'doc-footer-before': () => h(BackToTop),
      
      // 在文档后添加评论（非导航页）
      'doc-after': () => isNavigationPage ? null : h(GiscusComment),
      
      // 在布局顶部添加鼠标效果和音乐播放器
      'layout-top': () => [
        h(MouseFollower),
        h(MouseClick),
        h(MusicBall)
      ]
    })
  },
  
  enhanceApp({ app, router }) {
    // 注册自定义组件
    app.component('LinkCard', LinkCard)
    app.component('HomeUnderline', HomeUnderline)
    app.component('WatermelonPlayer', WatermelonPlayer)
    app.component('confetti', confetti)
    app.component('update', update)
    app.component('MNavLinks', MNavLinks)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('GiscusComment', GiscusComment)
    
    // 进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onAfterRouteChanged = () => {
        NProgress.done()
      }
    }
    
    // 彩虹背景动画样式 - 首页
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/en/' || location.pathname === '/'),
        { immediate: true }
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
