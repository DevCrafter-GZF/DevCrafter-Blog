<!--
 * @Author: GZF
 * @Date: 2025-01-19 09:32:28
 * @Description: 亮暗模式切换
-->

<script setup lang="ts">
import MouseClick from "./MouseClick.vue";
import MouseFollower from "./MouseFollower.vue";
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, computed } from 'vue'

import BackToTop from "./backToTop.vue"
// import notice from "./notice.vue"
// import bsz from "./bsz.vue"

const { isDark } = useData()
const route = useRoute()

// 判断是否在导航页面，导航页面不显示评论
const isNavigationPage = computed(() => {
  return route.path.includes('/navigation/') || route.path.includes('/Navigation/')
})

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

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
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-footer-before>
      <BackToTop />
    </template>
    <template #doc-after>
      <GiscusComment v-if="!isNavigationPage" />
    </template>
    <template #layout-top>
      <MouseFollower />
      <MouseClick />
    </template>
    <!-- <template #layout-top>
      <notice />
    </template>
    <template #layout-bottom>
      <bsz />
    </template> -->
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

/* 修正因视图过渡导致的月牙图标偏移 */
.check .icon {
  top: -2px;
}
</style>