<!--
 * @Author: GZF
 * @Description: 悬浮音乐球组件 - 支持网易云音乐搜索（已适配移动端）
-->

<template>
  <Teleport to="body">
    <div
        :class="{
        'active': isExpanded,
        'escook-music-ball': true
      }"
        :style="positionStyle"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
      <!-- 圆形悬浮球 -->
      <div
          v-if="!isExpanded"
          class="escook-music-ball__inner"
          @mousedown="startDrag"
          @touchend="handleTouchEnd"
          @touchstart.prevent="handleTouchStart"
          @click.stop="handleBallClick"
      >
        <!-- 播放/暂停按钮 -->
        <div class="escook-play-pause" @click.stop="togglePlay">
          <span v-if="!isPlaying" class="iconfont icon-playfill"></span>
          <span v-else class="iconfont icon-pause"></span>
        </div>
        
        <!-- 时间显示 -->
        <div class="escook-time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
        
        <!-- 进度条 -->
        <div class="escook-duration">
          <el-slider
              v-model="progressValue"
              :show-tooltip="false"
              @change="seek"
          />
        </div>
        
        <!-- 音量控制 -->
        <div class="escook-volume">
          <el-slider
              v-model="volumeValue"
              :show-tooltip="false"
          />
          <span v-if="isMuted" class="iconfont icon-ic_volume_off" @click="toggleMute"></span>
          <span v-else class="iconfont icon-ic_volume_up" @click="toggleMute"></span>
        </div>
        
        <!-- 播放列表按钮 -->
        <div class="escook-music-list-button" @click.stop="expand">
          <span class="iconfont icon-music_list"></span>
        </div>
      </div>

      <!-- 展开面板 - 使用 escook 样式 -->
      <div
          v-else
          class="escook-music-ball__inner"
          @click.stop
      >
        <!-- 播放/暂停按钮 -->
        <div class="escook-play-pause" @click.stop="togglePlay">
          <span v-if="!isPlaying" class="iconfont icon-playfill"></span>
          <span v-else class="iconfont icon-pause"></span>
        </div>
        
        <!-- 时间显示 -->
        <div class="escook-time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
        
        <!-- 进度条 -->
        <div class="escook-duration">
          <el-slider
              v-model="progressValue"
              :show-tooltip="false"
              @change="seek"
          />
        </div>
        
        <!-- 音量控制 -->
        <div class="escook-volume">
          <el-slider
              v-model="volumeValue"
              :show-tooltip="false"
          />
          <span v-if="isMuted" class="iconfont icon-ic_volume_off" @click="toggleMute"></span>
          <span v-else class="iconfont icon-ic_volume_up" @click="toggleMute"></span>
        </div>
        
        <!-- 播放列表按钮 -->
        <div class="escook-music-list-button" @click.stop="isExpanded = false">
          <span class="iconfont icon-music_list"></span>
        </div>

        <!-- 搜索框 -->
        <div class="escook-search-box" style="position: absolute; bottom: 50px; left: 0; width: 100%; padding: 0 10px; box-sizing: border-box;">
          <div style="display: flex; gap: 8px; background: var(--vp-c-bg); border-radius: 20px; padding: 5px; border: 1px solid var(--vp-c-divider);">
            <input
                v-model="searchKeyword"
                placeholder="搜索歌曲、歌手..."
                type="text"
                style="flex: 1; border: none; background: transparent; padding: 5px 10px; outline: none; color: var(--vp-c-text-1);"
                @keyup.enter="searchMusic"
            >
            <button :disabled="isSearching" style="border: none; background: var(--vp-c-brand); color: #fff; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;" @click="searchMusic">
              <span v-if="!isSearching">🔍</span>
              <span v-else class="loading" style="display: inline-block; width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
            </button>
          </div>
        </div>

        <!-- 搜索结果下拉框 -->
        <div v-if="showSearchResults" class="escook-search-results" style="position: absolute; bottom: 90px; left: 10px; right: 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 8px; max-height: 200px; overflow-y: auto; z-index: 100;">
          <div style="padding: 8px 12px; border-bottom: 1px solid var(--vp-c-divider); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px;">搜索结果 ({{ searchResults.length }})</span>
            <button style="border: none; background: transparent; cursor: pointer;" @click="showSearchResults = false">×</button>
          </div>
          <div>
            <div
                v-for="song in searchResults"
                :key="song.id"
                style="padding: 8px 12px; cursor: pointer; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                @click="playSongImmediately(song)"
            >
              {{ song.name }} - {{ song.artist }}
            </div>
            <div v-if="searchResults.length === 0 && hasSearched" style="padding: 12px; text-align: center; color: var(--vp-c-text-2); font-size: 12px;">
              未找到相关歌曲
            </div>
          </div>
        </div>

        <!-- 播放列表 - 使用 escook 样式，在圆形上方展开 -->
        <div class="escook-music-list" style="bottom: 55px; top: auto; padding: 15px 5px 50px;">
          <div
              v-for="(song, index) in playlist"
              :key="song.id"
              :class="{ 'active': currentIndex === index }"
              class="escook-music-list-item"
              @click="playByIndex(index)"
          >
            <img v-if="currentIndex === index" src="data:image/gif;base64,R0lGODlhSABIAPfCAP/1+f9vn//i7P/7/P9rnf+Yuv94pf/6+/9xoP9rnP/9/v/o8P/m7v90ov/u9P/o7/+Ksf/8/f9zof9qnP/x9v+gwP9xof/+/v/0+P/n7//p8f/s8v95pf/7/f+qxv98p/+pxv/Q3/+rx//9/f9nmv9yof/4+//u8//z9//v9P/t8/+80v9pm//m7/+Zu/+dvf+80/9un/+Yu/9tnf9unv9nmf/d6P9tnv93pf+Gr/95pv/w9f9woP90o//y9v/c6P+Os//q8f/r8f+JsP9zov91o/+Rtf+hwf+vyv99qP+Aqv+Aq//k7f/p8P9+qf/K3P/5+//3+v/3+f/d6f/2+f/r8v+Frv/v9f+Drf/6/P9qm/92pP+Ir/+40P/f6f99qf/U4/+Jsf/P3/+VuP9om//S4f/L3f/W5P96p/+St/+Msv98qP+90//O3v/b5//T4f/T4v/R4P/h6/9wn/9omv/l7v/C1v+IsP+1zf/g6//4+v+jwf/y9/+50f+wy/+fv//e6f+Ptf+yzP/X5P/W4//E1/+bvf/a5v/I2v+CrP/C1//x9f+UuP++1P+pxf+Qtf+tyP/L3P+Frf+Ns//f6v/Z5v/A1f9snf+PtP/D1/+lw//B1f+nxP+kw/+Grv+DrP/M3f/J2//U4v+mw//l7f+gv/+hwP/c5/+2zv+evv/j7f+tyf/j7P/G2f+Rtv/1+P+mxP/Z5f+Hr//O3/96pv+Lsf/s8/+2z/+jwv/g6v+Ut//a5/+Vuf9/qv/H2v9/qf+Erf9mmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTczRTY3QTRGODczMTFFQkI0RjFFNzNEMDE1NTkzOUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTczRTY3QTVGODczMTFFQkI0RjFFNzNEMDE1NTkzOUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NzNFNjdBMkY4NzMxMUVCQjRGMUU3M0QwMTU1OTM5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NzNFNjdBM0Y4NzMxMUVCQjRGMUU3M0QwMTU1OTM5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEw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" alt="" class="image-live">
            {{ song.name }}
          </div>
          <div v-if="playlist.length === 0" class="escook-music-list-item" style="color: var(--vp-c-text-2);">
            搜索歌曲添加到你的播放列表
          </div>
          <div class="escook-music-list-sep"></div>
        </div>
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
import { ElSlider } from 'element-plus'

