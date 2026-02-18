<template>
  <Teleport to="body">
    <div :class="{ dark: isDark }" class="music-player">
      <!-- 悬浮控制球 -->
      <div class="control-ball">
        <img
            v-if="currentSong.cover"
            :src="currentSong.cover"
            alt="cover"
            class="ball-cover"
            @click="togglePlay"
        />
        <div v-else class="ball-inner" @click="togglePanel">
          <span class="ball-icon">♪</span>
        </div>
        <!-- 播放状态指示器 -->
        <div v-if="isPlaying" class="playing-indicator" @click="togglePlay">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <!-- 展开面板按钮（当有封面时显示） -->
        <div v-if="currentSong.cover" class="expand-btn" @click="togglePanel">
          <span>☰</span>
        </div>
      </div>

      <!-- 播放器面板 -->
      <div v-if="isExpanded" class="player-panel" @click.stop>
        <!-- 关闭按钮 -->
        <button class="panel-close" @click="isExpanded = false">✕</button>

        <!-- 搜索框 -->
        <div class="search-section">
          <div class="search-box">
            <input
                v-model="searchKeyword"
                placeholder="搜索歌曲..."
                type="text"
                @keyup.enter="search"
            />
            <button class="search-btn" @click.stop.prevent="search">搜索</button>
          </div>

          <!-- 搜索结果 -->
          <div v-if="searchResults.length > 0" class="search-results">
            <div
                v-for="(song, index) in searchResults"
                :key="song.id || index"
                :class="{ disabled: !song.canPlay }"
                class="song-item"
                @click.stop.prevent="song.canPlay && playSong(song)"
            >
              <img
                  v-if="song.cover"
                  :src="song.cover"
                  alt="cover"
                  class="song-cover"
              />
              <div v-else class="song-cover default-cover">♪</div>
              <div class="song-info">
                <div class="song-name">{{ song.name }}</div>
                <div class="song-artist">{{ song.artist }}</div>
                <div v-if="!song.canPlay" class="no-play-tip">无播放资源</div>
              </div>
              <span v-if="song.canPlay" class="play-icon">▶</span>
              <span v-else class="play-icon disabled-icon">✕</span>
            </div>
          </div>
        </div>

        <!-- 当前播放 -->
        <div v-if="currentSong.id" class="now-playing-card">
          <img
              v-if="currentSong.cover"
              :src="currentSong.cover"
              alt="cover"
              class="npc-cover"
          />
          <div v-else class="npc-cover default-cover">♪</div>
          <div class="npc-info">
            <div class="npc-name">{{ currentSong.name }}</div>
            <div class="npc-artist">{{ currentSong.artist }}</div>
          </div>
          <!-- 歌词切换按钮 -->
          <button
              :class="{ active: showLyrics }"
              class="npc-lyric-btn"
              title="歌词"
              @click="showLyrics = !showLyrics"
          >
            <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
              <path
                  d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
            </svg>
          </button>
        </div>

        <!-- 歌词显示区域 -->
        <div v-if="showLyrics && currentSong.id" class="lyrics-container">
          <div v-if="lyrics.length > 0" ref="lyricsRef" class="lyrics-scroll">
            <div
                v-for="(line, index) in lyrics"
                :key="index"
                :class="{ active: index === currentLyricIndex }"
                class="lyric-line"
            >
              {{ line.text }}
            </div>
          </div>
          <div v-else class="lyrics-empty">暂无歌词</div>
        </div>

        <!-- 播放控制 -->
        <div class="player-controls">
          <button class="ctrl-btn" title="上一首" @click="prevSong">
            <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button :title="isPlaying ? '暂停' : '播放'" class="ctrl-btn play-btn" @click="togglePlay">
            <svg v-if="!isPlaying" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button class="ctrl-btn" title="下一首" @click="nextSong">
            <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        <!-- 热歌榜列表 -->
        <div class="hot-songs-section">
          <div class="section-title">
            热歌榜
            <span v-if="hotSongs.length === 0" class="loading-text">(加载中...)</span>
          </div>
          <div v-if="hotSongs.length > 0" class="hot-songs-list">
            <div
                v-for="(song, index) in hotSongs"
                :key="song.id"
                :class="{ active: currentSong.id === song.id }"
                class="hot-song-item"
                @click="playHotSong(index)"
            >
              <span class="song-index">{{ index + 1 }}</span>
              <span class="song-name">{{ song.name }}</span>
              <span class="song-artist">{{ song.artist }}</span>
              <!-- 播放中图标 -->
              <span v-if="currentSong.id === song.id && isPlaying" class="playing-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
          <div v-else class="hot-songs-empty">
            暂无可用歌曲
          </div>
        </div>

        <!-- 进度条和音量控制 -->
        <div class="progress-section">
          <!-- 第一行：时间 + 歌曲进度条 -->
          <div class="progress-row">
            <span class="time-text">{{ formatTime(currentTime) }}</span>
            <div class="progress-bar-ui" @click="seek">
              <div class="progress-bg">
                <div :style="{ width: progressPercent + '%' }" class="progress-fill-ui"></div>
              </div>
            </div>
          </div>

          <!-- 第二行：音量图标 + 音量进度条 -->
          <div class="progress-row">
            <svg class="vol-icon-small" fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
              <path v-if="volume > 50"
                    d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              <path v-else-if="volume > 0"
                    d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
              <path v-else
                    d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
            <div class="vol-bar-ui">
              <div class="vol-bg">
                <div :style="{ width: volume + '%' }" class="vol-fill-ui"></div>
              </div>
              <input
                  v-model="volume"
                  class="vol-slider-overlay"
                  max="100"
                  min="0"
                  type="range"
              />
            </div>
          </div>
        </div>

      </div>

      <!-- 音频元素 - 放在面板外面，避免关闭面板时停止播放 -->
      <audio
          ref="audioRef"
          :src="audioSrc"
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
import {ref, computed, watch, onMounted, nextTick} from 'vue'
import {useData} from 'vitepress'

