<!--
 * @Author: GZF
 * @Description: 悬浮音乐球组件 - 支持网易云音乐搜索（已适配移动端）
-->

<template>
  <Teleport to="body">
    <div
        :class="{
        'expanded': isExpanded,
        'playing': isPlaying,
        'dragging': isDragging,
        'mobile': isMobile
      }"
        :style="positionStyle"
        class="music-ball"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
      <!-- 圆形悬浮球 -->
      <div
          v-if="!isExpanded"
          class="ball"
          @mousedown="startDrag"
          @touchend="handleTouchEnd"
          @touchstart.prevent="handleTouchStart"
          @click.stop="handleBallClick"
      >
        <div :class="{ 'rotating': isPlaying }" class="ball-inner">
          <img v-if="currentSong?.cover" :src="currentSong.cover" alt="" class="ball-cover">
          <svg v-else class="music-icon" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <div v-if="isPlaying" class="playing-waves">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- 展开面板 -->
      <div
          v-else
          class="panel"
          @mouseenter="clearCollapseTimer"
          @mouseleave="startCollapseTimer"
          @click.stop
      >
        <!-- 移动端遮罩层 -->
        <div v-if="isMobile" class="mobile-overlay" @click="collapse"></div>
        <!-- 头部 -->
        <div class="panel-header" @mousedown="startDrag">
          <div class="now-playing">
            <img v-if="currentSong?.cover" :src="currentSong.cover" alt="" class="np-cover">
            <div class="np-info">
              <div class="np-name">{{ currentSong?.name || '未播放' }}</div>
              <div class="np-artist">{{ currentSong?.artist || '搜索添加歌曲' }}</div>
            </div>
          </div>
          <button class="close-btn" @click="collapse">×</button>
        </div>

        <!-- 搜索 -->
        <div class="search-area">
          <div class="search-box">
            <input
                v-model="searchKeyword"
                placeholder="搜索歌曲、歌手..."
                type="text"
                @keyup.enter="searchMusic"
            >
            <button :disabled="isSearching" @click="searchMusic">
              <span v-if="!isSearching">🔍</span>
              <span v-else class="loading"></span>
            </button>
          </div>

        </div>

        <!-- 搜索结果下拉框 - 在搜索框下方展开 -->
        <div v-if="showSearchResults" class="search-dropdown" @click.stop>
          <div class="search-dropdown-header">
            <span>搜索结果 ({{ searchResults.length }})</span>
            <button @click="showSearchResults = false">×</button>
          </div>
          <div class="search-dropdown-list">
            <div
                v-for="song in searchResults"
                :key="song.id"
                class="search-dropdown-item"
                @click="playSongImmediately(song)"
            >
              <div class="search-dropdown-info">
                <div class="search-dropdown-name">{{ song.name }}</div>
                <div class="search-dropdown-artist">{{ song.artist }}</div>
              </div>
              <span class="search-dropdown-play">▶</span>
            </div>
            <div v-if="searchResults.length === 0 && hasSearched" class="search-dropdown-empty">
              未找到相关歌曲
            </div>
          </div>
        </div>

        <!-- 播放列表 -->
        <div class="playlist">
          <div class="pl-header">
            <span>播放列表 ({{ playlist.length }})</span>
            <button v-if="playlist.length > 0" @click="clearPlaylist">清空</button>
          </div>
          <div class="pl-list">
            <div
                v-for="(song, index) in playlist"
                :key="song.id"
                :class="{ 'active': currentIndex === index }"
                class="pl-item"
                @click="playByIndex(index)"
            >
              <span class="num">{{ index + 1 }}</span>
              <div class="info">
                <div class="name">{{ song.name }}</div>
                <div class="artist">{{ song.artist }}</div>
              </div>
              <button class="del" @click.stop="removeSong(index)">×</button>
            </div>
            <div v-if="playlist.length === 0" class="empty">
              搜索歌曲添加到你的播放列表
            </div>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="controls">
          <button title="上一首" @click="prevSong">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button :title="isPlaying ? '暂停' : '播放'" class="play-btn" @click="togglePlay">
            <svg v-if="isPlaying" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
            <svg v-else fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <button title="下一首" @click="nextSong">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        <!-- 进度条 -->
        <div ref="progressRef" class="progress-bar" @click="seek">
          <div :style="{ width: progress + '%' }" class="progress-fill"></div>
        </div>
        <div class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
      </div>

      <!-- 音频元素 -->
      <audio
          ref="audioRef"
          :src="currentSong?.url"
          @ended="onEnded"
          @loadedmetadata="onLoadedMetadata"
          @pause="isPlaying = false"
          @play="isPlaying = true"
          @timeupdate="onTimeUpdate"
      ></audio>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, onUnmounted, watch} from 'vue'