// 本地默认音乐（备用，为空数组）
const defaultSongs: any[] = []

// 网易云音乐热歌榜ID
const HOT_SONGS_CHART_ID = 3778678  // 云音乐热歌榜

// 状态
const isExpanded = ref(false)
const isPlaying = ref(false)
const isDragging = ref(false)
const isMobile = ref(false)
const isMuted = ref(false)
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
const volume = ref(50)

// 位置
const position = ref({x: 0, y: 0})
const dragOffset = ref({x: 0, y: 0})
const ballSize = 48  // 与回到顶部按钮一致 48px
const panelWidth = 320
const panelHeight = 500

// Refs
const audioRef = ref<HTMLAudioElement>()
const progressRef = ref<HTMLElement>()

// 当前歌曲
const currentSong = computed(() => playlist.value[currentIndex.value] || null)

// 进度条值（0-100）
const progressValue = computed({
  get() {
    return duration.value ? (currentTime.value / duration.value) * 100 : 0
  },
  set(val: number) {
    if (audioRef.value && duration.value) {
      audioRef.value.currentTime = (val / 100) * duration.value
    }
  }
})

// 音量值（0-100）
const volumeValue = computed({
  get() {
    return volume.value
  },
  set(val: number) {
    volume.value = val
    if (audioRef.value) {
      audioRef.value.volume = val / 100
    }
  }
})

