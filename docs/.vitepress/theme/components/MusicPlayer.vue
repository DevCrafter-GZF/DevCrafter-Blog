<!--
 * @Author: GZF
 * @Description: 悬浮网易云音乐播放器组件 - 完整版
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

        <!-- 搜索区域 -->
        <div class="search-section">
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon-svg">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              v-model="searchKeyword"
              @focus="onSearchFocus"
              @blur="onSearchBlur"
              @keyup.enter="searchMusic"
              placeholder="搜索歌曲..."
              type="text"
            >
            <button v-if="searchKeyword" class="clear-search" @click="clearSearch">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 搜索下拉框 -->
        <div v-if="showDropdown" class="search-dropdown">
          <!-- 搜索结果 -->
          <div v-if="searchResults.length > 0" class="dropdown-section">
            <div class="dropdown-title">
              <span>搜索结果</span>
              <span class="result-count">{{ searchResults.length }}</span>
            </div>
            <div class="dropdown-list">
              <div
                v-for="song in searchResults"
                :key="song.id"
                class="dropdown-item"
                :class="{ 'active': currentSong?.id === song.id }"
                @click="playSong(song)"
              >
                <div class="item-info">
                  <div class="item-name">{{ song.name }}</div>
                  <div class="item-artist">{{ song.artist }}</div>
                </div>
                <div class="play-status">
                  <svg v-if="currentSong?.id === song.id && isPlaying" viewBox="0 0 24 24" fill="currentColor" class="playing-icon">
                    <rect x="4" y="4" width="4" height="16"/><rect x="10" y="4" width="4" height="16"/><rect x="16" y="4" width="4" height="16"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 热门歌曲 -->
          <div v-else class="dropdown-section">
            <div class="dropdown-title">
              <span>热门推荐</span>
            </div>
            <div class="dropdown-list">
              <div
                v-for="song in hotSongs"
                :key="song.id"
                class="dropdown-item"
                :class="{ 'active': currentSong?.id === song.id }"
                @click="playSong(song)"
              >
                <div class="item-info">
                  <div class="item-name">{{ song.name }}</div>
                  <div class="item-artist">{{ song.artist }}</div>
                </div>
                <div class="play-status">
                  <svg v-if="currentSong?.id === song.id && isPlaying" viewBox="0 0 24 24" fill="currentColor" class="playing-icon">
                    <rect x="4" y="4" width="4" height="16"/><rect x="10" y="4" width="4" height="16"/><rect x="16" y="4" width="4" height="16"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 当前播放 -->
        <div class="now-playing" v-if="currentSong">
          <div class="song-info">
            <div class="song-name">{{ currentSong.name }}</div>
            <div class="song-artist">{{ currentSong.artist }}</div>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="progress-section" v-if="currentSong">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar" @click="seekProgress" ref="progressBar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <span class="time">{{ formatTime(duration) }}</span>
        </div>

        <!-- 控制按钮 -->
        <div class="controls">
          <button class="ctrl-btn" @click="prevSong" title="上一首">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          
          <button class="ctrl-btn play-btn" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
            <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          
          <button class="ctrl-btn" @click="nextSong" title="下一首">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 音频元素 -->
    <audio
      ref="audioPlayer"
      :src="audioUrl"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @error="onError"
    ></audio>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 默认热门歌曲（内置数据，无需API）
const defaultHotSongs = [
  { id: '25706282', name: '起风了', artist: '买辣椒也用券' },
  { id: '1293886117', name: '体面', artist: '于文文' },
  { id: '863046037', name: '告白气球', artist: '周杰伦' },
  { id: '1293951677', name: '追光者', artist: '岑宁儿' },
  { id: '27808044', name: '平凡之路', artist: '朴树' },
  { id: '186016', name: '晴天', artist: '周杰伦' },
  { id: '25706285', name: '后来', artist: '刘若英' },
  { id: '531295576', name: '稻香', artist: '周杰伦' }
]

// 状态
const isExpanded = ref(false)
const isPlaying = ref(false)
const isDragging = ref(false)
const isHovered = ref(false)
const showDropdown = ref(false)
const showPlayOverlay = ref(false)
const currentSong = ref<any>(defaultHotSongs[0])
const hotSongs = ref([...defaultHotSongs])
const currentTime = ref(0)
const duration = ref(0)
const searchKeyword = ref('')
const searchResults = ref<any[]>([])

// 定时器
let expandTimer: ReturnType<typeof setTimeout> | null = null
let collapseTimer: ReturnType<typeof setTimeout> | null = null
let overlayTimer: ReturnType<typeof setTimeout> | null = null

// 位置
const position = ref({x: 0, y: 0})
const dragOffset = ref({x: 0, y: 0})
const playerWidth = 340
const playerHeight = 420
const circleSize = 64

// 音频元素
const audioPlayer = ref<HTMLAudioElement>()
const progressBar = ref<HTMLElement>()

// 计算属性
const positionStyle = computed(() => {
  return {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    transform: isExpanded.value ? 'translate(0, 0)' : 'translate(-50%, -50%)'
  }
})

const audioUrl = computed(() => {
  if (!currentSong.value) return ''
  return `https://music.163.com/song/media/outer/url?id=${currentSong.value.id}.mp3`
})

