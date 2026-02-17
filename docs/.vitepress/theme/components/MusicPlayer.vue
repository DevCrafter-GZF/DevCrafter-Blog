<!--
 * @Author: GZF
 * @Description: 悬浮网易云音乐播放器组件 - 优化版
-->

<template>
  <Teleport to="body">
    <div
        :class="{
        'expanded': isExpanded,
        'playing': isPlaying,
        'dragging': isDragging
      }"
        :style="positionStyle"
        class="music-player-float"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
      <!-- 圆形状态 -->
      <div
          v-if="!isExpanded"
          class="player-circle"
          @mousedown="startDrag"
          @click.stop="handleCircleClick"
      >
        <div :class="{ 'rotating': isPlaying }" class="album-rotate">
          <img :src="currentSong?.cover || defaultCover" alt="album">
        </div>

        <div :class="{ 'show': showPlayOverlay }" class="play-overlay">
          <svg v-if="isPlaying" class="overlay-icon" fill="currentColor" viewBox="0 0 24 24">
            <rect height="16" width="4" x="6" y="4"/>
            <rect height="16" width="4" x="14" y="4"/>
          </svg>
          <svg v-else class="overlay-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>

        <div v-if="isHovered" class="hover-hint">
          <span>{{ isPlaying ? '点击暂停' : '点击播放' }}</span>
        </div>

        <div v-if="isPlaying" class="sound-waves">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- 展开状态 -->
      <div
          v-else
          class="player-expanded"
          @mouseenter="clearCollapseTimer"
          @mouseleave="startCollapseTimer"
          @click.stop
      >
        <!-- 头部 -->
        <div class="player-header" @mousedown="startDrag">
          <div class="header-title">
            <svg class="title-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <span>音乐</span>
          </div>
          <button class="header-btn" title="收起" @click="collapse">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- 搜索区域 -->
        <div class="search-section">
          <div class="search-box">
            <svg class="search-icon-svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
                v-model="searchKeyword"
                placeholder="搜索歌曲..."
                type="text"
                @blur="onSearchBlur"
                @focus="onSearchFocus"
                @input="onSearchInput"
                @keyup.enter="searchMusic"
            >
            <button v-if="searchKeyword" class="clear-search" @click="clearSearch">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
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
                  :class="{ 'active': currentSong?.id === song.id }"
                  class="dropdown-item"
                  @click="playSong(song)"
              >
                <img :src="song.cover" class="item-cover">
                <div class="item-info">
                  <div class="item-name">{{ song.name }}</div>
                  <div class="item-artist">{{ song.artist }}</div>
                </div>
                <div class="play-status">
                  <svg v-if="currentSong?.id === song.id && isPlaying" class="playing-icon" fill="currentColor"
                       viewBox="0 0 24 24">
                    <rect height="16" width="4" x="4" y="4"/>
                    <rect height="16" width="4" x="10" y="4"/>
                    <rect height="16" width="4" x="16" y="4"/>
                  </svg>
                  <svg v-else fill="currentColor" viewBox="0 0 24 24">
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
              <button :disabled="loadingHot" class="refresh-btn" @click="refreshHotSongs">
                <svg :class="{ 'spinning': loadingHot }" fill="none" stroke="currentColor" stroke-width="2"
                     viewBox="0 0 24 24">
                  <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
              </button>
            </div>
            <div class="dropdown-list">
              <div v-if="loadingHot" class="loading-state">
                <span class="loading-spinner"></span>
              </div>
              <template v-else>
                <div
                    v-for="song in hotSongs"
                    :key="song.id"
                    :class="{ 'active': currentSong?.id === song.id }"
                    class="dropdown-item"
                    @click="playSong(song)"
                >
                  <img :src="song.cover" class="item-cover">
                  <div class="item-info">
                    <div class="item-name">{{ song.name }}</div>
                    <div class="item-artist">{{ song.artist }}</div>
                  </div>
                  <div class="play-status">
                    <svg v-if="currentSong?.id === song.id && isPlaying" class="playing-icon" fill="currentColor"
                         viewBox="0 0 24 24">
                      <rect height="16" width="4" x="4" y="4"/>
                      <rect height="16" width="4" x="10" y="4"/>
                      <rect height="16" width="4" x="16" y="4"/>
                    </svg>
                    <svg v-else fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 当前播放 -->
        <div v-if="currentSong" class="now-playing">
          <div class="album-section">
            <img :class="{ 'rotating': isPlaying }" :src="currentSong.cover" class="current-cover" @error="handleImageError">
          </div>
          <div class="song-info">
            <div class="song-name">{{ currentSong.name }}</div>
            <div class="song-artist">{{ currentSong.artist }}</div>
          </div>
        </div>

        <!-- 进度条 -->
        <div v-if="currentSong" class="progress-section">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <div ref="progressBar" class="progress-bar" @click="seekProgress">
            <div :style="{ width: progressPercent + '%' }" class="progress-fill"></div>
          </div>
          <span class="time">{{ formatTime(duration) }}</span>
        </div>

        <!-- 控制按钮 -->
        <div class="controls">
          <button :title="playModeText" class="ctrl-btn" @click="toggleMode">
            <svg v-if="playMode === 'sequence'" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
            <svg v-else-if="playMode === 'random'" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
            <svg v-else fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-2-6v2h2v-2h-2z"/>
            </svg>
          </button>

          <button class="ctrl-btn" title="上一首" @click="prevSong">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          <button :title="isPlaying ? '暂停' : '播放'" class="ctrl-btn play-btn" @click="togglePlay">
            <svg v-if="isPlaying" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
            <svg v-else fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>

          <button class="ctrl-btn" title="下一首" @click="nextSong">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>

          <button :class="{ 'active': showPlaylist }" class="ctrl-btn" title="播放列表"
                  @click="showPlaylist = !showPlaylist">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
            <span v-if="playlist.length > 0" class="list-badge">{{ playlist.length }}</span>
          </button>
        </div>

        <!-- 播放列表 -->
        <div v-if="showPlaylist" class="playlist-panel">
          <div class="playlist-header">
            <span>播放列表 ({{ playlist.length }})</span>
            <button class="close-btn" @click="showPlaylist = false">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="playlist-content">
            <div
                v-for="(song, index) in playlist"
                :key="song.id"
                :class="{ 'active': currentSong?.id === song.id }"
                class="playlist-item"
                @click="playSong(song)"
            >
              <span class="item-number">{{ index + 1 }}</span>
              <div class="item-detail">
                <span class="item-title">{{ song.name }}</span>
                <span class="item-singer">{{ song.artist }}</span>
              </div>
              <span v-if="currentSong?.id === song.id && isPlaying" class="playing-indicator">
                <span></span><span></span><span></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 音频元素 -->
    <audio
        ref="audioPlayer"
        :src="audioUrl"
        @ended="onEnded"
        @error="onError"
        @loadedmetadata="onLoadedMetadata"
        @pause="isPlaying = false"
        @play="isPlaying = true"
        @timeupdate="onTimeUpdate"
    ></audio>
  </Teleport>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, onUnmounted} from 'vue'
