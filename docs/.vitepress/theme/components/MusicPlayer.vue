<!--
 * @Author: GZF
 * @Description: 悬浮网易云音乐播放器组件 - 智能交互版
-->

<template>
  <Teleport to="body">
    <div
      class="music-player-float"
      :class="{
        'expanded': isExpanded,
        'playing': isPlaying,
        'dragging': isDragging,
        'hovered': isHovered
      }"
      :style="positionStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousedown="startDrag"
    >
      <!-- 圆形状态 -->
      <div v-if="!isExpanded" class="player-circle" @click.stop="handleCircleClick">
        <!-- 唱片旋转 -->
        <div class="album-rotate" :class="{ 'rotating': isPlaying }">
          <img :src="currentSong?.cover || defaultCover" alt="album">
        </div>
        
        <!-- 播放/暂停指示器 -->
        <div class="play-overlay" :class="{ 'show': showPlayOverlay }">
          <span class="play-icon">{{ isPlaying ? '⏸' : '▶' }}</span>
        </div>
        
        <!-- 悬浮提示 -->
        <div class="hover-hint" v-if="isHovered && !isExpanded">
          <span>{{ isPlaying ? '点击暂停' : '点击播放' }}</span>
          <span class="hint-sub">悬浮2秒展开</span>
        </div>
        
        <!-- 音频波纹 -->
        <div class="sound-waves" v-if="isPlaying">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      <!-- 展开状态 -->
      <div v-else class="player-expanded" @click.stop @mouseenter="clearCollapseTimer" @mouseleave="startCollapseTimer">
        <!-- 头部 -->
        <div class="player-header">
          <div class="header-title">
            <span class="music-icon">🎵</span>
            <span>音乐播放器</span>
          </div>
          <button class="header-btn minimize" @click="collapse" title="收起">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- 搜索区域 -->
        <div class="search-section">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchKeyword"
              @focus="onSearchFocus"
              @blur="onSearchBlur"
              @input="onSearchInput"
              @keyup.enter="searchMusic"
              placeholder="搜索歌曲、歌手..."
              type="text"
            >
            <button v-if="searchKeyword" class="clear-search" @click="clearSearch">✕</button>
          </div>
        </div>

        <!-- 搜索下拉框 -->
        <div v-if="showDropdown" class="search-dropdown" @mouseenter="clearCollapseTimer" @mouseleave="startCollapseTimer">
          <!-- 搜索结果 -->
          <div v-if="searchResults.length > 0" class="dropdown-section">
            <div class="dropdown-title">
              <span>🔍 搜索结果</span>
              <span class="result-count">{{ searchResults.length }}首</span>
            </div>
            <div class="dropdown-list">
              <div
                v-for="song in searchResults"
                :key="song.id"
                class="dropdown-item"
                :class="{ 'active': currentSong?.id === song.id }"
                @click="playSong(song)"
              >
                <img :src="song.cover" class="item-cover" loading="lazy">
                <div class="item-info">
                  <div class="item-name">{{ song.name }}</div>
                  <div class="item-artist">{{ song.artist }}</div>
                </div>
                <button class="item-play-btn">
                  <span v-if="currentSong?.id === song.id && isPlaying">♪</span>
                  <span v-else>▶</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 热门歌曲 -->
          <div v-else class="dropdown-section">
            <div class="dropdown-title">
              <span>🔥 热门推荐</span>
              <button class="refresh-btn" @click="refreshHotSongs" title="换一批" :disabled="loadingHot">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ 'spinning': loadingHot }">
                  <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
              </button>
            </div>
            <div class="dropdown-list">
              <div v-if="loadingHot" class="loading-state">
                <span class="loading-spinner"></span>
                <span>加载中...</span>
              </div>
              <template v-else>
                <div
                  v-for="song in hotSongs"
                  :key="song.id"
                  class="dropdown-item"
                  :class="{ 'active': currentSong?.id === song.id }"
                  @click="playSong(song)"
                >
                  <img :src="song.cover" class="item-cover" loading="lazy">
                  <div class="item-info">
                    <div class="item-name">{{ song.name }}</div>
                    <div class="item-artist">{{ song.artist }}</div>
                  </div>
                  <button class="item-play-btn">
                    <span v-if="currentSong?.id === song.id && isPlaying">♪</span>
                    <span v-else>▶</span>
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 当前播放 -->
        <div class="now-playing" v-if="currentSong">
          <div class="album-section">
            <img :src="currentSong.cover" class="current-cover" :class="{ 'rotating': isPlaying }" loading="lazy">
            <div class="vinyl-center"></div>
          </div>
          <div class="song-info">
            <div class="song-name" :title="currentSong.name">{{ currentSong.name }}</div>
            <div class="song-artist">{{ currentSong.artist }}</div>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="progress-section" v-if="currentSong">
          <span class="time current">{{ formatTime(currentTime) }}</span>
          <div class="progress-wrapper">
            <div class="progress-bar" @click="seekProgress" ref="progressBar">
              <div class="progress-bg"></div>
              <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
              <div class="progress-handle" :style="{ left: progressPercent + '%' }"></div>
            </div>
          </div>
          <span class="time total">{{ formatTime(duration) }}</span>
        </div>

        <!-- 控制按钮 -->
        <div class="controls">
          <button class="ctrl-btn mode-btn" @click="toggleMode" :title="playModeText">
            <span class="mode-icon">{{ playModeIcon }}</span>
          </button>
          
          <button class="ctrl-btn skip-btn" @click="prevSong" title="上一首">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          
          <button class="ctrl-btn play-btn-large" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
            <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          
          <button class="ctrl-btn skip-btn" @click="nextSong" title="下一首">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
          
          <button class="ctrl-btn list-btn" @click="showPlaylist = !showPlaylist" :class="{ 'active': showPlaylist }" title="播放列表">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
            <span class="list-badge" v-if="playlist.length > 0">{{ playlist.length }}</span>
          </button>
        </div>

        <!-- 播放列表 -->
        <Transition name="slide">
          <div v-if="showPlaylist" class="playlist-panel" @mouseenter="clearCollapseTimer" @mouseleave="startCollapseTimer">
            <div class="playlist-header">
              <span class="playlist-title">播放列表</span>
              <span class="playlist-count">{{ playlist.length }}首</span>
              <button class="close-playlist" @click="showPlaylist = false">✕</button>
            </div>
            <div class="playlist-content">
              <div
                v-for="(song, index) in playlist"
                :key="song.id"
                class="playlist-item"
                :class="{ 'active': currentSong?.id === song.id }"
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
        </Transition>
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
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'

