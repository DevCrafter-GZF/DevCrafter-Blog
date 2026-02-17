<!--
 * @Author: GZF
 * @Description: 悬浮网易云音乐播放器组件 - iframe 版
-->

<template>
  <Teleport to="body">
    <div
      class="music-player-float"
      :class="{
        'expanded': isExpanded,
        'playing': isPlaying,
        'dragging': isDragging
      }"
      :style="positionStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <!-- 圆形状态 -->
      <div 
        v-if="!isExpanded" 
        class="player-circle" 
        @click.stop="handleCircleClick"
        @mousedown="startDrag"
      >
        <div class="album-rotate" :class="{ 'rotating': isPlaying }">
          <svg viewBox="0 0 100 100" class="music-icon">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.8)"/>
            <path d="M35 35 L50 25 L65 35 L65 65 L50 75 L35 65 Z" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
          </svg>
        </div>
        
        <div class="play-overlay" :class="{ 'show': showPlayOverlay }">
          <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor" class="overlay-icon">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" class="overlay-icon">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        
        <div class="hover-hint" v-if="isHovered">
          <span>{{ isPlaying ? '点击暂停' : '点击播放' }}</span>
        </div>
        
        <div class="sound-waves" v-if="isPlaying">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- 展开状态 -->
      <div 
        v-else 
        class="player-expanded" 
        @click.stop
        @mouseenter="clearCollapseTimer" 
        @mouseleave="startCollapseTimer"
      >
        <!-- 头部 -->
        <div class="player-header" @mousedown="startDrag">
          <div class="header-title">
            <svg viewBox="0 0 24 24" fill="currentColor" class="title-icon">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <span>音乐</span>
          </div>
          <button class="header-btn" @click="collapse" title="收起">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- 网易云音乐外链播放器 -->
        <div class="iframe-container">
          <iframe 
            ref="neteasePlayer"
            :src="playerUrl"
            frameborder="0"
            allow="autoplay"
            width="100%"
            height="380"
          ></iframe>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 状态
const isExpanded = ref(false)
const isPlaying = ref(false)
const isDragging = ref(false)
const isHovered = ref(false)
const showPlayOverlay = ref(false)

// 定时器
let expandTimer: ReturnType<typeof setTimeout> | null = null
let collapseTimer: ReturnType<typeof setTimeout> | null = null
let overlayTimer: ReturnType<typeof setTimeout> | null = null

// 位置
const position = ref({x: 0, y: 0})
const dragOffset = ref({x: 0, y: 0})
const playerWidth = 340
const playerHeight = 480
const circleSize = 64

// 网易云音乐外链播放器 URL
// 使用默认歌单：热歌榜
const playerUrl = computed(() => {
  // 网易云音乐外链播放器
  // id: 3778678 是云音乐热歌榜
  return `https://music.163.com/outchain/player?type=0&id=3778678&auto=0&height=380`
})

// 初始化
onMounted(() => {
  // 初始位置：右下角（圆形中心点）
  const initialX = window.innerWidth - circleSize / 2 - 20
  const initialY = window.innerHeight - circleSize / 2 - 20
  position.value = { x: initialX, y: initialY }
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  clearAllTimers()
  window.removeEventListener('resize', handleResize)
})

// 窗口大小变化时调整位置
const handleResize = () => {
  if (isExpanded.value) {
    const maxX = window.innerWidth - playerWidth - 20
    const maxY = window.innerHeight - playerHeight - 20
    position.value = {
      x: Math.min(position.value.x, maxX),
      y: Math.min(position.value.y, maxY)
    }
  } else {
    const maxX = window.innerWidth - circleSize / 2 - 20
    const maxY = window.innerHeight - circleSize / 2 - 20
    position.value = {
      x: Math.min(position.value.x, maxX),
      y: Math.min(position.value.y, maxY)
    }
  }
}

// 清除所有定时器
const clearAllTimers = () => {
  if (expandTimer) clearTimeout(expandTimer)
  if (collapseTimer) clearTimeout(collapseTimer)
  if (overlayTimer) clearTimeout(overlayTimer)
}

// 计算属性
const positionStyle = computed(() => {
  const x = position.value.x
  const y = position.value.y

  return {
    left: `${x}px`,
    top: `${y}px`,
    transform: isExpanded.value ? 'translate(0, 0)' : 'translate(-50%, -50%)'
  }
})

// 鼠标交互 - 500ms展开
const onMouseEnter = () => {
  isHovered.value = true
  if (collapseTimer) {
    clearTimeout(collapseTimer)
    collapseTimer = null
  }
  if (!isExpanded.value) {
    expandTimer = setTimeout(() => {
      expand()
    }, 500)
  }
}