const {isDark} = useData() // 获取当前主题模式

const isExpanded = ref(false)
const isPlaying = ref(false)
const searchKeyword = ref('')
const searchResults = ref<any[]>([])
const currentSong = ref({id: '', name: '', artist: '', cover: '', url: ''})
const audioRef = ref<HTMLAudioElement>()
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(50)
const playlist = ref<any[]>([])
const currentIndex = ref(-1)
const hotSongs = ref<any[]>([]) // 热歌榜
const hotSongsIndex = ref(0) // 热歌榜当前播放索引
const lyrics = ref<{ time: number; text: string }[]>([]) // 歌词列表
const currentLyricIndex = ref(-1) // 当前歌词索引
const showLyrics = ref(false) // 是否显示歌词面板
const lyricsRef = ref<HTMLElement>() // 歌词容器ref
const autoPlayBlocked = ref(false) // 自动播放是否被阻止

const audioSrc = computed(() => currentSong.value.url)

// 加载热歌榜
const loadHotSongs = async () => {
  try {
    console.log('开始加载热歌榜...')
    const response = await fetch('https://music-api.heheda.top/playlist/detail?id=3778678')
    const data = await response.json()
    console.log('热歌榜API返回:', data)

    // 适配不同的API返回结构
    let tracks: any[] = []
    if (data.result?.tracks) {
      tracks = data.result.tracks
    } else if (data.playlist?.tracks) {
      tracks = data.playlist.tracks
    } else if (Array.isArray(data.tracks)) {
      tracks = data.tracks
    }

    if (tracks.length > 0) {
      console.log(`获取到${tracks.length}首歌曲，检查可播放性...`)
      // 检查所有歌曲的可播放性
      const songsWithStatus = await Promise.all(
          tracks.map(async (song: any) => {
            let canPlay = false
            let url = ''

            try {
              // 检查是否有播放URL
              const urlRes = await fetch(`https://music-api.heheda.top/song/url?id=${song.id}`)
              const urlData = await urlRes.json()
              url = urlData.data?.[0]?.url || urlData.url || ''
              canPlay = !!url
            } catch (e) {
              canPlay = false
            }

            // 获取封面
            const cover = song.al?.picUrl || song.album?.picUrl || song.cover || ''
            // 获取歌手名
            const artist = song.ar?.map((a: any) => a.name).join('/') ||
                song.artists?.map((a: any) => a.name).join('/') ||
                song.artist || '未知歌手'

            return {
              id: song.id.toString(),
              name: song.name,
              artist,
              cover,
              url,
              canPlay
            }
          })
      )

      // 只保留可播放的歌曲
      hotSongs.value = songsWithStatus.filter(song => song.canPlay)
      console.log('热歌榜加载完成，可播放歌曲:', hotSongs.value.length, '首')

      // 自动播放第一首（圆球状态，不打开面板）
      if (hotSongs.value.length > 0) {
        console.log('自动播放第一首:', hotSongs.value[0].name)
        // 确保面板保持关闭状态
        isExpanded.value = false
        playHotSong(0)
      } else {
        console.warn('没有可播放的歌曲')
      }
    } else {
      console.warn('API返回中没有歌曲数据')
    }
  } catch (error) {
    console.error('加载热歌榜失败:', error)
  }
}

