<!--
 * @Author: GZF
 * @Description: 悬浮网易云音乐播放器组件 - 优化版
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
              @focus="onSearchFocus"
              @blur="onSearchBlur"
              @input="onSearchInput"
              placeholder="搜索歌曲、歌手..."
              type="text"
            >
            <button @click="searchMusic" class="search-btn">🔍</button>
          </div>
          <button class="close-btn" @click="collapse">✕</button>
        </div>

        <!-- 搜索下拉框 -->
        <div v-if="showDropdown" class="search-dropdown">
          <!-- 搜索结果 -->
          <div v-if="searchResults.length > 0" class="dropdown-section">
            <div class="dropdown-title">🔍 搜索结果</div>
            <div
              v-for="song in searchResults"
              :key="song.id"
              class="dropdown-item"
              @click="playSong(song)"
            >
              <img :src="song.cover" class="item-cover">
              <div class="item-info">
                <div class="item-name">{{ song.name }}</div>
                <div class="item-artist">{{ song.artist }}</div>
              </div>
              <span class="play-icon">▶</span>
            </div>
          </div>

          <!-- 热门歌曲 -->
          <div v-else class="dropdown-section">
            <div class="dropdown-title">🔥 热门歌曲</div>
            <div
              v-for="song in hotSongs"
              :key="song.id"
              class="dropdown-item"
              :class="{ 'active': currentSong?.id === song.id }"
              @click="playSong(song)"
            >
              <img :src="song.cover" class="item-cover">
              <div class="item-info">
                <div class="item-name">{{ song.name }}</div>
                <div class="item-artist">{{ song.artist }}</div>
              </div>
              <span class="play-icon" v-if="currentSong?.id === song.id && isPlaying">♪</span>
              <span class="play-icon" v-else>▶</span>
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
          <button class="ctrl-btn list-btn" @click="showPlaylist = !showPlaylist" :class="{ 'active': showPlaylist }">
            📋
          </button>
        </div>

        <!-- 播放列表 -->
        <div v-if="showPlaylist" class="playlist">
          <div class="playlist-header">
            <span>播放列表 ({{ playlist.length }})</span>
            <button class="clear-btn" @click="showPlaylist = false">✕</button>
          </div>
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
            <span v-if="currentSong?.id === song.id && isPlaying" class="playing-icon">♪</span>
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
      @error="onError"
    ></audio>
  </Teleport>
</template>

<script setup lang="ts">
仿import { ref, computed, onMounted, watch } from 'vue'

// 默认封面
const defaultCover = 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'

