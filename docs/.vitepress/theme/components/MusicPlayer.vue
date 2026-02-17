<!--
 * @Author: GZF
 * @Description: 悬浮网易云音乐播放器组件
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
      @mousedown="startDrag"
    >
      <!-- 圆形收缩状态 -->
      <div v-if="!isExpanded" class="player-collapsed" @click.stop="expand">
        <div class="album-rotate" :class="{ 'rotating': isPlaying }">
          <img :src="currentSong?.cover || defaultCover" alt="album">
        </div>
        <div class="play-indicator" v-if="isPlaying">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- 长方形展开状态 -->
      <div v-else class="player-expanded" @click.stop>
        <!-- 头部：搜索和关闭 -->
        <div class="player-header">
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              @keyup.enter="searchMusic"
              placeholder="搜索网易云音乐..."
              type="text"
            >
            <button @click="searchMusic" class="search-btn">🔍</button>
          </div>
          <button class="close-btn" @click="collapse">✕</button>
        </div>

        <!-- 搜索结果 -->
        <div v-if="searchResults.length > 0" class="search-results">
          <div 
            v-for="song in searchResults" 
            :key="song.id"
            class="search-item"
            @click="playSong(song)"
          >
            <img :src="song.cover" class="result-cover">
            <div class="result-info">
              <div class="result-name">{{ song.name }}</div>
              <div class="result-artist">{{ song.artist }}</div>
            </div>
          </div>
        </div>

        <!-- 当前播放 -->
        <div v-if="currentSong" class="now-playing">
          <img :src="currentSong.cover" class="current-cover" :class="{ 'rotating': isPlaying }">
          <div class="current-info">
            <div class="current-name" :title="currentSong.name">{{ currentSong.name }}</div>
            <div class="current-artist">{{ currentSong.artist }}</div>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="progress-section" v-if="currentSong">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar" @click="seekProgress" ref="progressBar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
            <div class="progress-handle" :style="{ left: progressPercent + '%' }"></div>
          </div>
          <span class="time">{{ formatTime(duration) }}</span>
        </div>

        <!-- 控制按钮 -->
        <div class="controls">
          <button class="ctrl-btn mode-btn" @click="toggleMode" :title="playModeText">
            {{ playModeIcon }}
          </button>
          <button class="ctrl-btn" @click="prevSong">⏮</button>
          <button class="ctrl-btn play-btn" @click="togglePlay">
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
          <button class="ctrl-btn" @click="nextSong">⏭</button>
          <button class="ctrl-btn list-btn" @click="showPlaylist = !showPlaylist">
            📋
          </button>
        </div>

        <!-- 播放列表 -->
        <div v-if="showPlaylist" class="playlist">
          <div 
            v-for="(song, index) in playlist" 
            :key="song.id"
            class="playlist-item"
            :class="{ 'active': currentSong?.id === song.id }"
            @click="playSong(song)"
          >
            <span class="song-index">{{ index + 1 }}</span>
            <span class="song-name">{{ song.name }}</span>
            <span class="song-artist">{{ song.artist }}</span>
          </div>
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
    ></audio>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 默认封面
const defaultCover = 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'