// 解析歌词
const parseLyrics = (lyricStr: string) => {
  if (!lyricStr) return []
  const lines = lyricStr.split('\n')
  const result: { time: number; text: string }[] = []

  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

  lines.forEach(line => {
    const match = line.match(timeRegex)
    if (match) {
      const minutes = parseInt(match[1])
      const seconds = parseInt(match[2])
      const milliseconds = parseInt(match[3].padEnd(3, '0'))
      const time = minutes * 60 + seconds + milliseconds / 1000
      const text = line.replace(timeRegex, '').trim()
      if (text) {
        result.push({time, text})
      }
    }
  })

  return result.sort((a, b) => a.time - b.time)
}

// 获取歌词
const fetchLyrics = async (songId: string) => {
  try {
    const response = await fetch(`https://music-api.heheda.top/lyric?id=${songId}`)
    const data = await response.json()
    if (data.lrc?.lyric) {
      lyrics.value = parseLyrics(data.lrc.lyric)
    } else {
      lyrics.value = []
    }
  } catch (error) {
    console.error('获取歌词失败:', error)
    lyrics.value = []
  }
}

// 更新当前歌词
const updateCurrentLyric = () => {
  if (lyrics.value.length === 0) return

  const current = currentTime.value
  let index = -1

  for (let i = 0; i < lyrics.value.length; i++) {
    if (current >= lyrics.value[i].time) {
      index = i
    } else {
      break
    }
  }

  if (index !== currentLyricIndex.value) {
    currentLyricIndex.value = index

    // 自动滚动到当前歌词
    if (showLyrics.value && lyricsRef.value && index >= 0) {
      const activeLine = lyricsRef.value.children[index] as HTMLElement
      if (activeLine) {
        activeLine.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
    }
  }
}

// 播放热歌榜歌曲
const playHotSong = async (index: number) => {
  if (hotSongs.value.length === 0) return

  // 确保索引在范围内
  if (index >= hotSongs.value.length) index = 0
  if (index < 0) index = hotSongs.value.length - 1

  hotSongsIndex.value = index
  const song = hotSongs.value[index]

  // 设置当前歌曲
  currentSong.value = song

  // 获取歌词
  await fetchLyrics(song.id)

  // 添加到播放列表
  const existingIndex = playlist.value.findIndex(s => s.id === song.id)
  if (existingIndex === -1) {
    playlist.value.push(song)
    currentIndex.value = playlist.value.length - 1
  } else {
    currentIndex.value = existingIndex
  }

  // 自动播放 - 等待音频元素准备好
  nextTick(() => {
    if (audioRef.value) {
      const audio = audioRef.value

      // 尝试播放函数
      const tryPlay = () => {
        audio.play().then(() => {
          console.log('播放成功:', song.name)
          autoPlayBlocked.value = false
        }).catch(err => {
          console.log('自动播放被阻止，等待用户首次交互:', err.message)
          // 设置标志，表示自动播放被阻止
          autoPlayBlocked.value = true
          isPlaying.value = false
        })
      }

      // 使用 canplaythrough 确保音频已缓冲足够数据
      const onCanPlayThrough = () => {
        tryPlay()
        audio.removeEventListener('canplaythrough', onCanPlayThrough)
      }

      // 如果已经加载完成，直接播放
      if (audio.readyState >= 4) {
        tryPlay()
      } else {
        // 等待 canplaythrough 事件
        audio.addEventListener('canplaythrough', onCanPlayThrough)
        // 同时监听 canplay 作为备用
        audio.addEventListener('canplay', onCanPlayThrough)
        // 超时处理（3秒）
        setTimeout(() => {
          audio.removeEventListener('canplaythrough', onCanPlayThrough)
          audio.removeEventListener('canplay', onCanPlayThrough)
        }, 3000)
      }
    }
  })
}

// 播放下一首热歌
const playNextHotSong = () => {
  playHotSong(hotSongsIndex.value + 1)
}

// 组件挂载时加载热歌榜
onMounted(() => {
  loadHotSongs()

  // 监听用户首次交互，用于恢复被阻止的自动播放
  const handleFirstInteraction = (e: Event) => {
    // 检查是否是圆球点击（避免重复触发）
    const target = e.target as HTMLElement
    const isBallClick = target.closest('.control-ball') !== null

    if (autoPlayBlocked.value && audioRef.value && currentSong.value.url && !isBallClick) {
      console.log('检测到用户页面交互，自动恢复播放')
      audioRef.value.play().then(() => {
        autoPlayBlocked.value = false
        isPlaying.value = true
        console.log('自动恢复播放成功')
      }).catch(err => {
        console.log('自动恢复播放失败:', err.message)
      })
    }
    // 移除监听，只执行一次
    document.removeEventListener('click', handleFirstInteraction)
    document.removeEventListener('touchstart', handleFirstInteraction)
  }

  document.addEventListener('click', handleFirstInteraction)
  document.addEventListener('touchstart', handleFirstInteraction)
})

const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const togglePanel = () => {
  // 如果有歌曲正在播放或已暂停，点击悬浮球展开面板
  // 如果没有歌曲，也展开面板
  isExpanded.value = !isExpanded.value
}

const togglePlay = () => {
  // 如果没有歌曲或歌曲URL为空，播放热歌榜第一首
  if (!currentSong.value.url) {
    // 如果热歌榜已加载，播放第一首
    if (hotSongs.value.length > 0) {
      playHotSong(0)
    } else {
      // 热歌榜未加载完成，等待加载后播放
      console.log('热歌榜加载中，请稍后再试')
    }
    return
  }

  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play().catch(err => {
      console.error('播放失败:', err)
    })
  }
}