// 默认封面
const defaultCover = 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'

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
const isSearching = ref(false)

// 定时器
let expandTimer: ReturnType<typeof setTimeout> | null = null
let collapseTimer: ReturnType<typeof setTimeout> | null = null
let overlayTimer: ReturnType<typeof setTimeout> | null = null

// 位置
const position = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })

// 音频元素
const audioPlayer = ref<HTMLAudioElement>()
const progressBar = ref<HTMLElement>()

// 初始化
onMounted(() => {
  position.value = {
    x: window.innerWidth - 80,
    y: window.innerHeight - 80
  }
  // 获取热门歌曲
  fetchHotSongs()
})

onUnmounted(() => {
  clearAllTimers()
})

// 获取热门歌曲
const fetchHotSongs = async () => {
  loadingHot.value = true
  try {
    // 使用网易云音乐 API 获取热门歌曲
    const response = await fetch('https://cloud-music-api-f494k233t-azhe403.vercel.app/personalized/newsong?limit=10')
    const data = await response.json()
    
    if (data.result) {
      hotSongs.value = data.result.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        artist: item.artists?.map((a: any) => a.name).join('/') || '未知歌手',
        cover: item.picUrl || item.album?.picUrl || defaultCover
      }))
    }
    
    // 设置默认歌曲和播放列表
    if (hotSongs.value.length > 0 && !currentSong.value) {
      currentSong.value = hotSongs.value[0]
      playlist.value = [...hotSongs.value]
    }
  } catch (error) {
    console.error('获取热门歌曲失败:', error)
    // 使用备用数据
    hotSongs.value = [
      { id: '25706282', name: '起风了', artist: '买辣椒也用券', cover: 'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg' },
      { id: '1293886117', name: '体面', artist: '于文文', cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg' },
      { id: '863046037', name: '告白气球', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' },
      { id: '1293951677', name: '追光者', artist: '岑宁儿', cover: 'https://p1.music.126.net/8N1fsMRm2L5HyZccc6I3ew==/109951163020571782.jpg' },
      { id: '27808044', name: '平凡之路', artist: '朴树', cover: 'https://p1.music.126.net/Wp4L-I7qwn_sX0SOe33Qrw==/109951163221161145.jpg' },
      { id: '186016', name: '晴天', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' }
    ]
    if (!currentSong.value) {
      currentSong.value = hotSongs.value[0]
      playlist.value = [...hotSongs.value]
    }
  } finally {
    loadingHot.value = false
  }
}

// 刷新热门歌曲
const refreshHotSongs = () => {
  fetchHotSongs()
}

// 清除所有定时器
const clearAllTimers = () => {
  if (expandTimer) clearTimeout(expandTimer)
  if (collapseTimer) clearTimeout(collapseTimer)
  if (overlayTimer) clearTimeout(overlayTimer)
}

// 监听展开状态
watch(isExpanded, (expanded) => {
  if (expanded) {
    const expandedWidth = 360
    const expandedHeight = 520
    position.value = {
      x: Math.max(20, Math.min(window.innerWidth - expandedWidth - 20, position.value.x)),
      y: Math.max(20, Math.min(window.innerHeight - expandedHeight - 20, position.value.y))
    }
    showDropdown.value = true
  } else {
    showDropdown.value = false
    searchResults.value = []
    searchKeyword.value = ''
    showPlaylist.value = false
  }
})

// 计算属性
const positionStyle = computed(() => {
  if (isExpanded.value) {
    return {
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
      transform: 'translate(0, 0)'
    }
  }
  return {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    transform: 'translate(-50%, -50%)'
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

const playModeIcon = computed(() => {
  const icons = { sequence: '🔁', random: '🔀', single: '🔂' }
  return icons[playMode.value]
})

const playModeText = computed(() => {
  const texts = { sequence: '顺序播放', random: '随机播放', single: '单曲循环' }
  return texts[playMode.value]
})

// 鼠标交互
const onMouseEnter = () => {
  isHovered.value = true
  // 清除收起定时器
  if (collapseTimer) {
    clearTimeout(collapseTimer)
    collapseTimer = null
  }
  // 2秒后展开
  if (!isExpanded.value) {
    expandTimer = setTimeout(() => {
      expand()
    }, 2000)
  }
}

const onMouseLeave = () => {
  isHovered.value = false
  // 清除展开定时器
  if (expandTimer) {
    clearTimeout(expandTimer)
    expandTimer = null
  }
  // 如果已展开，2秒后收起
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
  // 清除展开定时器，防止点击后展开
  if (expandTimer) {
    clearTimeout(expandTimer)
    expandTimer = null
  }
  togglePlay()
  // 显示播放状态提示
  showPlayOverlay.value = true
  if (overlayTimer) clearTimeout(overlayTimer)
  overlayTimer = setTimeout(() => {
    showPlayOverlay.value = false
  }, 1000)
}

// 展开/收起
const expand = () => {
  isExpanded.value = true
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
  if (isExpanded.value && !(e.target as HTMLElement).closest('.player-header')) return
  
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
  position.value = {
    x: Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragOffset.value.x)),
    y: Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragOffset.value.y))
  }
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
      console.log('播放失败，可能需要会员')
    })
  }
}