// 默认封面 - 使用可靠的默认图片
const defaultCover = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23667eea" width="100" height="100"/%3E%3Ccircle fill="%23764ba2" cx="50" cy="50" r="30"/%3E%3Ccircle fill="%23fff" cx="50" cy="50" r="10"/%3E%3C/svg%3E'

// 处理图片加载失败
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = defaultCover
}

// 状态
const isExpanded = ref(false)
const isPlaying = ref(false)
const isDragging = ref(false)
const isHovered = ref(false)
const showPlaylist = ref(false)
const showDropdown = ref(false)
const showPlayOverlay = ref(false)
const loadingHot = ref(false)
const currentSong = ref<any>(null)
const playlist = ref<any[]>([])
const hotSongs = ref<any[]>([])
const playMode = ref<'sequence' | 'random' | 'single'>('sequence')
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
const playerHeight = 420  // 基础高度（减小以适应屏幕）
const playerHeightWithPlaylist = 580  // 显示播放列表时的高度
const circleSize = 64

// 音频元素
const audioPlayer = ref<HTMLAudioElement>()
const progressBar = ref<HTMLElement>()

// 初始化
onMounted(() => {
  // 初始位置：右下角（圆形中心点）
  const initialX = window.innerWidth - circleSize / 2 - 20
  const initialY = window.innerHeight - circleSize / 2 - 20
  position.value = { x: initialX, y: initialY }
  // 加载热门歌曲
  loadHotSongs()
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  clearAllTimers()
  window.removeEventListener('resize', handleResize)
})