const search = async () => {
  console.log('开始搜索:', searchKeyword.value)
  // 搜索时关闭歌词面板
  showLyrics.value = false

  if (!searchKeyword.value.trim()) {
    searchResults.value = []
    return
  }
  try {
    const response = await fetch(
        `https://music-api.heheda.top/search?keywords=${encodeURIComponent(searchKeyword.value)}&limit=20`
    )
    const data = await response.json()
    console.log('搜索结果:', data)
    if (data.result?.songs) {
      // 检查每首歌是否有播放资源
      const songsWithStatus = await Promise.all(
          data.result.songs.map(async (song: any) => {
            let canPlay = false
            let url = ''

            try {
              // 检查是否有播放URL
              const urlRes = await fetch(`https://music-api.heheda.top/song/url?id=${song.id}`)
              const urlData = await urlRes.json()
              url = urlData.data?.[0]?.url
              canPlay = !!url
            } catch (e) {
              canPlay = false
            }

            // 获取封面
            let cover = ''
            try {
              const detailRes = await fetch(`https://music-api.heheda.top/song/detail?ids=${song.id}`)
              const detailData = await detailRes.json()
              cover = detailData.songs?.[0]?.al?.picUrl || ''
            } catch (e) {
            }

            return {
              id: song.id,
              name: song.name,
              artist: song.artists?.map((a: any) => a.name).join('/') || '未知歌手',
              cover,
              url,
              canPlay
            }
          })
      )

      searchResults.value = songsWithStatus
      console.log('搜索结果（含播放状态）:', searchResults.value)
    }
  } catch (error) {
    console.error('搜索失败:', error)
  }
}