const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// 初始化
onMounted(() => {
  const initialX = window.innerWidth - circleSize / 2 - 20
  const initialY = window.innerHeight - circleSize / 2 - 20
  position.value = { x: initialX, y: initialY }
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
  showDropdown.value = true
}

const collapse = () => {
  isExpanded.value = false
  showDropdown.value = false
  searchKeyword.value = ''
  searchResults.value = []
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

// 搜索相关
const onSearchFocus = () => {
  showDropdown.value = true
  clearCollapseTimer()
}

const onSearchBlur = () => {
  setTimeout(() => {
    if (!searchKeyword.value) {
      searchResults.value = []
    }
  }, 200)
}

const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = []
}

// 搜索音乐 - 使用网易云音乐搜索
const searchMusic = async () => {
  if (!searchKeyword.value.trim()) return
  
  try {
    const keyword = encodeURIComponent(searchKeyword.value)
    // 使用 meting-api 搜索
    const response = await fetch(`https://api-meting.linweiqin.com/search?keywords=${keyword}&limit=10`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error('搜索失败')
    }
    
    const data = await response.json()
    
    if (data.data && data.data.songs) {
      searchResults.value = data.data.songs.map((song: any) => ({
        id: song.id.toString(),
        name: song.name,
        artist: song.ar?.map((a: any) => a.name).join('/') || '未知歌手'
      }))
    } else {
      searchResults.value = []
    }
  } catch (error) {
    console.log('搜索失败，使用本地过滤', error)
    // 本地过滤
    const keyword = searchKeyword.value.toLowerCase()
    searchResults.value = defaultHotSongs.filter(song => 
      song.name.toLowerCase().includes(keyword) || 
      song.artist.toLowerCase().includes(keyword)
    )
  }
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

// 播放控制
const togglePlay = () => {
  if (!audioPlayer.value || !currentSong.value) return
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play().catch(() => {
      console.log('播放失败')
    })
  }
}

const playSong = (song: any) => {
  currentSong.value = song
  setTimeout(() => {
    audioPlayer.value?.play().catch(() => {
      console.log('播放失败')
    })
  }, 100)
}

const prevSong = () => {
  const index = defaultHotSongs.findIndex(s => s.id === currentSong.value?.id)
  const prevIndex = index <= 0 ? defaultHotSongs.length - 1 : index - 1
  playSong(defaultHotSongs[prevIndex])
}

const nextSong = () => {
  const index = defaultHotSongs.findIndex(s => s.id === currentSong.value?.id)
  const nextIndex = index >= defaultHotSongs.length - 1 ? 0 : index + 1
  playSong(defaultHotSongs[nextIndex])
}

// 进度控制
const onTimeUpdate = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime
  }
}

const onLoadedMetadata = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration
  }
}

const seekProgress = (e: MouseEvent) => {
  if (!progressBar.value || !audioPlayer.value) return
  const rect = progressBar.value.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  audioPlayer.value.currentTime = percent * duration.value
}

const onEnded = () => {
  nextSong()
}

const onError = () => {
  console.log('音频加载失败')
  setTimeout(nextSong, 1000)
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
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

/* 搜索区域 */
.search-section {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--vp-c-bg);
  border-radius: 20px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
}

.search-box:focus-within {
  border-color: var(--vp-c-brand);
}

.search-icon-svg {
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-2);
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 13px;
  outline: none;
}

.search-box input::placeholder {
  color: var(--vp-c-text-2);
}

.clear-search {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-text-2);
  color: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0;
}

.clear-search:hover {
  opacity: 1;
}

.clear-search svg {
  width: 12px;
  height: 12px;
}

/* 搜索下拉框 */
.search-dropdown {
  max-height: 160px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.dropdown-section {
  padding: 8px 0;
}

.dropdown-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}

.result-count {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 8px;
}

.dropdown-list {
  padding: 0 8px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 2px;
}

.dropdown-item:hover {
  background: var(--vp-c-bg-mute);
}

.dropdown-item.active {
  background: var(--vp-c-brand-soft);
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-artist {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.play-status {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.play-status svg {
  width: 18px;
  height: 18px;
  fill: var(--vp-c-brand);
}

.dropdown-item:hover .play-status,
.dropdown-item.active .play-status {
  opacity: 1;
}

.playing-icon {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 当前播放 */
.now-playing {
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.song-info {
  text-align: center;
}

.song-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.song-artist {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

/* 进度条 */
.progress-section {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
}

.time {
  font-size: 10px;
  color: var(--vp-c-text-2);
  min-width: 32px;
  font-variant-numeric: tabular-nums;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.1s;
}

/* 控制按钮 */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 16px 16px;
}

.ctrl-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.ctrl-btn:hover {
  background: var(--vp-c-brand);
  color: #fff;
  transform: scale(1.1);
}

.ctrl-btn svg {
  width: 20px;
  height: 20px;
}

.play-btn {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.play-btn svg {
  width: 24px;
  height: 24px;
}

/* 深色模式 */
.dark .player-circle {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.dark .player-expanded {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* 滚动条 */
.search-dropdown::-webkit-scrollbar {
  width: 4px;
}

.search-dropdown::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}
</style>