// 本地默认音乐（使用免费音乐URL）
const defaultSongs = [
  {id: '25706282', name: '起风了', artist: '买辣椒也用券', cover: '', url: ''},
  {id: '1293886117', name: '体面', artist: '于文文', cover: '', url: ''},
  {id: '863046037', name: '告白气球', artist: '周杰伦', cover: '', url: ''},
]

// 状态
const isExpanded = ref(false)
const isPlaying = ref(false)
const isDragging = ref(false)
const isMobile = ref(false)
const searchKeyword = ref('')
const searchResults = ref<any[]>([])
const showSearchResults = ref(false)
const isSearching = ref(false)
const hasSearched = ref(false)
const playlist = ref<any[]>([])
const currentIndex = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

// 位置
const position = ref({x: 0, y: 0})
const dragOffset = ref({x: 0, y: 0})
const ballSize = 48  // 与回到顶部按钮一致 48px
const panelWidth = 320
const panelHeight = 500

// Refs
const audioRef = ref<HTMLAudioElement>()
const progressRef = ref<HTMLElement>()

// 定时器
let expandTimer: any = null
let collapseTimer: any = null

// 当前歌曲
const currentSong = computed(() => playlist.value[currentIndex.value] || null)

// 位置样式 - 使用bottom定位避免滚动时跟随
const positionStyle = computed(() => {
  // SSR 兼容性检查
  if (typeof window === 'undefined') {
    return {
      left: 'auto',
      top: 'auto',
      right: '20px',
      bottom: '20px',
      transform: 'translate(0, 0)'
    }
  }
  
  if (isExpanded.value) {
    return {
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
      transform: 'translate(0, 0)'
    }
  } else {
    // 悬浮球状态使用bottom/right定位
    const bottom = window.innerHeight - position.value.y - ballSize / 2
    const right = window.innerWidth - position.value.x - ballSize / 2
    return {
      left: 'auto',
      top: 'auto',
      right: `${right}px`,
      bottom: `${bottom}px`,
      transform: 'translate(0, 0)'
    }
  }
})

// 回到顶部按钮的尺寸和间距（用于计算位置）
const backToTopSize = 48  // 与播放器一致
const backToTopGap = 10   // 间距 10px
const backToTopOffset = backToTopSize + backToTopGap  // 总间距 = 48 + 10 = 58px

// 初始化
onMounted(() => {
  // 检测是否为移动端
  checkMobile()
  window.addEventListener('resize', handleResize)

  // 设置初始位置（考虑回到顶部按钮）
  setDefaultPosition()

  // 加载默认本地音乐
  playlist.value = [...defaultSongs]
})

// 设置默认位置 - 播放器在回到顶部右侧，两者都在右下角
const setDefaultPosition = () => {
  // 播放器在回到顶部按钮的右侧，间距 10px
  // 回到顶部在左 (right: 20px + 48px + 10px = 78px)
  // 播放器在右 (right: 20px)
  const rightOffset = 20  // 播放器距离右边 20px
  const backToTopTotalWidth = backToTopSize + backToTopGap  // 48 + 10 = 58px
  
  position.value = {
    x: window.innerWidth - ballSize / 2 - rightOffset,
    y: window.innerHeight - ballSize / 2 - 20
  }
}

// 更新拖拽后的位置（从bottom/right转换回x/y）
const updatePositionFromBottomRight = (bottom: number, right: number) => {
  position.value = {
    x: window.innerWidth - right - ballSize / 2,
    y: window.innerHeight - bottom - ballSize / 2
  }
}

// 检测移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768 || 'ontouchstart' in window
}

onUnmounted(() => {
  clearAllTimers()
  window.removeEventListener('resize', handleResize)
})