const onMouseLeave = () => {
  isHovered.value = false
  if (expandTimer) {
    clearTimeout(expandTimer)
    expandTimer = null
  }
  if (isExpanded.value) {
    startCollapseTimer()
  }
}

const startCollapseTimer = () => {
  if (collapseTimer) clearTimeout(collapseTimer)
  collapseTimer = setTimeout(() => {
    collapse()
  }, 2000)
}

const clearCollapseTimer = () => {
  if (collapseTimer) {
    clearTimeout(collapseTimer)
    collapseTimer = null
  }
}

// 圆形按钮点击 - 播放/暂停
const handleCircleClick = () => {
  if (expandTimer) {
    clearTimeout(expandTimer)
    expandTimer = null
  }
  togglePlay()
  showPlayOverlay.value = true
  if (overlayTimer) clearTimeout(overlayTimer)
  overlayTimer = setTimeout(() => {
    showPlayOverlay.value = false
  }, 800)
}

// 展开/收起
const expand = () => {
  const currentX = position.value.x
  const currentY = position.value.y
  
  const maxX = window.innerWidth - playerWidth - 20
  const maxY = window.innerHeight - playerHeight - 20
  
  let newX = Math.min(currentX, maxX)
  let newY = Math.min(currentY, maxY)
  
  newX = Math.max(20, newX)
  newY = Math.max(20, newY)

  position.value = { x: newX, y: newY }

  isExpanded.value = true
}

const collapse = () => {
  isExpanded.value = false
  snapToNearestCorner()
}

// 收起时回到最近的角落（只在底部左右）
const snapToNearestCorner = () => {
  const currentX = position.value.x
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  
  const distToLeft = currentX
  const distToRight = windowWidth - currentX
  
  let targetX: number
  if (distToLeft < distToRight) {
    targetX = circleSize / 2 + 20
  } else {
    targetX = windowWidth - circleSize / 2 - 20
  }
  
  const targetY = windowHeight - circleSize / 2 - 20
  
  position.value = { x: targetX, y: targetY }
}

// 拖拽
const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y
  }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return

  let newX = e.clientX - dragOffset.value.x
  let newY = e.clientY - dragOffset.value.y
  
  if (isExpanded.value) {
    const maxX = window.innerWidth - playerWidth - 20
    const maxY = window.innerHeight - playerHeight - 20
    newX = Math.max(20, Math.min(maxX, newX))
    newY = Math.max(20, Math.min(maxY, newY))
  } else {
    const maxX = window.innerWidth - circleSize / 2 - 20
    const maxY = window.innerHeight - circleSize / 2 - 20
    newX = Math.max(circleSize / 2 + 20, Math.min(maxX, newX))
    newY = Math.max(circleSize / 2 + 20, Math.min(maxY, newY))
  }

  position.value = { x: newX, y: newY }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 播放控制（模拟）
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}
</script>

<style scoped>
.music-player-float {
  position: fixed;
  z-index: 9999;
  user-select: none;
}

.music-player-float.dragging {
  cursor: grabbing;
}

/* 圆形状态 */
.player-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.player-circle:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.player-circle:active {
  transform: scale(0.95);
}

.album-rotate {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 15s linear infinite;
  animation-play-state: paused;
}

.album-rotate.rotating {
  animation-play-state: running;
}

.music-icon {
  width: 40px;
  height: 40px;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 播放覆盖层 */
.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.play-overlay.show {
  opacity: 1;
}

.overlay-icon {
  width: 28px;
  height: 28px;
  color: #fff;
}

/* 悬浮提示 */
.hover-hint {
  position: absolute;
  right: 72px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.player-circle:hover .hover-hint {
  opacity: 1;
}

/* 音频波纹 */
.sound-waves {
  position: absolute;
  bottom: 10px;
  display: flex;
  gap: 2px;
}

.sound-waves span {
  width: 3px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  animation: wave 0.6s ease-in-out infinite;
}

.sound-waves span:nth-child(1) { height: 8px; animation-delay: 0s; }
.sound-waves span:nth-child(2) { height: 12px; animation-delay: 0.15s; }
.sound-waves span:nth-child(3) { height: 10px; animation-delay: 0.3s; }

@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}

/* 展开状态 */
.player-expanded {
  width: 340px;
  background: var(--vp-c-bg);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

/* 头部 */
.player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: grab;
}

.player-header:active {
  cursor: grabbing;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}

.title-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.header-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.header-btn svg {
  width: 16px;
  height: 16px;
}

/* iframe 容器 */
.iframe-container {
  width: 100%;
  height: 380px;
  background: var(--vp-c-bg-soft);
}

.iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 深色模式 */
.dark .player-circle {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.dark .player-expanded {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
</style>