// 获取当前展开高度
const getExpandedHeight = () => {
  return showPlaylist.value ? playerHeightWithPlaylist : playerHeight
}

// 窗口大小变化时调整位置
const handleResize = () => {
  if (isExpanded.value) {
    // 展开状态：确保不超出视口
    const currentHeight = getExpandedHeight()
    const maxX = window.innerWidth - playerWidth - 20
    const maxY = window.innerHeight - currentHeight - 20
    position.value = {
      x: Math.min(position.value.x, maxX),
      y: Math.min(position.value.y, maxY)
    }
  } else {
    // 圆形状态：确保不超出视口
    const maxX = window.innerWidth - circleSize / 2 - 20
    const maxY = window.innerHeight - circleSize / 2 - 20
    position.value = {
      x: Math.min(position.value.x, maxX),
      y: Math.min(position.value.y, maxY)
    }
  }
}



// 加载热门歌曲 - 使用缓存
const loadHotSongs = async () => {
  // 先使用本地缓存
  const cached = sessionStorage.getItem('music_hot_songs')
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      hotSongs.value = parsed.map((s: any) => ({...s, cover: s.cover || defaultCover}))
      if (!currentSong.value && hotSongs.value.length > 0) {
        currentSong.value = hotSongs.value[0]
        playlist.value = [...hotSongs.value]
      }
    } catch (e) {
      console.log('缓存解析失败')
    }
  }

  // 如果缓存为空，使用默认数据
  if (hotSongs.value.length === 0) {
    hotSongs.value = [
      {id: '25706282', name: '起风了', artist: '买辣椒也用券', cover: defaultCover},
      {id: '1293886117', name: '体面', artist: '于文文', cover: defaultCover},
      {id: '863046037', name: '告白气球', artist: '周杰伦', cover: defaultCover},
      {id: '1293951677', name: '追光者', artist: '岑宁儿', cover: defaultCover},
      {id: '27808044', name: '平凡之路', artist: '朴树', cover: defaultCover},
      {id: '186016', name: '晴天', artist: '周杰伦', cover: defaultCover}
    ]
    if (!currentSong.value) {
      currentSong.value = hotSongs.value[0]
      playlist.value = [...hotSongs.value]
    }
  }

  // 后台异步更新
  fetchHotSongs()
}