// 热门歌曲列表
const hotSongs = [
  { id: '25706282', name: '起风了', artist: '买辣椒也用券', cover: 'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg' },
  { id: '1293886117', name: '体面', artist: '于文文', cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg' },
  { id: '863046037', name: '告白气球', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' },
  { id: '1293951677', name: '追光者', artist: '岑宁儿', cover: 'https://p1.music.126.net/8N1fsMRm2L5HyZccc6I3ew==/109951163020571782.jpg' },
  { id: '27808044', name: '平凡之路', artist: '朴树', cover: 'https://p1.music.126.net/Wp4L-I7qwn_sX0SOe33Qrw==/109951163221161145.jpg' },
  { id: '186016', name: '晴天', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' },
  { id: '25706285', name: '后来', artist: '刘若英', cover: 'https://p1.music.126.net/e0gGQI-4KdVqEYHsWiXxbg==/109951163424196263.jpg' },
  { id: '531295576', name: '稻香', artist: '周杰伦', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' },
  { id: '1901371647', name: '孤勇者', artist: '陈奕迅', cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg' },
  { id: '1807799505', name: '错位时空', artist: '艾辰', cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg' }
]

// 状态
const isExpanded = ref(false)
const isPlaying = ref(false)
const isDragging = ref(false)
const showPlaylist = ref(false)
const showDropdown = ref(false)
const currentSong = ref(hotSongs[0])
const playlist = ref([...hotSongs])
const playMode = ref<'sequence' | 'random' | 'single'>('sequence')
const currentTime = ref(0)
const duration = ref(0)
const searchKeyword = ref('')
const searchResults = ref<any[]>([])
const isSearching = ref(false)

// 位置
const position = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })

// 音频元素
const audioPlayer = ref<HTMLAudioElement>()
const progressBar = ref<HTMLElement>()

// 初始化位置
onMounted(() => {
  position.value = {
    x: window.innerWidth - 80,
    y: window.innerHeight - 80
  }
})

// 监听展开状态
watch(isExpanded, (expanded) => {
  if (expanded) {
    const expandedWidth = 320
    const expandedHeight = 500
    position.value = {
      x: Math.max(20, Math.min(window.innerWidth - expandedWidth - 20, position.value.x)),
      y: Math.max(20, Math.min(window.innerHeight - expandedHeight - 20, position.value.y))
    }
    // 展开时显示下拉框
    showDropdown.value = true
  } else {
    showDropdown.value = false
    searchResults.value = []
    searchKeyword.value = ''
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

// 展开/收起
const expand = () => isExpanded.value = true
const collapse = () => {
  isExpanded.value = false
  showPlaylist.value = false
  showDropdown.value = false
}

// 搜索相关
const onSearchFocus = () => {
  showDropdown.value = true
}

const onSearchBlur = () => {
  // 延迟隐藏，让点击事件先执行
  setTimeout(() => {
    if (!searchKeyword.value) {
      showDropdown.value = false
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
    audioPlayer.value.play().catch(() => {
      console.log('播放失败，可能需要会员')
    })
  }
}

const playSong = (song: any) => {
  currentSong.value = song
  showDropdown.value = false
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
    // 使用网易云音乐搜索API
    const response = await fetch(`https://cloud-music-api-f494k233t-azhe403.vercel.app/search?keywords=${encodeURIComponent(searchKeyword.value)}&limit=10`)
    const data = await response.json()

    if (data.result?.songs) {
      searchResults.value = data.result.songs.map((song: any) => ({
        id: song.id,
        name: song.name,
        artist: song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
        cover: song.album?.picUrl || defaultCover
      }))
    } else {
      searchResults.value = []
    }
  } catch (error) {
    console.error('搜索失败:', error)
    // 模拟搜索结果
    searchResults.value = [
      {
        id: Date.now().toString(),
        name: searchKeyword.value,
        artist: '搜索结果',
        cover: defaultCover
      }
    ]
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
  position: relative;
}

.search-box input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
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
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.dropdown-item:hover {
  background: var(--vp-c-bg-mute);
  border-left-color: var(--vp-c-brand);
}

.dropdown-item.active {
  background: var(--vp-c-brand-soft);
  border-left-color: var(--vp-c-brand);
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
  margin-top: 2px;
}

.play-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  opacity: 0;
  transition: opacity 0.2s;
}

.dropdown-item:hover .play-icon,
.dropdown-item.active .play-icon {
  opacity: 1;
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

.ctrl-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
}

.play-btn {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 20px;
}

.mode-btn, .list-btn {
  font-size: 14px;
}

/* 播放列表 */
.playlist {
  max-height: 200px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.playlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.clear-btn {
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
}

.clear-btn:hover {
  background: var(--vp-c-bg-mute);
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  border-left: 3px solid transparent;
}

.playlist-item:hover {
  background: var(--vp-c-bg-mute);
}

.playlist-item.active {
  background: var(--vp-c-brand-soft);
  border-left-color: var(--vp-c-brand);
}

.song-index {
  width: 24px;
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
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playing-icon {
  color: var(--vp-c-brand);
  font-size: 12px;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 深色模式适配 */
.dark .player-collapsed {
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.dark .player-expanded {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

/* 滚动条样式 */
.search-dropdown::-webkit-scrollbar,
.playlist::-webkit-scrollbar {
  width: 4px;
}

.search-dropdown::-webkit-scrollbar-thumb,
.playlist::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}
</style>
