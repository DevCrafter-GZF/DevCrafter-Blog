/**
 * 音乐播放器组合式函数
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { Song, PlayMode } from './types'
import { searchSongs, getHotSongs } from './api'

const STORAGE_KEY = 'music-player-playlist'

export function useMusicPlayer() {
  // ========== 状态定义 ==========
  const isPlaying = ref(false)
  const isMuted = ref(false)
  const volume = ref(50)
  const currentTime = ref(0)
  const duration = ref(0)
  const playMode = ref<PlayMode>('sequence')
  
  const playlist = ref<Song[]>([])
  const currentIndex = ref(0)
  const isPlaylistVisible = ref(false)
  
  const searchKeyword = ref('')
  const searchResults = ref<Song[]>([])
  const isSearching = ref(false)
  const hasSearched = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)
  
  const audioRef = ref<HTMLAudioElement>()
  const searchDebounceTimer = ref<number | null>(null)
  const hidePlaylistTimer = ref<number | null>(null)
  const isMouseOverPlaylist = ref(false)

  // ========== 计算属性 ==========
  const currentSong = computed<Song | null>(() => {
    return playlist.value[currentIndex.value] || null
  })

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

  const volumeValue = computed({
    get() { return volume.value },
    set(val: number) {
      volume.value = val
      if (audioRef.value) {
        audioRef.value.volume = val / 100
      }
    }
  })

  // ========== 播放控制 ==========
  const play = async () => {
    if (!audioRef.value) return
    isLoading.value = true
    errorMessage.value = ''
    try {
      await audioRef.value.play()
    } catch (error) {
      console.error('播放失败:', error)
      errorMessage.value = '歌曲播放失败，请尝试其他歌曲'
      setTimeout(() => {
        errorMessage.value = ''
      }, 3000)
    } finally {
      isLoading.value = false
    }
  }

  const pause = () => {
    audioRef.value?.pause()
  }

  const togglePlay = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  const toggleMute = () => {
    if (!audioRef.value) return
    isMuted.value = !isMuted.value
    audioRef.value.muted = isMuted.value
  }

  // ========== 播放模式 ==========
  const togglePlayMode = () => {
    const modes: PlayMode[] = ['sequence', 'random', 'loop']
    const currentIndex = modes.indexOf(playMode.value)
    playMode.value = modes[(currentIndex + 1) % modes.length]
  }

  const playNext = () => {
    if (playlist.value.length === 0) return

    if (playMode.value === 'loop') {
      // 单曲循环：重新播放当前歌曲
      audioRef.value?.load()
      play()
    } else if (playMode.value === 'random') {
      // 随机播放
      const randomIndex = Math.floor(Math.random() * playlist.value.length)
      currentIndex.value = randomIndex
      play()
    } else {
      // 顺序播放
      if (currentIndex.value < playlist.value.length - 1) {
        currentIndex.value++
        play()
      } else {
        // 到最后一首，回到第一首
        currentIndex.value = 0
        play()
      }
    }
  }

  const playPrev = () => {
    if (playlist.value.length === 0) return

    if (playMode.value === 'loop') {
      // 单曲循环：重新播放当前歌曲
      audioRef.value?.load()
      play()
    } else if (playMode.value === 'random') {
      // 随机播放
      const randomIndex = Math.floor(Math.random() * playlist.value.length)
      currentIndex.value = randomIndex
      play()
    } else {
      // 顺序播放
      if (currentIndex.value > 0) {
        currentIndex.value--
        play()
      } else {
        // 到第一首，回到最后一首
        currentIndex.value = playlist.value.length - 1
        play()
      }
    }
  }

  // ========== 播放列表操作 ==========
  const togglePlaylist = () => {
    isPlaylistVisible.value = !isPlaylistVisible.value
  }

  const hidePlaylist = () => {
    // 延迟隐藏，给鼠标移动到列表区域留出时间
    if (hidePlaylistTimer.value) {
      clearTimeout(hidePlaylistTimer.value)
    }
    hidePlaylistTimer.value = window.setTimeout(() => {
      if (!isMouseOverPlaylist.value) {
        isPlaylistVisible.value = false
      }
    }, 150)
  }

  const cancelHidePlaylist = () => {
    if (hidePlaylistTimer.value) {
      clearTimeout(hidePlaylistTimer.value)
      hidePlaylistTimer.value = null
    }
  }

  const setMouseOverPlaylist = (value: boolean) => {
    isMouseOverPlaylist.value = value
    if (value) {
      cancelHidePlaylist()
    }
  }

  const playByIndex = (index: number) => {
    if (index < 0 || index >= playlist.value.length) return
    currentIndex.value = index
    nextTick(() => play())
  }

  const addToPlaylist = (song: Song) => {
    const exists = playlist.value.findIndex(s => s.id === song.id)
    if (exists >= 0) {
      return exists
    }
    playlist.value.push(song)
    savePlaylist()
    return playlist.value.length - 1
  }

  const removeFromPlaylist = (index: number) => {
    if (index < 0 || index >= playlist.value.length) return
    
    if (index === currentIndex.value) {
      // 删除当前播放的歌曲
      pause()
    }
    
    playlist.value.splice(index, 1)
    
    if (index < currentIndex.value) {
      currentIndex.value--
    } else if (index === currentIndex.value && currentIndex.value >= playlist.value.length) {
      currentIndex.value = 0
    }
    
    savePlaylist()
  }

  const playSongImmediately = async (song: Song) => {
    const index = addToPlaylist(song)
    currentIndex.value = index
    
    // 隐藏列表和搜索结果
    isPlaylistVisible.value = false
    searchResults.value = []
    searchKeyword.value = ''
    hasSearched.value = false
    
    // 等待 DOM 更新后播放
    await nextTick()
    
    if (audioRef.value) {
      audioRef.value.load()
      const playWhenReady = () => {
        audioRef.value?.play()
        audioRef.value?.removeEventListener('canplay', playWhenReady)
      }
      audioRef.value.addEventListener('canplay', playWhenReady)
      setTimeout(() => {
        audioRef.value?.removeEventListener('canplay', playWhenReady)
        audioRef.value?.play().catch(() => {})
      }, 500)
    }
  }

  // ========== 搜索功能 ==========
  const search = async (keyword: string) => {
    if (!keyword.trim()) {
      searchResults.value = []
      hasSearched.value = false
      return
    }

    isSearching.value = true
    hasSearched.value = true

    try {
      searchResults.value = await searchSongs(keyword)
    } catch (error) {
      console.error('搜索失败:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }

  const debouncedSearch = (keyword: string, delay: number = 300) => {
    if (searchDebounceTimer.value) {
      clearTimeout(searchDebounceTimer.value)
    }
    searchDebounceTimer.value = window.setTimeout(() => {
      search(keyword)
    }, delay)
  }

  const clearSearch = () => {
    searchKeyword.value = ''
    searchResults.value = []
    hasSearched.value = false
  }

  // ========== 本地存储 ==========
  const savePlaylist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        songs: playlist.value,
        currentIndex: currentIndex.value,
        volume: volume.value
      }))
    } catch (error) {
      console.error('保存播放列表失败:', error)
    }
  }

  const loadPlaylist = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        const parsed = JSON.parse(data)
        if (parsed.songs?.length > 0) {
          playlist.value = parsed.songs
          currentIndex.value = Math.min(parsed.currentIndex || 0, playlist.value.length - 1)
          volume.value = parsed.volume || 50
        }
      }
    } catch (error) {
      console.error('加载播放列表失败:', error)
    }
  }

  // ========== 音频事件处理 ==========
  const onAudioEnded = () => {
    playNext()
  }

  const onAudioLoadedMetadata = () => {
    if (audioRef.value) {
      duration.value = audioRef.value.duration || 0
    }
  }

  const onAudioTimeUpdate = () => {
    if (audioRef.value) {
      currentTime.value = audioRef.value.currentTime || 0
    }
  }

  const onAudioPlay = () => {
    isPlaying.value = true
  }

  const onAudioPause = () => {
    isPlaying.value = false
  }

  // ========== 键盘快捷键 ==========
  const handleKeydown = (e: KeyboardEvent) => {
    // 忽略输入框中的快捷键
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    switch (e.code) {
      case 'Space':
        e.preventDefault()
        togglePlay()
        break
      case 'ArrowLeft':
        e.preventDefault()
        playPrev()
        break
      case 'ArrowRight':
        e.preventDefault()
        playNext()
        break
      case 'ArrowUp':
        e.preventDefault()
        volume.value = Math.min(100, volume.value + 5)
        break
      case 'ArrowDown':
        e.preventDefault()
        volume.value = Math.max(0, volume.value - 5)
        break
      case 'KeyM':
        e.preventDefault()
        toggleMute()
        break
    }
  }

  // ========== 初始化 ==========
  const init = async () => {
    // 加载本地存储的播放列表
    loadPlaylist()
    
    // 如果没有播放列表，加载热歌榜
    if (playlist.value.length === 0) {
      const hotSongs = await getHotSongs()
      if (hotSongs.length > 0) {
        playlist.value = hotSongs
        savePlaylist()
      }
    }

    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeydown)
  }

  // 监听播放列表变化
  watch(playlist, savePlaylist, { deep: true })
  watch(currentIndex, savePlaylist)
  watch(volume, savePlaylist)

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    if (searchDebounceTimer.value) {
      clearTimeout(searchDebounceTimer.value)
    }
    if (hidePlaylistTimer.value) {
      clearTimeout(hidePlaylistTimer.value)
    }
    document.removeEventListener('keydown', handleKeydown)
  })

  // ========== 格式化工具 ==========
  const formatTime = (time: number): string => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return {
    // 状态
    isPlaying,
    isMuted,
    volume,
    volumeValue,
    currentTime,
    duration,
    progressValue,
    playMode,
    playlist,
    currentIndex,
    currentSong,
    isPlaylistVisible,
    searchKeyword,
    searchResults,
    isSearching,
    hasSearched,
    errorMessage,
    isLoading,
    audioRef,
    
    // 方法
    play,
    pause,
    togglePlay,
    toggleMute,
    togglePlayMode,
    playNext,
    playPrev,
    togglePlaylist,
    hidePlaylist,
    cancelHidePlaylist,
    setMouseOverPlaylist,
    playByIndex,
    addToPlaylist,
    removeFromPlaylist,
    playSongImmediately,
    search,
    debouncedSearch,
    clearSearch,
    formatTime,
    
    // 事件处理
    onAudioEnded,
    onAudioLoadedMetadata,
    onAudioTimeUpdate,
    onAudioPlay,
    onAudioPause
  }
}