// 获取歌曲详情
const fetchSongDetail = async (id: string, index?: number) => {
  try {
    const response = await fetch(`https://api.paugram.com/netease/?id=${id}`)
    const data = await response.json()
    if (data.title) {
      const songData = {
        id,
        name: data.title,
        artist: data.artist,
        cover: data.cover?.replace('250y250', '100y100') || '',
        url: data.url || `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      }
      if (index !== undefined) {
        playlist.value[index] = songData
      }
      return songData
    }
  } catch (e) {
    console.log('获取歌曲详情失败:', id)
  }
  return null
}

// 搜索音乐
const searchMusic = async () => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) return

  isSearching.value = true
  hasSearched.value = false
  searchResults.value = []

  // 尝试多个搜索API（优先使用可用的）
  const searchApis = [
    // API 1: 使用 music-api.heheda.top（已知可用）
    async () => {
      const response = await fetch(`https://music-api.heheda.top/search?keywords=${encodeURIComponent(keyword)}&limit=10`)
      const data = await response.json()
      if (data.result?.songs) {
        return data.result.songs.map((song: any) => ({
          id: song.id.toString(),
          name: song.name,
          artist: song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
          cover: song.album?.picUrl?.replace('250y250', '100y100') || '',
          url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
        }))
      }
      return null
    },
    // API 2: 使用 meting-api
    async () => {
      const response = await fetch(`https://api-meting.linweiqin.com/search?keywords=${encodeURIComponent(keyword)}&limit=10`)
      const data = await response.json()
      if (data.data?.songs) {
        return data.data.songs.map((song: any) => ({
          id: song.id.toString(),
          name: song.name,
          artist: song.ar?.map((a: any) => a.name).join('/') || '未知歌手',
          cover: song.al?.picUrl?.replace('250y250', '100y100') || '',
          url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
        }))
      }
      return null
    },
    // API 3: 使用网易云官方搜索（通过跨域代理）
    async () => {
      const response = await fetch(`https://netease-cloud-music-api-five-roan.vercel.app/search?keywords=${encodeURIComponent(keyword)}&limit=10`)
      const data = await response.json()
      if (data.result?.songs) {
        return data.result.songs.map((song: any) => ({
          id: song.id.toString(),
          name: song.name,
          artist: song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
          cover: song.album?.picUrl?.replace('250y250', '100y100') || '',
          url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
        }))
      }
      return null
    }
  ]

  for (const apiFn of searchApis) {
    try {
      const results = await apiFn()
      if (results && results.length > 0) {
        searchResults.value = results
        hasSearched.value = true
        showSearchResults.value = true
        break
      }
    } catch (e) {
      console.log('当前API失败，尝试下一个...')
    }
  }

  isSearching.value = false
}

// 播放歌曲（添加到列表）
const playSong = async (song: any) => {
  // 获取完整详情
  const detail = await fetchSongDetail(song.id)
  if (detail) {
    song = {...song, ...detail}
  }

  // 检查是否已在列表中
  const existingIndex = playlist.value.findIndex(s => s.id === song.id)
  if (existingIndex !== -1) {
    currentIndex.value = existingIndex
    playlist.value[existingIndex] = {...playlist.value[existingIndex], ...song}
  } else {
    playlist.value.push(song)
    currentIndex.value = playlist.value.length - 1
  }

  showSearchResults.value = false
  searchKeyword.value = ''

  // 播放
  setTimeout(() => {
    audioRef.value?.play()
  }, 100)
}

// 点击搜索结果直接播放（不添加到列表，直接替换当前播放）
const playSongImmediately = async (song: any) => {
  // 构建完整的歌曲信息
  const songData = {
    id: song.id,
    name: song.name,
    artist: song.artist,
    cover: song.cover || '',
    url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
  }

  // 检查是否已在列表中
  const existingIndex = playlist.value.findIndex(s => s.id === song.id)
  if (existingIndex !== -1) {
    // 如果已在列表，切换到该歌曲
    currentIndex.value = existingIndex
    playlist.value[existingIndex] = songData
  } else {
    // 如果不在列表，插入到当前位置之后
    playlist.value.splice(currentIndex.value + 1, 0, songData)
    currentIndex.value = currentIndex.value + 1
  }

  showSearchResults.value = false
  searchKeyword.value = ''

  // 立即播放
  setTimeout(() => {
    audioRef.value?.play()
  }, 100)
}

// 播放控制
const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
}

