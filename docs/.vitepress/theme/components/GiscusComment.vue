<template>
  <div class="giscus-wrapper">
    <div class="giscus"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { isDark } = useData()

let giscusScript: HTMLScriptElement | null = null

const loadGiscus = () => {
  // Remove existing script if any
  if (giscusScript) {
    giscusScript.remove()
  }
  
  // Remove existing giscus frame
  const existingFrame = document.querySelector('.giscus-frame')
  if (existingFrame) {
    existingFrame.remove()
  }

  // Create new script
  giscusScript = document.createElement('script')
  giscusScript.src = 'https://giscus.app/client.js'
  giscusScript.setAttribute('data-repo', 'DevCrafter-GZF/BlogComments')
  giscusScript.setAttribute('data-repo-id', '') // Need to get from GitHub
  giscusScript.setAttribute('data-category', 'Announcements')
  giscusScript.setAttribute('data-category-id', '') // Need to get from GitHub
  giscusScript.setAttribute('data-mapping', 'pathname')
  giscusScript.setAttribute('data-strict', '0')
  giscusScript.setAttribute('data-reactions-enabled', '1')
  giscusScript.setAttribute('data-emit-metadata', '0')
  giscusScript.setAttribute('data-input-position', 'bottom')
  giscusScript.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  giscusScript.setAttribute('data-lang', 'zh-CN')
  giscusScript.setAttribute('data-loading', 'lazy')
  giscusScript.setAttribute('crossorigin', 'anonymous')
  giscusScript.async = true

  document.querySelector('.giscus')?.appendChild(giscusScript)
}

// Watch for theme changes
watch(isDark, (newVal) => {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: newVal ? 'dark' : 'light' } } },
      'https://giscus.app'
    )
  }
})

// Watch for route changes
watch(() => route.path, () => {
  loadGiscus()
})

onMounted(() => {
  loadGiscus()
})

onUnmounted(() => {
  if (giscusScript) {
    giscusScript.remove()
  }
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