const playSong = (song: any) => {
  currentSong.value = song
  // 添加到播放列表（如果不存在）
  if (!playlist.value.find(s => s.id === song.id)) {
    playlist.value.push(song)
  }
  setTimeout(() => {
    audioPlayer.value?.play().catch(() => {
      console.log('播放失败，该歌曲可能需要会员')
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
  console.log('音频加载失败，自动播放下一首')
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
  if (!searchKeyword.value.trim() || isSearching.value) return
  
  isSearching.value = true
  
  try {
    const response = await fetch(`https://cloud-music-api-f494k233t-azhe403.vercel.app/search?keywords=${encodeURIComponent(searchKeyword.value)}&limit=10`)
    const data = await response.json()
    
    if (data.result?.songs) {
      searchResults.value = data.result.songs.map((song: any) => ({
        id: song.id.toString(),
        name: song.name,
        artist: song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
        cover: song.album?.picUrl || defaultCover
      }))
    } else {
      searchResults.value = []
    }
  } catch (error) {
    console.error('搜索失败:', error)
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}
</script>

<style scoped>
.music-player-float {
  position: fixed;
  z-index: 9999;
  user-select: none;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.music-player-float.dragging {
  transition: none;
}

/* 圆形状态 */
.player-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4), 0 0 0 4px rgba(102, 126, 234, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.player-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(102, 126, 234, 0.5), 0 0 0 6px rgba(102, 126, 234, 0.15);
}

.player-circle:active {
  transform: scale(0.95);
}

.album-rotate {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  animation: rotate 20s linear infinite;
  animation-play-state: paused;
  border: 2px solid rgba(255, 255, 255, 0.3);
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

.play-overlay .play-icon {
  font-size: 24px;
  color: #fff;
}

/* 悬浮提示 */
.hover-hint {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.player-circle:hover .hover-hint {
  opacity: 1;
}

.hover-hint .hint-sub {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
}

/* 音频波纹 */
.sound-waves {
  position: absolute;
  bottom: 8px;
  display: flex;
  gap: 3px;
}

.sound-waves span {
  width: 3px;
  height: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  animation: wave 0.5s ease-in-out infinite;
}

.sound-waves span:nth-child(1) { animation-delay: 0s; height: 8px; }
.sound-waves span:nth-child(2) { animation-delay: 0.1s; height: 14px; }
.sound-waves span:nth-child(3) { animation-delay: 0.2s; height: 10px; }
.sound-waves span:nth-child(4) { animation-delay: 0.3s; height: 16px; }

@keyframes wave {
  0%, 100% { transform: scaleY(0.6); }
  50% { transform: scaleY(1); }
}

/* 展开状态 */
.player-expanded {
  width: 360px;
  background: var(--vp-c-bg);
  border-radius: 20px;
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

/* 头部 */
.player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
}

.music-icon {
  font-size: 18px;
}

.header-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.header-btn svg {
  width: 18px;
  height: 18px;
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
  border-radius: 25px;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.2s;
}

.search-box:focus-within {
  border-color: var(--vp-c-brand);
}

.search-icon {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
}

.search-box input::placeholder {
  color: var(--vp-c-text-2);
}

.clear-search {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-text-2);
  color: var(--vp-c-bg);
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.clear-search:hover {
  opacity: 1;
}

/* 搜索下拉框 */
.search-dropdown {
  max-height: 280px;
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
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.result-count {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 10px;
}

.refresh-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 16px;
  height: 16px;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.dropdown-list {
  padding: 0 8px;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.dropdown-item:hover {
  background: var(--vp-c-bg-mute);
}

.dropdown-item.active {
  background: var(--vp-c-brand-soft);
}

.item-cover {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-artist {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 3px;
}

.item-play-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}

.dropdown-item:hover .item-play-btn,
.dropdown-item.active .item-play-btn {
  opacity: 1;
}

/* 当前播放 */
.now-playing {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--vp-c-bg);
}

.album-section {
  position: relative;
  width: 70px;
  height: 70px;
}

.current-cover {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  animation: rotate 20s linear infinite;
  animation-play-state: paused;
  border: 3px solid var(--vp-c-divider);
}

.current-cover.rotating {
  animation-play-state: running;
}

.vinyl-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: var(--vp-c-bg);
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
}

.song-info {
  flex: 1;
  min-width: 0;
}

.song-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
}

.song-artist {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* 进度条 */
.progress-section {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 16px;
}

.time {
  font-size: 11px;
  color: var(--vp-c-text-2);
  min-width: 36px;
  font-variant-numeric: tabular-nums;
}

.progress-wrapper {
  flex: 1;
}

.progress-bar {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: visible;
}

.progress-bg {
  position: absolute;
  inset: 0;
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.progress-fill {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.1s;
}

.progress-handle {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  background: #fff;
  border: 3px solid #667eea;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.progress-bar:hover .progress-handle {
  opacity: 1;
}

/* 控制按钮 */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 20px 20px;
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
  width: 20px;
  height: 20px;
}

.play-btn-large {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.play-btn-large svg {
  width: 28px;
  height: 28px;
}

.mode-btn .mode-icon {
  font-size: 16px;
}

.list-btn {
  position: relative;
}

.list-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 10px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 播放列表 */
.playlist-panel {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  max-height: 220px;
  display: flex;
  flex-direction: column;
}

.playlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.playlist-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.playlist-count {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-left: 8px;
}

.close-playlist {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.close-playlist:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.playlist-content {
  overflow-y: auto;
  padding: 8px;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}

.playlist-item:hover {
  background: var(--vp-c-bg-mute);
}

.playlist-item.active {
  background: var(--vp-c-brand-soft);
}

.item-number {
  width: 24px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 12px;
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
  font-size: 11px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playing-indicator {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 16px;
}

.playing-indicator span {
  width: 3px;
  background: var(--vp-c-brand);
  border-radius: 2px;
  animation: soundBar 0.5s ease-in-out infinite;
}

.playing-indicator span:nth-child(1) { height: 8px; animation-delay: 0s; }
.playing-indicator span:nth-child(2) { height: 14px; animation-delay: 0.1s; }
.playing-indicator span:nth-child(3) { height: 10px; animation-delay: 0.2s; }

@keyframes soundBar {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}

/* 动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 深色模式 */
.dark .player-circle {
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3), 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.dark .player-expanded {
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.4);
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
