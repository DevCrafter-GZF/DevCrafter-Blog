<!--
 * @Author: GZF
 * @Description: 悬浮音乐球组件 - 基于 escook 主题样式，添加搜索功能
 * 保持 escook 原有交互：hover 展开控制面板，播放列表在上方显示
-->

<template>
  <Teleport to="body">
    <div
        :class="{
        'active': isPlaylistVisible,
        'escook-music-ball': true
      }"
        :style="positionStyle"
    >
      <!-- 播放列表 - 在圆形上方展开 -->
      <div v-if="isPlaylistVisible" class="escook-music-list" style="bottom: 55px; top: auto; max-height: 250px;">
        <!-- 搜索框 -->
        <div style="padding: 10px; border-bottom: 1px solid var(--music-list-sep-color);">
          <div style="display: flex; gap: 8px; background: var(--vp-c-bg); border-radius: 20px; padding: 5px; border: 1px solid var(--vp-c-divider);">
            <input
                v-model="searchKeyword"
                placeholder="搜索歌曲、歌手..."
                type="text"
                style="flex: 1; border: none; background: transparent; padding: 5px 10px; outline: none; color: var(--vp-c-text-1); font-size: 12px;"
                @keyup.enter="searchMusic"
            >
            <button :disabled="isSearching" style="border: none; background: var(--vp-c-brand); color: #fff; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center;" @click="searchMusic">
              <span v-if="!isSearching" style="font-size: 12px;">🔍</span>
              <span v-else class="loading" style="display: inline-block; width: 12px; height: 12px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
            </button>
          </div>
        </div>

        <!-- 搜索结果 -->
        <div v-if="showSearchResults" style="max-height: 150px; overflow-y: auto;">
          <div style="padding: 5px 10px; font-size: 11px; color: var(--vp-c-text-2); border-bottom: 1px solid var(--music-list-sep-color);">
            搜索结果 ({{ searchResults.length }})
            <button style="float: right; border: none; background: transparent; cursor: pointer; font-size: 14px; line-height: 1;" @click="showSearchResults = false">×</button>
          </div>
          <div
              v-for="song in searchResults"
              :key="song.id"
              class="escook-music-list-item"
              style="padding-left: 10px; padding-right: 10px;"
              @click="playSongImmediately(song)"
          >
            {{ song.name }} - {{ song.artist }}
          </div>
          <div v-if="searchResults.length === 0 && hasSearched" class="escook-music-list-item" style="color: var(--vp-c-text-2); text-align: center;">
            未找到相关歌曲
          </div>
        </div>

        <!-- 播放列表 -->
        <div v-else style="max-height: 200px; overflow-y: auto;">
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
          <div v-if="playlist.length === 0" class="escook-music-list-item" style="color: var(--vp-c-text-2); text-align: center;">
            搜索歌曲添加到你的播放列表
          </div>
        </div>
        <div class="escook-music-list-sep"></div>
      </div>

      <!-- escook 标准控制面板 - hover 展开 -->
      <div class="escook-music-ball__inner">
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

        <!-- 播放列表按钮 - 点击切换播放列表显示 -->
        <div class="escook-music-list-button" @click.stop="togglePlaylist">
          <span class="iconfont icon-music_list"></span>
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
import {ref, computed, onMounted, onUnmounted} from 'vue'
import { ElSlider } from 'element-plus'

// 网易云音乐热歌榜ID
const HOT_SONGS_CHART_ID = 3778678

// 状态
const isPlaying = ref(false)
const isMuted = ref(false)
const isPlaylistVisible = ref(false)
const searchKeyword = ref('')
const searchResults = ref<any[]>([])
const showSearchResults = ref(false)
const isSearching = ref(false)
const hasSearched = ref(false)
const playlist = ref<any[]>([])
const currentIndex = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(50)

// Refs
const audioRef = ref<HTMLAudioElement>()

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

// 位置样式 - 使用 escook 主题默认位置
const positionStyle = computed(() => {
  return {
    left: '15px',
    bottom: '15px'
  }
})

// 切换播放列表显示
const togglePlaylist = () => {
  isPlaylistVisible.value = !isPlaylistVisible.value
  if (!isPlaylistVisible.value) {
    showSearchResults.value = false
  }
}

// 初始化
onMounted(() => {
  // 加载网易云音乐热歌榜前10首
  loadHotSongsChart()
})

// 加载网易云音乐热歌榜
const loadHotSongsChart = async () => {
  try {
    const chartApis = [
      async () => {
        const response = await fetch(`https://music-api.heheda.top/playlist/detail?id=${HOT_SONGS_CHART_ID}`)
        const data = await response.json()
        if (data.result?.tracks) {
          return data.result.tracks.slice(0, 10).map((song: any) => ({
            id: song.id.toString(),
            name: song.name,
            artist: song.ar?.map((a: any) => a.name).join('/') || '未知歌手',
            cover: song.al?.picUrl || '',
            url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
          }))
        }
        return null
      },
      async () => {
        const response = await fetch(`https://api-meting.linweiqin.com/playlist?id=${HOT_SONGS_CHART_ID}`)
        const data = await response.json()
        if (data.data || Array.isArray(data)) {
          const songs = data.data || data
          return songs.slice(0, 10).map((song: any) => ({
            id: song.id.toString(),
            name: song.name,
            artist: song.artist || '未知歌手',
            cover: song.cover || '',
            url: song.url || `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
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
          return
        }
      } catch (e) {
        console.log('API failed, trying next...')
      }
    }
  } catch (error) {
    console.error('加载热歌榜失败:', error)
  }
}

// 搜索音乐
const searchMusic = async () => {
  if (!searchKeyword.value.trim()) return

  isSearching.value = true
  hasSearched.value = true
  showSearchResults.value = true

  try {
    const response = await fetch(`https://music-api.heheda.top/search?keywords=${encodeURIComponent(searchKeyword.value)}&limit=10`)
    const data = await response.json()

    if (data.result?.songs) {
      searchResults.value = data.result.songs.map((song: any) => ({
        id: song.id.toString(),
        name: song.name,
        artist: song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
        cover: song.album?.picUrl || '',
        url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
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

// 立即播放搜索到的歌曲
const playSongImmediately = (song: any) => {
  // 检查是否已在播放列表中
  const existingIndex = playlist.value.findIndex(s => s.id === song.id)
  if (existingIndex >= 0) {
    currentIndex.value = existingIndex
  } else {
    // 添加到播放列表并播放
    playlist.value.push(song)
    currentIndex.value = playlist.value.length - 1
  }
  play()
  showSearchResults.value = false
  searchKeyword.value = ''
}

// 播放/暂停
const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
}

const play = () => {
  if (audioRef.value) {
    audioRef.value.play()
  }
}

// 静音切换
const toggleMute = () => {
  if (!audioRef.value) return
  isMuted.value = !isMuted.value
  audioRef.value.muted = isMuted.value
}

// 播放指定索引的歌曲
const playByIndex = (index: number) => {
  currentIndex.value = index
  // 等待音频源更新后播放
  setTimeout(() => {
    play()
  }, 100)
}

// 音频事件处理
const onEnded = () => {
  // 播放下一首
  if (currentIndex.value < playlist.value.length - 1) {
    currentIndex.value++
    setTimeout(() => play(), 100)
  }
}

const onLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration || 0
  }
}

const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime || 0
  }
}

const seek = () => {
  // ElSlider 的 change 事件会自动更新进度
}

// 格式化时间
const formatTime = (time: number): string => {
  if (!time || isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
</script>

<style scoped>
/* 加载动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