// 位置样式 - 使用 escook 主题默认位置 left: 15px; bottom: 15px
const positionStyle = computed(() => {
  // SSR 兼容性检查
  if (typeof window === 'undefined') {
    return {
      left: '15px',
      bottom: '15px'
    }
  }

  if (isExpanded.value) {
    // 展开时居中显示
    return {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  } else {
    // 收起时使用 escook 默认位置
    return {
      left: '15px',
      bottom: '15px'
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

  // 加载网易云音乐热歌榜前10首
  loadHotSongsChart()
})

// 加载网易云音乐热歌榜
const loadHotSongsChart = async () => {
  try {
    // 尝试多个API获取热歌榜
    const chartApis = [
      // API 1: music-api.heheda.top
      async () => {
        const response = await fetch(`https://music-api.heheda.top/playlist/detail?id=${HOT_SONGS_CHART_ID}`)
        const data = await response.json()
        if (data.result?.tracks) {
          return data.result.tracks.slice(0, 10).map((song: any) => ({
            id: song.id.toString(),
            name: song.name,
            artist: song.ar?.map((a: any) => a.name).join('/') || song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
            cover: song.al?.picUrl?.replace('250y250', '100y100') || song.album?.picUrl?.replace('250y250', '100y100') || '',
            url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
          }))
        }
        return null
      },
      // API 2: meting-api
      async () => {
        const response = await fetch(`https://api-meting.linweiqin.com/playlist?id=${HOT_SONGS_CHART_ID}`)
        const data = await response.json()
        if (data.data || Array.isArray(data)) {
          const songs = data.data || data
          return songs.slice(0, 10).map((song: any) => ({
            id: song.id.toString(),
            name: song.name,
            artist: song.artist || song.ar?.map((a: any) => a.name).join('/') || '未知歌手',
            cover: song.cover?.replace('250y250', '100y100') || song.pic?.replace('250y250', '100y100') || '',
            url: song.url || `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
          }))
        }
        return null
      },
      // API 3: 使用搜索热门歌曲作为备选
      async () => {
        const response = await fetch(`https://music-api.heheda.top/search?keywords=热门歌曲&limit=10`)
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

    for (const apiFn of chartApis) {
      try {
        const songs = await apiFn()
        if (songs && songs.length > 0) {
          playlist.value = songs
          // 自动播放第一首
          setTimeout(() => {
            audioRef.value?.play()
          }, 500)
          return
        }
      } catch (e) {
        console.log('当前API失败，尝试下一个...')
      }
    }

    // 如果都失败了，使用默认歌曲
    console.log('热歌榜加载失败，使用默认歌曲')
    playlist.value = [...defaultSongs]
  } catch (e) {
    console.log('加载热歌榜失败:', e)
    playlist.value = [...defaultSongs]
  }
}

// 设置默认位置
const setDefaultPosition = () => {
  if (isMobile.value) {
    // 移动端：固定在右下角，播放器在回到顶部上方，垂直排列，距离 10px
    // 播放器: right = 20px, bottom = 20px + 48px(回到顶部) + 10px(间距) = 78px
    const playerBottomOffset = 20 + backToTopSize + backToTopGap  // 78px

    position.value = {
      x: window.innerWidth - ballSize / 2 - 20,  // 靠右 20px
      y: window.innerHeight - ballSize / 2 - playerBottomOffset  // 在回到顶部上方
    }
  } else {
    // PC端：播放器在回到顶部左侧，水平排列，间距 10px
    // 播放器: right = 20px + 48px(回到顶部) + 10px(间距) = 78px
    // 回到顶部: right = 20px
    const playerRightOffset = 20 + backToTopSize + backToTopGap  // 78px

    position.value = {
      x: window.innerWidth - ballSize / 2 - playerRightOffset,
      y: window.innerHeight - ballSize / 2 - 20
    }
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

// 静音切换
const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (audioRef.value) {
    audioRef.value.muted = isMuted.value
  }
}

// 进度条拖动
const seek = (val: number) => {
  if (audioRef.value && duration.value) {
    audioRef.value.currentTime = (val / 100) * duration.value
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

  // 拖拽边界限制 - 播放器在回到顶部左侧
  // 左侧最小: 20px(边距) + 24px(半径) = 44px
  // 右侧最大: 屏幕宽 - 20px(边距) - 48px(回到顶部) - 10px(间距) - 24px(半径)
  const minX = ballSize / 2 + 20
  const maxX = window.innerWidth - 20 - backToTopSize - backToTopGap - ballSize / 2
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

  // 移动端拖拽边界 - 限制在屏幕右侧，不能切换到左侧
  // 左侧边界：屏幕中心线（不能越过中线到左侧）
  const screenCenterX = window.innerWidth / 2
  const minX = screenCenterX  // 不能越过屏幕中线到左侧
  const maxX = window.innerWidth - ballSize / 2 - 20  // 右侧留 20px 边距
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
  // 鼠标移入时不自动展开，保持点击展开的逻辑
}

const onMouseLeave = () => {
  // 鼠标移出不自动关闭面板，只能通过点击 X 或悬浮球关闭
}

const clearAllTimers = () => {
  // 清理定时器（不再使用自动展开/收起）
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
    // PC端展开面板：根据面板可视位置决定圆形播放器在左侧还是右侧
    // 面板宽度 320px，圆形播放器 48px，间距 10px
    // 计算面板的最佳位置，确保在可视范围内
    
    const panelTotalWidth = panelWidth + ballSize + 10  // 面板 + 播放器 + 间距 = 378px
    const availableWidth = window.innerWidth - 40  // 左右各留 20px 边距
    
    // 判断面板应该显示在左侧还是右侧
    // 如果屏幕宽度足够，优先显示在右侧（与播放器同侧）
    // 如果屏幕右侧空间不足，显示在左侧
    const playerX = position.value.x
    const spaceOnRight = window.innerWidth - playerX - ballSize / 2 - 20  // 播放器右侧剩余空间
    
    let panelX: number
    let newPlayerX: number
    
    if (spaceOnRight >= panelWidth + 10) {
      // 右侧空间足够：面板在播放器右侧
      // 播放器在左，面板在右
      panelX = playerX + ballSize / 2 + 10
      newPlayerX = playerX
    } else if (playerX - ballSize / 2 - 10 >= panelWidth) {
      // 右侧空间不足，但左侧空间足够：面板在播放器左侧
      // 播放器在右，面板在左
      panelX = playerX - ballSize / 2 - 10 - panelWidth
      newPlayerX = playerX
    } else {
      // 两侧空间都不够：贴边显示，播放器在面板旁边
      if (playerX < window.innerWidth / 2) {
        // 播放器在屏幕左侧：面板在播放器右侧
        panelX = 20
        newPlayerX = panelX + panelWidth + 10 + ballSize / 2
      } else {
        // 播放器在屏幕右侧：面板在播放器左侧
        panelX = window.innerWidth - panelWidth - 20
        newPlayerX = panelX - 10 - ballSize / 2
      }
    }
    
    // 垂直位置：贴底 20px，确保不超出屏幕
    const targetY = window.innerHeight - panelHeight - 20
    
    // 更新面板位置
    position.value = {
      x: Math.max(20, Math.min(window.innerWidth - panelWidth - 20, panelX)),
      y: targetY
    }
    
    // 更新播放器位置（如果需要）
    if (newPlayerX !== playerX) {
      position.value.x = newPlayerX
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
let touchStartTime = 0
let touchMoved = false

const handleTouchStart = (e: TouchEvent) => {
  touchStartTime = Date.now()
  touchMoved = false

  // 启动拖拽
  startDragTouch(e)
}

const handleTouchEnd = () => {
  const touchDuration = Date.now() - touchStartTime

  // 如果是短按且没有移动，则展开/缩小面板
  if (touchDuration < 500 && !touchMoved) {
    if (isExpanded.value) {
      collapse()
    } else {
      expand()
    }
  }
}

const handleBallClick = (e: MouseEvent) => {
  // 如果正在拖拽，不触发点击
  if (isDragging.value) return

  // 阻止事件冒泡
  e.stopPropagation()

  // 点击展开/缩小面板
  if (isExpanded.value) {
    collapse()
  } else {
    expand()
  }
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
/* 使用 escook 主题提供的样式，这里只添加搜索相关的额外样式 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 搜索结果样式补充 */
.escook-search-results::-webkit-scrollbar {
  width: 6px;
}

.escook-search-results::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.escook-music-list-item:hover {
  color: #f16a97;
}
</style>