// 获取热门歌曲
const fetchHotSongs = async () => {
  loadingHot.value = true
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch('https://cloud-music-api-f494k233t-azhe403.vercel.app/personalized/newsong?limit=8', {
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    const data = await response.json()

    if (data.result) {
      hotSongs.value = data.result.map((item: any) => {
        const coverUrl = item.picUrl || item.album?.picUrl
        return {
          id: item.id.toString(),
          name: item.name,
          artist: item.artists?.map((a: any) => a.name).join('/') || '未知歌手',
          cover: coverUrl && coverUrl.startsWith('http') ? coverUrl : defaultCover
        }
      })
      // 缓存到 sessionStorage
      sessionStorage.setItem('music_hot_songs', JSON.stringify(hotSongs.value))
    }
  } catch (error) {
    console.log('API获取失败，使用默认数据')
  } finally {
    loadingHot.value = false
  }
}

// 刷新热门歌曲
const refreshHotSongs = () => {
  sessionStorage.removeItem('music_hot_songs')
  fetchHotSongs()
}

// 清除所有定时器
const clearAllTimers = () => {
  if (expandTimer) clearTimeout(expandTimer)
  if (collapseTimer) clearTimeout(collapseTimer)
  if (overlayTimer) clearTimeout(overlayTimer)
}

// 计算属性
const positionStyle = computed(() => {
  // 圆形状态：position 是中心点，需要偏移
  // 展开状态：position 是左上角，不需要偏移
  const x = position.value.x
  const y = position.value.y

  return {
    left: `${x}px`,
    top: `${y}px`,
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

const playModeText = computed(() => {
  const texts = {sequence: '顺序播放', random: '随机播放', single: '单曲循环'}
  return texts[playMode.value]
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
  // 计算展开位置，确保不超出视口
  const currentX = position.value.x
  const currentY = position.value.y
  
  // 计算展开后的最大允许位置（使用基础高度）
  const maxX = window.innerWidth - playerWidth - 20
  const maxY = window.innerHeight - playerHeight - 20
  
  // 调整位置：如果太靠右，向左移动；如果太靠下，向上移动
  let newX = Math.min(currentX, maxX)
  let newY = Math.min(currentY, maxY)
  
  // 确保不小于最小边距
  newX = Math.max(20, newX)
  newY = Math.max(20, newY)

  position.value = { x: newX, y: newY }

  isExpanded.value = true
  showDropdown.value = true
}

const collapse = () => {
  isExpanded.value = false
  showPlaylist.value = false
  showDropdown.value = false
  searchKeyword.value = ''
  searchResults.value = []
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

const onSearchInput = () => {
  if (searchKeyword.value.trim()) {
    searchMusic()
  } else {
    searchResults.value = []
  }
}

const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = []
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

  // 计算新位置
  let newX = e.clientX - dragOffset.value.x
  let newY = e.clientY - dragOffset.value.y
  
  // 根据状态限制边界
  if (isExpanded.value) {
    // 展开状态：position 是左上角
    const currentHeight = getExpandedHeight()
    const maxX = window.innerWidth - playerWidth - 20
    const maxY = window.innerHeight - currentHeight - 20
    newX = Math.max(20, Math.min(maxX, newX))
    newY = Math.max(20, Math.min(maxY, newY))
  } else {
    // 圆形状态：position 是中心点
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
  if (!playlist.value.find(s => s.id === song.id)) {
    playlist.value.push(song)
  }
  setTimeout(() => {
    audioPlayer.value?.play().catch(() => {
      console.log('播放失败')
    })
  }, 100)
}

const prevSong = () => {
  if (playlist.value.length === 0) return
  const index = playlist.value.findIndex(s => s.id === currentSong.value?.id)
  const prevIndex = index <= 0 ? playlist.value.length - 1 : index - 1
  playSong(playlist.value[prevIndex])
}

const nextSong = () => {
  if (playlist.value.length === 0) return
  if (playMode.value === 'random') {
    const randomIndex = Math.floor(Math.random() * playlist.value.length)
    playSong(playlist.value[randomIndex])
  } else {
    const index = playlist.value.findIndex(s => s.id === currentSong.value?.id)
    const nextIndex = index >= playlist.value.length - 1 ? 0 : index + 1
    playSong(playlist.value[nextIndex])
  }
}

const toggleMode = () => {
  const modes: ('sequence' | 'random' | 'single')[] = ['sequence', 'random', 'single']
  const currentIndex = modes.indexOf(playMode.value)
  playMode.value = modes[(currentIndex + 1) % 3]
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
  if (playMode.value === 'single') {
    audioPlayer.value?.play()
  } else {
    nextSong()
  }
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

// 搜索
const searchMusic = async () => {
  if (!searchKeyword.value.trim()) return

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`https://cloud-music-api-f494k233t-azhe403.vercel.app/search?keywords=${encodeURIComponent(searchKeyword.value)}&limit=8`, {
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    const data = await response.json()

    if (data.result?.songs) {
      searchResults.value = data.result.songs.map((song: any) => {
        const coverUrl = song.album?.picUrl
        return {
          id: song.id.toString(),
          name: song.name,
          artist: song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
          cover: coverUrl && coverUrl.startsWith('http') ? coverUrl : defaultCover
        }
      })
    } else {
      searchResults.value = []
    }
  } catch (error) {
    console.log('搜索失败')
    searchResults.value = []
  }
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
  overflow: hidden;
  animation: rotate 15s linear infinite;
  animation-play-state: paused;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.album-rotate.rotating {
  animation-play-state: running;
}

.album-rotate img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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

.sound-waves span:nth-child(1) {
  height: 8px;
  animation-delay: 0s;
}

.sound-waves span:nth-child(2) {
  height: 12px;
  animation-delay: 0.15s;
}

.sound-waves span:nth-child(3) {
  height: 10px;
  animation-delay: 0.3s;
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
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
  max-height: 180px;
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

.refresh-btn {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.refresh-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 14px;
  height: 14px;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.dropdown-list {
  padding: 0 8px;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
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

.item-cover {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
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
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 当前播放 */
.now-playing {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.album-section {
  position: relative;
  width: 60px;
  height: 60px;
}

.current-cover {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  animation: rotate 15s linear infinite;
  animation-play-state: paused;
  border: 2px solid var(--vp-c-divider);
}

.current-cover.rotating {
  animation-play-state: running;
}

.song-info {
  flex: 1;
  min-width: 0;
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
  padding: 0 16px 12px;
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
  gap: 12px;
  padding: 0 16px 16px;
}

.ctrl-btn {
  width: 36px;
  height: 36px;
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

.ctrl-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
}

.ctrl-btn svg {
  width: 18px;
  height: 18px;
}

.play-btn {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.play-btn svg {
  width: 24px;
  height: 24px;
}

.list-btn {
  position: relative;
}

.list-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 9px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 播放列表 */
.playlist-panel {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  max-height: 200px;
  display: flex;
  flex-direction: column;
}

.playlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.close-btn {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.close-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.close-btn svg {
  width: 14px;
  height: 14px;
}

.playlist-content {
  overflow-y: auto;
  padding: 6px;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 12px;
}

.playlist-item:hover {
  background: var(--vp-c-bg-mute);
}

.playlist-item.active {
  background: var(--vp-c-brand-soft);
}

.item-number {
  width: 20px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 11px;
}

.item-detail {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--vp-c-text-1);
}

.item-singer {
  font-size: 10px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playing-indicator {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 14px;
}

.playing-indicator span {
  width: 2px;
  background: var(--vp-c-brand);
  border-radius: 1px;
  animation: soundBar 0.5s ease-in-out infinite;
}

.playing-indicator span:nth-child(1) {
  height: 6px;
  animation-delay: 0s;
}

.playing-indicator span:nth-child(2) {
  height: 12px;
  animation-delay: 0.1s;
}

.playing-indicator span:nth-child(3) {
  height: 8px;
  animation-delay: 0.2s;
}

@keyframes soundBar {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}

/* 深色模式 */
.dark .player-circle {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.dark .player-expanded {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* 滚动条 */
.search-dropdown::-webkit-scrollbar,
.playlist-content::-webkit-scrollbar {
  width: 4px;
}

.search-dropdown::-webkit-scrollbar-thumb,
.playlist-content::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}
</style>