// 默认播放列表
const defaultPlaylist = [
  { id: '25706282', name: '起风了', artist: '买辣椒也用券', cover: 'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg' },
  { id: '1293886117', name: '体面', artist: '于文文', cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg' },
  { id: '863046037', name: '告白气球', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' },
  { id: '1293951677', name: '追光者', artist: '岑宁儿', cover: 'https://p1.music.126.net/8N1fsMRm2L5HyZccc6I3ew==/109951163020571782.jpg' },
  { id: '27808044', name: '平凡之路', artist: '朴树', cover: 'https://p1.music.126.net/Wp4L-I7qwn_sX0SOe33Qrw==/109951163221161145.jpg' },
  { id: '186016', name: '晴天', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' },
  { id: '25706285', name: '后来', artist: '刘若英', cover: 'https://p1.music.126.net/e0gGQI-4KdVqEYHsWiXxbg==/109951163424196263.jpg' },
  { id: '531295576', name: '稻香', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' }
]

// 状态
const isExpanded = ref(false)
const isPlaying = ref(false)
const isDragging = ref(false)
const showPlaylist = ref(false)
const currentSong = ref(defaultPlaylist[0])
const playlist = ref([...defaultPlaylist])
const playMode = ref<'sequence' | 'random' | 'single'>('sequence')
const currentTime = ref(0)
const duration = ref(0)
const searchKeyword = ref('')
const searchResults = ref<any[]>([])

// 位置
const position = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })

// 音频元素
const audioPlayer = ref<HTMLAudioElement>()
const progressBar = ref<HTMLElement>()

// 初始化位置 - 右下角，但留出边距
onMounted(() => {
  position.value = { 
    x: window.innerWidth - 80, 
    y: window.innerHeight - 80 
  }
})

// 监听展开状态，调整位置避免超出屏幕
watch(isExpanded, (expanded) => {
  if (expanded) {
    // 展开时，确保播放器不会超出屏幕右边界和下边界
    const expandedWidth = 320
    const expandedHeight = 400
    position.value = {
      x: Math.max(20, Math.min(window.innerWidth - expandedWidth - 20, position.value.x)),
      y: Math.max(20, Math.min(window.innerHeight - expandedHeight - 20, position.value.y))
    }
  }
})

// 计算属性
const positionStyle = computed(() => {
  // 展开时，以圆形按钮中心为锚点，向左上方展开
  if (isExpanded.value) {
    return {
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
      transform: 'translate(0, 0)'
    }
  }
  // 收缩时，圆形按钮的位置
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

// 展开/收起
const expand = () => {
  // 展开前调整位置，确保不会超出屏幕
  const expandedWidth = 320
  const expandedHeight = 400
  position.value = {
    x: Math.min(position.value.x, window.innerWidth - expandedWidth - 20),
    y: Math.min(position.value.y, window.innerHeight - expandedHeight - 20)
  }
  isExpanded.value = true
}
const collapse = () => { isExpanded.value = false; showPlaylist.value = false }

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
  if (!audioPlayer.value) return
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
}

const playSong = (song: any) => {
  currentSong.value = song
  searchResults.value = []
  searchKeyword.value = ''
  setTimeout(() => {
    audioPlayer.value?.play()
  }, 100)
}

const prevSong = () => {
  const index = playlist.value.findIndex(s => s.id === currentSong.value?.id)
  const prevIndex = index <= 0 ? playlist.value.length - 1 : index - 1
  playSong(playlist.value[prevIndex])
}

const nextSong = () => {
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
    const response = await fetch(`https://music.163.com/api/search/get/web?csrf_token=&hlpretag=&hlposttag=&s=${encodeURIComponent(searchKeyword.value)}&type=1&offset=0&total=true&limit=10`)
    const data = await response.json()
    
    if (data.result?.songs) {
      searchResults.value = data.result.songs.map((song: any) => ({
        id: song.id,
        name: song.name,
        artist: song.artists?.[0]?.name || '未知歌手',
        cover: song.album?.picUrl || defaultCover
      }))
    }
  } catch (error) {
    console.error('搜索失败:', error)
    // 使用模拟数据
    searchResults.value = [
      { id: '1901371647', name: searchKeyword.value + ' (搜索结果)', artist: '网易云音乐', cover: defaultCover }
    ]
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

/* 圆形收缩状态 */
.player-collapsed {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.player-collapsed:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(102, 126, 234, 0.5);
}

.album-rotate {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  animation: rotate 20s linear infinite;
  animation-play-state: paused;
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

.play-indicator {
  position: absolute;
  bottom: 8px;
  display: flex;
  gap: 2px;
}

.play-indicator span {
  width: 3px;
  height: 12px;
  background: #fff;
  border-radius: 2px;
  animation: sound 0.5s ease-in-out infinite;
}

.play-indicator span:nth-child(2) { animation-delay: 0.1s; }
.play-indicator span:nth-child(3) { animation-delay: 0.2s; }

@keyframes sound {
  0%, 100% { height: 8px; }
  50% { height: 16px; }
}

/* 长方形展开状态 */
.player-expanded {
  width: 320px;
  background: var(--vp-c-bg);
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.player-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: move;
}

.search-box {
  flex: 1;
  display: flex;
  gap: 6px;
}

.search-box input {
  flex: 1;
  padding: 6px 10px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 13px;
  outline: none;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-btn, .close-btn {
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
  transition: background 0.2s;
}

.search-btn:hover, .close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 搜索结果 */
.search-results {
  max-height: 150px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.search-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-item:hover {
  background: var(--vp-c-bg-mute);
}

.result-cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-artist {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

/* 当前播放 */
.now-playing {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.current-cover {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  animation: rotate 20s linear infinite;
  animation-play-state: paused;
}

.current-cover.rotating {
  animation-play-state: running;
}

.current-info {
  flex: 1;
  min-width: 0;
}

.current-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.current-artist {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* 进度条 */
.progress-section {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 12px;
  background: var(--vp-c-bg-soft);
}

.time {
  font-size: 11px;
  color: var(--vp-c-text-2);
  min-width: 32px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: var(--vp-c-divider);
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

.progress-handle {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: #fff;
  border: 2px solid #667eea;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s;
}

.progress-bar:hover .progress-handle {
  opacity: 1;
}

/* 控制按钮 */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
}

.ctrl-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  font-size: 16px;
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

.play-btn {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 18px;
}

.mode-btn, .list-btn {
  font-size: 14px;
}

/* 播放列表 */
.playlist {
  max-height: 150px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 13px;
}

.playlist-item:hover, .playlist-item.active {
  background: var(--vp-c-bg-mute);
}

.playlist-item.active {
  color: var(--vp-c-brand);
}

.song-index {
  width: 20px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 11px;
}

.song-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  color: var(--vp-c-text-2);
  font-size: 11px;
}

/* 深色模式适配 */
.dark .player-collapsed {
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.dark .player-expanded {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

/* 滚动条样式 */
.search-results::-webkit-scrollbar,
.playlist::-webkit-scrollbar {
  width: 4px;
}

.search-results::-webkit-scrollbar-thumb,
.playlist::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}
</style>