const prevSong = () => {
  if (playlist.value.length === 0) return
  currentIndex.value = currentIndex.value <= 0 ? playlist.value.length - 1 : currentIndex.value - 1
  setTimeout(() => audioRef.value?.play(), 100)
}

const nextSong = () => {
  if (playlist.value.length === 0) return
  currentIndex.value = currentIndex.value >= playlist.value.length - 1 ? 0 : currentIndex.value + 1
  setTimeout(() => audioRef.value?.play(), 100)
}

const playByIndex = (index: number) => {
  currentIndex.value = index
  setTimeout(() => audioRef.value?.play(), 100)
}

const removeSong = (index: number) => {
  if (playlist.value.length <= 1) {
    alert('至少保留一首歌曲')
    return
  }
  playlist.value.splice(index, 1)
  if (currentIndex.value >= playlist.value.length) {
    currentIndex.value = playlist.value.length - 1
  }
}

const clearPlaylist = () => {
  if (confirm('确定清空播放列表吗？')) {
    playlist.value = []
    currentIndex.value = 0
    isPlaying.value = false
  }
}

// 进度控制
const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    progress.value = duration.value ? (currentTime.value / duration.value) * 100 : 0
  }
}

const onLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
  }
}

const onEnded = () => {
  nextSong()
}

const seek = (e: MouseEvent) => {
  if (!progressRef.value || !audioRef.value || !duration.value) return
  const rect = progressRef.value.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  audioRef.value.currentTime = percent * duration.value
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '0:00'
  const m = Math.floor(time / 60)
  const s = Math.floor(time % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// 拖拽 - 鼠标
const startDrag = (e: MouseEvent) => {
  if (isMobile.value) return // 移动端禁用拖拽
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
  let x = e.clientX - dragOffset.value.x
  let y = e.clientY - dragOffset.value.y

  // 拖拽边界限制 - 播放器在回到顶部右侧，两者都在右下角
  // 左侧需要给回到顶部留出空间: 20px(边距) + 48px(按钮) + 10px(间距) = 78px
  const minX = ballSize / 2 + 20 + backToTopOffset
  const maxX = window.innerWidth - (isExpanded.value ? panelWidth : ballSize / 2) - 20
  const maxY = window.innerHeight - (isExpanded.value ? panelHeight : ballSize / 2) - 20

  x = Math.max(minX, Math.min(maxX, x))
  y = Math.max(20, Math.min(maxY, y))

  position.value = {x, y}
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 拖拽 - 触摸（移动端）
const startDragTouch = (e: TouchEvent) => {
  if (isExpanded.value) return // 展开状态下禁用拖拽
  isDragging.value = true
  const touch = e.touches[0]
  dragOffset.value = {
    x: touch.clientX - position.value.x,
    y: touch.clientY - position.value.y
  }
  document.addEventListener('touchmove', onDragTouch, {passive: false})
  document.addEventListener('touchend', stopDragTouch)
}

const onDragTouch = (e: TouchEvent) => {
  if (!isDragging.value) return
  e.preventDefault()

  const touch = e.touches[0]
  const moveX = Math.abs(touch.clientX - position.value.x)
  const moveY = Math.abs(touch.clientY - position.value.y)

  // 如果移动距离超过阈值，标记为已移动
  if (moveX > 5 || moveY > 5) {
    touchMoved = true
  }

  let x = touch.clientX - dragOffset.value.x
  let y = touch.clientY - dragOffset.value.y

  // 移动端拖拽边界 - 与PC端一致，播放器在回到顶部右侧
  const minX = ballSize / 2 + 20 + backToTopOffset
  const maxX = window.innerWidth - ballSize / 2 - 20
  const maxY = window.innerHeight - ballSize / 2 - 20

  x = Math.max(minX, Math.min(maxX, x))
  y = Math.max(20, Math.min(maxY, y))

  position.value = {x, y}
}

const stopDragTouch = () => {
  isDragging.value = false
  document.removeEventListener('touchmove', onDragTouch)
  document.removeEventListener('touchend', stopDragTouch)
}

// 展开/收起
const onMouseEnter = () => {
  if (collapseTimer) {
    clearTimeout(collapseTimer)
    collapseTimer = null
  }
  if (!isExpanded.value) {
    expandTimer = setTimeout(() => {
      expand()
    }, 800)
  }
}

const onMouseLeave = () => {
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
  }, 1000)  // 5秒后自动收起
}

const clearCollapseTimer = () => {
  if (collapseTimer) {
    clearTimeout(collapseTimer)
    collapseTimer = null
  }
}

const clearAllTimers = () => {
  if (expandTimer) clearTimeout(expandTimer)
  if (collapseTimer) clearTimeout(collapseTimer)
}

const expand = () => {
  if (isMobile.value) {
    // 移动端展开面板居中显示
    const mobilePanelWidth = Math.min(360, window.innerWidth - 32)
    const mobilePanelHeight = Math.min(500, window.innerHeight * 0.7)
    position.value = {
      x: (window.innerWidth - mobilePanelWidth) / 2,
      y: (window.innerHeight - mobilePanelHeight) / 2
    }
  } else {
    const maxX = window.innerWidth - panelWidth - 20
    const maxY = window.innerHeight - panelHeight - 20
    position.value = {
      x: Math.min(position.value.x, maxX),
      y: Math.min(position.value.y, maxY)
    }
  }
  isExpanded.value = true
}

const collapse = () => {
  isExpanded.value = false
  showSearchResults.value = false
  searchKeyword.value = ''

  // 归位到默认位置（考虑回到顶部按钮）
  setDefaultPosition()
}

// 移动端触摸处理
let longPressTimer: any = null
let touchStartTime = 0
let touchMoved = false

const handleTouchStart = (e: TouchEvent) => {
  touchStartTime = Date.now()
  touchMoved = false

  // 启动长按定时器
  longPressTimer = setTimeout(() => {
    if (!touchMoved) {
      expand()
    }
  }, 500)

  // 同时启动拖拽
  startDragTouch(e)
}

const handleTouchEnd = () => {
  const touchDuration = Date.now() - touchStartTime

  // 清除长按定时器
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }

  // 如果是短按且没有移动，则切换播放/暂停
  if (touchDuration < 500 && !touchMoved && !isExpanded.value) {
    togglePlay()
  }
}