const playSong = async (song: any) => {
  console.log('点击播放:', song)
  try {
    // 使用缓存的URL，如果没有则重新获取
    let url = song.url
    if (!url) {
      const urlRes = await fetch(`https://music-api.heheda.top/song/url?id=${song.id}`)
      const urlData = await urlRes.json()
      url = urlData.data?.[0]?.url
    }

    if (!url) {
      alert('该歌曲暂无播放资源')
      return
    }

    // 获取封面（如果没有）
    let cover = song.cover
    if (!cover) {
      try {
        const detailRes = await fetch(`https://music-api.heheda.top/song/detail?ids=${song.id}`)
        const detailData = await detailRes.json()
        cover = detailData.songs?.[0]?.al?.picUrl || ''
      } catch (e) {
      }
    }

    currentSong.value = {...song, url, cover}

    // 获取歌词
    await fetchLyrics(song.id)

    // 添加到播放列表
    const existingIndex = playlist.value.findIndex(s => s.id === song.id)
    if (existingIndex === -1) {
      playlist.value.push({...song, cover})
      currentIndex.value = playlist.value.length - 1
    } else {
      currentIndex.value = existingIndex
    }

    searchResults.value = []
    searchKeyword.value = ''

    // 关闭面板
    isExpanded.value = false

    // 自动播放
    setTimeout(() => {
      if (audioRef.value) {
        console.log('开始播放，音频源:', audioRef.value.src)
        audioRef.value.play().catch(err => {
          console.error('播放失败:', err)
          alert('播放失败，请检查音频资源')
        })
      }
    }, 500)
  } catch (error) {
    console.error('播放失败:', error)
  }
}

const prevSong = () => {
  // 播放上一首热歌
  if (hotSongs.value.length === 0) return
  let newIndex = hotSongsIndex.value - 1
  if (newIndex < 0) newIndex = hotSongs.value.length - 1
  playHotSong(newIndex)
}

const nextSong = () => {
  // 播放下一首热歌
  playNextHotSong()
}

const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    updateCurrentLyric()
  }
}

const onLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
  }
}

const onEnded = () => {
  // 播放下一首热歌
  playNextHotSong()
}