const handleBallClick = (e: MouseEvent) => {
  // 如果正在拖拽，不触发点击
  if (isDragging.value) return

  if (expandTimer) {
    clearTimeout(expandTimer)
    expandTimer = null
  }

  // 阻止事件冒泡
  e.stopPropagation()

  // 切换播放/暂停
  togglePlay()
}

const handleResize = () => {
  checkMobile()
  if (isExpanded.value) {
    const maxX = window.innerWidth - (isMobile.value ? window.innerWidth - 32 : panelWidth) - 20
    const maxY = window.innerHeight - (isMobile.value ? window.innerHeight * 0.7 : panelHeight) - 20
    position.value = {
      x: Math.min(position.value.x, maxX),
      y: Math.min(position.value.y, maxY)
    }
  }
}
</script>

<style scoped>
.music-ball {
  position: fixed;
  z-index: 9999;
  user-select: none;
}

/* 悬浮球 - 48px 与回到顶部按钮一致 */
.ball {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;
}

.ball:hover {
  transform: scale(1.1);
}

.ball-inner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 10s linear infinite;
  animation-play-state: paused;
  overflow: hidden;
  position: relative;
}

.ball-inner.rotating {
  animation-play-state: running;
}

.ball-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.music-icon {
  width: 24px;
  height: 24px;
  fill: white;
}

.playing-waves {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  gap: 2px;
  z-index: 10;
}

.playing-waves span {
  width: 3px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  animation: wave 0.5s ease-in-out infinite;
}

.playing-waves span:nth-child(2) {
  animation-delay: 0.1s;
  height: 12px;
}

.playing-waves span:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}

/* 展开面板 */
.panel {
  width: 320px;
  background: var(--vp-c-bg);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: grab;
}

.now-playing {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.np-cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.np-info {
  flex: 1;
  min-width: 0;
}

.np-name {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.np-artist {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-top: 2px;
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 搜索区域 */
.search-area {
  position: relative;
}

.search-box {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.search-box input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  outline: none;
}

.search-box input:focus {
  border-color: var(--vp-c-brand);
}

.search-box button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 搜索结果下拉框 - 在播放器面板内部、搜索框下方展开 */
.search-dropdown {
  position: absolute;
  top: 140px; /* 搜索框下方40px */
  left: 16px;
  right: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 100;
  max-height: 160px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
}

.search-dropdown-header button {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-dropdown-header button:hover {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger);
}

.search-dropdown-list {
  overflow-y: auto;
  padding: 8px;
  max-height: 170px;
}

.search-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-dropdown-item:hover {
  background: var(--vp-c-bg-mute);
}

.search-dropdown-info {
  flex: 1;
  min-width: 0;
}

.search-dropdown-name {
  font-size: 13px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-dropdown-artist {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.search-dropdown-play {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand);
  font-size: 12px;
}

.search-dropdown-empty {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

/* 播放列表 */
.playlist {
  max-height: 200px;
  display: flex;
  flex-direction: column;
}

.pl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
}

.pl-header button {
  border: none;
  background: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 12px;
}

.pl-list {
  overflow-y: auto;
  padding: 8px;
  max-height: 150px;
}

.pl-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.pl-item:hover {
  background: var(--vp-c-bg-mute);
}

.pl-item.active {
  background: var(--vp-c-brand-soft);
}

.pl-item .num {
  width: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.pl-item .info {
  flex: 1;
  min-width: 0;
}

.pl-item .name {
  font-size: 13px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pl-item .artist {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.pl-item .del {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.pl-item:hover .del {
  opacity: 1;
}

.empty {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

/* 控制按钮 */
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.controls button {
  border: none;
  background: none;
  cursor: pointer;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.controls button:hover {
  color: var(--vp-c-brand);
}

.controls button svg {
  width: 24px;
  height: 24px;
}

.controls .play-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.controls .play-btn svg {
  width: 28px;
  height: 28px;
}

.controls .play-btn:hover {
  opacity: 0.9;
  color: #fff;
}

/* 进度条 */
.progress-bar {
  height: 4px;
  background: var(--vp-c-divider);
  margin: 0 16px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.1s;
}

.time {
  text-align: center;
  font-size: 11px;
  color: var(--vp-c-text-2);
  padding: 8px 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .music-ball {
    /* 移动端禁用hover效果 */
  }

  .music-ball.mobile .ball {
    width: 48px;
    height: 48px;
  }

  .music-ball.mobile .ball-inner {
    width: 40px;
    height: 40px;
  }

  .music-ball.mobile .music-icon {
    width: 24px;
    height: 24px;
  }

  .music-ball.mobile .panel {
    width: calc(100vw - 32px);
    max-width: 360px;
    max-height: 70vh;
    position: fixed;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
  }

  .music-ball.mobile .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .music-ball.mobile .search-dropdown {
    position: static;
    margin: 0 16px 12px;
    max-height: 200px;
  }

  .music-ball.mobile .playlist {
    max-height: 180px;
  }

  .music-ball.mobile .pl-list {
    max-height: 130px;
  }

  .music-ball.mobile .controls {
    padding: 16px;
    gap: 24px;
  }

  .music-ball.mobile .controls button svg {
    width: 28px;
    height: 28px;
  }

  .music-ball.mobile .controls .play-btn {
    width: 52px;
    height: 52px;
  }

  .music-ball.mobile .controls .play-btn svg {
    width: 32px;
    height: 32px;
  }

  .music-ball.mobile .progress-bar {
    margin: 0 16px;
    height: 6px;
  }

  .music-ball.mobile .time {
    padding: 12px 0;
    font-size: 12px;
  }

  /* 增大移动端触摸区域 */
  .music-ball.mobile .pl-item {
    padding: 12px 8px;
  }

  .music-ball.mobile .search-dropdown-item {
    padding: 14px 12px;
  }

  .music-ball.mobile .close-btn {
    width: 36px;
    height: 36px;
    font-size: 24px;
  }
}

/* 小屏幕手机额外优化 */
@media (max-width: 375px) {
  .music-ball.mobile .panel {
    width: calc(100vw - 24px);
    max-height: 75vh;
  }

  .music-ball.mobile .playlist {
    max-height: 150px;
  }

  .music-ball.mobile .pl-list {
    max-height: 100px;
  }
}

/* 深色模式 */
.dark .ball {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.dark .panel {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}
</style>