const seek = (e: MouseEvent) => {
  if (!audioRef.value || duration.value === 0) return
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  audioRef.value.currentTime = percent * duration.value
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

watch(volume, (val) => {
  if (audioRef.value) {
    audioRef.value.volume = val / 100
  }
})
</script>

<style scoped>
.music-player {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
}

/* 悬浮控制球 */
.control-ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.control-ball:hover {
  transform: scale(1.05);
}

.ball-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.ball-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ball-icon {
  color: white;
  font-size: 24px;
}

/* 播放状态指示器 */
.playing-indicator {
  position: absolute;
  bottom: 4px;
  left: 4px;
  width: 18px;
  height: 18px;
  background: rgba(255, 107, 107, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0 4px;
  cursor: pointer;
}

/* 展开面板按钮 */
.expand-btn {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 10px;
  color: white;
}

.playing-indicator span {
  width: 2px;
  height: 8px;
  background: white;
  border-radius: 1px;
  animation: sound 0.5s ease-in-out infinite;
}

.playing-indicator span:nth-child(2) {
  animation-delay: 0.1s;
}

.playing-indicator span:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes sound {
  0%, 100% {
    height: 4px;
  }
  50% {
    height: 10px;
  }
}

/* 播放器面板 - 默认亮色 */
.player-panel {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 320px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: 20px;
  color: #333;
}

/* 暗色主题 */
.music-player.dark .player-panel {
  background: #1a1a1a;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: white;
}

.panel-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 50%;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.music-player.dark .panel-close {
  background: rgba(255, 255, 255, 0.1);
  color: #999;
}

.music-player.dark .panel-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* 搜索区域 */
.search-section {
  margin-bottom: 16px;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.search-box input {
  flex: 1;
  height: 36px;
  padding: 0 14px;
  border: 1px solid #e0e0e0;
  border-radius: 18px;
  font-size: 13px;
  outline: none;
  background: #f5f5f5;
  color: #333;
}

.search-box input::placeholder {
  color: #999;
}

.music-player.dark .search-box input {
  border: 1px solid #333;
  background: #2a2a2a;
  color: white;
}

.music-player.dark .search-box input::placeholder {
  color: #666;
}

.search-btn {
  height: 36px;
  padding: 0 16px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 13px;
  cursor: pointer;
}

.search-btn:hover {
  background: #ee5a6f;
}

/* 搜索结果 */
.search-results {
  max-height: 180px;
  overflow-y: scroll;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.search-results::-webkit-scrollbar {
  display: none;
}

.music-player.dark .search-results {
  background: #2a2a2a;
}

.song-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.song-item:hover {
  background: #e8e8e8;
}

.music-player.dark .song-item:hover {
  background: #333;
}

.song-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.song-item.disabled:hover {
  background: transparent;
}

.no-play-tip {
  font-size: 10px;
  color: #ff6b6b;
  margin-top: 2px;
}

.disabled-icon {
  background: #666 !important;
}

.song-cover {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

.default-cover {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
}

.song-info {
  flex: 1;
  min-width: 0;
}

.song-name {
  font-size: 13px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.music-player.dark .song-name {
  color: white;
}

.song-artist {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}

.music-player.dark .song-artist {
  color: #999;
}

.play-icon {
  width: 28px;
  height: 28px;
  background: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
}

/* 当前播放卡片 */
.now-playing-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.music-player.dark .now-playing-card {
  background: #333;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.npc-cover {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.npc-info {
  flex: 1;
  min-width: 0;
}

.npc-name {
  font-size: 15px;
  color: #333;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.music-player.dark .npc-name {
  color: white;
}

.npc-artist {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

/* 歌词切换按钮 */
.npc-lyric-btn {
  width: 36px;
  height: 36px;
  background: #8b5a5a;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
  box-shadow: 0 2px 6px rgba(139, 90, 90, 0.3);
}

.npc-lyric-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 8px rgba(139, 90, 90, 0.4);
}

.npc-lyric-btn.active {
  background: #ff6b6b;
  box-shadow: 0 2px 6px rgba(255, 107, 107, 0.4);
}

.npc-lyric-btn.active:hover {
  box-shadow: 0 3px 8px rgba(255, 107, 107, 0.5);
}

/* 歌词区域 */
.lyrics-container {
  max-height: 150px;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  text-align: center;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.lyrics-container::-webkit-scrollbar {
  display: none;
}

.music-player.dark .lyrics-container {
  background: rgba(255, 255, 255, 0.06);
}

.lyrics-scroll {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lyric-line {
  font-size: 13px;
  color: #999;
  line-height: 2;
  transition: all 0.3s;
  opacity: 0.7;
}

.lyric-line.active {
  color: #ff6b6b;
  font-size: 15px;
  font-weight: 600;
  opacity: 1;
  transform: scale(1.05);
}

.music-player.dark .lyric-line {
  color: #888;
}

.music-player.dark .lyric-line.active {
  color: #ff6b6b;
}

.lyrics-empty {
  font-size: 13px;
  color: #999;
  padding: 20px 0;
}

/* 播放控制 */
.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}

.ctrl-btn {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 50%;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.ctrl-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.ctrl-btn svg {
  display: block;
}

.music-player.dark .ctrl-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.music-player.dark .ctrl-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.play-btn {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
}

.play-btn:hover {
  background: linear-gradient(135deg, #ee5a6f 0%, #ff6b6b 100%);
  transform: scale(1.05);
}

/* 进度条 */
.progress-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.time {
  font-size: 11px;
  color: #666;
  min-width: 32px;
  text-align: center;
}

.music-player.dark .time {
  color: #999;
}

.progress-track {
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.music-player.dark .progress-track {
  background: #333;
}

.progress-fill {
  height: 100%;
  background: #ff6b6b;
  border-radius: 2px;
  transition: width 0.1s;
}

/* 热歌榜列表 */
.hot-songs-section {
  margin-bottom: 12px;
}

.section-title {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.loading-text {
  font-size: 11px;
  color: #ccc;
  font-weight: normal;
}

.hot-songs-empty {
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
}

.hot-songs-list {
  max-height: 110px;
  overflow-y: scroll;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hot-songs-list::-webkit-scrollbar {
  display: none;
}

.music-player.dark .hot-songs-list {
  background: rgba(255, 255, 255, 0.08);
}

.hot-song-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 12px;
  overflow: hidden;
  min-width: 0;
}

.hot-song-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.hot-song-item.active {
  background: rgba(255, 107, 107, 0.15);
}

.music-player.dark .hot-song-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.music-player.dark .hot-song-item.active {
  background: rgba(255, 107, 107, 0.2);
}

.song-index {
  width: 18px;
  text-align: center;
  color: #ff6b6b;
  font-weight: 600;
  font-size: 11px;
}

.hot-song-item .song-name {
  flex: 0 0 auto;
  max-width: 55%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}

.music-player.dark .hot-song-item .song-name {
  color: white;
}

.hot-song-item .song-artist {
  flex: 1;
  min-width: 0;
  color: #999;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

/* 播放中动画图标 */
.playing-icon {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
  margin-left: 4px;
}

.playing-icon span {
  width: 2px;
  background: #ff6b6b;
  border-radius: 1px;
  animation: playing 0.6s ease-in-out infinite;
}

.playing-icon span:nth-child(1) {
  height: 6px;
  animation-delay: 0s;
}

.playing-icon span:nth-child(2) {
  height: 10px;
  animation-delay: 0.2s;
}

.playing-icon span:nth-child(3) {
  height: 8px;
  animation-delay: 0.4s;
}

@keyframes playing {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.6);
  }
}

/* 进度条区域 */
.progress-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 4px;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 时间文本 */
.time-text {
  font-size: 11px;
  color: #666;
  min-width: 32px;
  text-align: left;
}

.music-player.dark .time-text {
  color: #999;
}

/* 音量小图标 */
.vol-icon-small {
  color: #999;
  flex-shrink: 0;
}

.music-player.dark .vol-icon-small {
  color: #666;
}

/* 歌曲进度条 */
.progress-bar-ui {
  flex: 1;
  height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.progress-bg {
  width: 100%;
  height: 3px;
  background: #e0e0e0;
  border-radius: 2px;
  position: relative;
}

.music-player.dark .progress-bg {
  background: #444;
}

.progress-fill-ui {
  height: 100%;
  background: #ff6b6b;
  border-radius: 2px;
  position: relative;
}

.progress-fill-ui::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* 音量进度条 */
.vol-bar-ui {
  flex: 1;
  height: 20px;
  display: flex;
  align-items: center;
  position: relative;
}

.vol-bg {
  width: 100%;
  height: 3px;
  background: #e0e0e0;
  border-radius: 2px;
  position: relative;
}

.music-player.dark .vol-bg {
  background: #444;
}

.vol-fill-ui {
  height: 100%;
  background: #ff6b6b;
  border-radius: 2px;
  position: relative;
}

.vol-fill-ui::after {
  content: '';
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* 音量滑块 - 透明覆盖层 */
.vol-slider-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  margin: 0;
}

/* 保留旧的音量滑块样式（用于其他地方） */
.vol-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
}

.music-player.dark .vol-slider {
  background: #333;
}

.vol-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #ff6b6b;
  border-radius: 50%;
  cursor: pointer;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .music-player {
    right: 10px;
    bottom: 20px;
  }

  .player-panel {
    width: 300px;
  }
}
</style>
