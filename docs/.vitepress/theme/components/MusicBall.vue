<!--
 * @Author: GZF
 * @Description: 悬浮音乐球组件 - 重构版
 * 使用组合式函数管理状态，支持播放模式切换、本地存储持久化
-->

<template>
  <Teleport to="body">
    <div
        :class="{ 'active': isPlaylistVisible, 'escook-music-ball': true }"
        :style="positionStyle"
        @mouseenter="cancelHidePlaylist"
        @mouseleave="hidePlaylist"
    >
      <!-- 播放列表面板 -->
      <Transition name="slide-up">
        <div
            v-show="isPlaylistVisible"
            class="music-playlist"
            @mouseenter="setMouseOverPlaylist(true)"
            @mouseleave="setMouseOverPlaylist(false); hidePlaylist()"
        >
          <!-- 搜索区域 -->
          <div class="search-section">
            <div class="search-box">
              <input
                  v-model="searchKeyword"
                  :placeholder="isSearching ? '搜索中...' : '搜索歌曲、歌手...'"
                  type="text"
                  @keyup.enter="search(searchKeyword)"
              >
              <button
                  :disabled="isSearching"
                  class="search-btn"
                  @click="search(searchKeyword)"
              >
                <span v-if="!isSearching" class="search-icon">🔍</span>
                <span v-else class="loading-spinner"></span>
              </button>
            </div>
          </div>

          <!-- 搜索结果 -->
          <div v-if="showSearchResults" class="search-results">
            <div class="results-header">
              <span>搜索结果 ({{ searchResults.length }})</span>
              <button class="close-btn" @click="clearSearch">×</button>
            </div>
            <div class="results-list">
              <div
                  v-for="song in searchResults"
                  :key="song.id"
                  class="song-item"
                  @click="playSongImmediately(song)"
              >
                <span class="song-name">{{ song.name }}</span>
                <span class="song-artist">{{ song.artist }}</span>
              </div>
              <div v-if="searchResults.length === 0 && hasSearched" class="empty-tip">
                未找到相关歌曲
              </div>
            </div>
          </div>

          <!-- 播放列表 -->
          <div v-else class="playlist-content">
            <div class="playlist-header">
              <span>播放列表 ({{ playlist.length }})</span>
              <button
                  v-if="playlist.length > 0"
                  class="clear-btn"
                  @click="clearPlaylist"
              >
                清空
              </button>
            </div>
            <div class="playlist-scroll">
              <div
                  v-for="(song, index) in playlist"
                  :key="song.id"
                  :class="{ 'active': currentIndex === index }"
                  class="playlist-item"
              >
                <div class="song-info" @click="playByIndex(index)">
                  <img
                      v-if="currentIndex === index && isPlaying"
                      alt="playing"
                      class="playing-icon"
                      src="data:image/gif;base64,R0lGODlhSABIAPfCAP/1+f9vn//i7P/7/P9rnf+Yuv94pf/6+/9xoP9rnP/9/v/o8P/m7v90ov/u9P/o7/+Ksf/8/f9zof9qnP/x9v+gwP9xof/+/v/0+P/n7//p8f/s8v95pf/7/f+qxv98p/+pxv/Q3/+rx//9/f9nmv9yof/4+//u8//z9//v9P/t8/+80v9pm//m7/+Zu/+dvf+80/9un/+Yu/9tnf9unv9nmf/d6P9tnv93pf+Gr/95pv/w9f9woP90o//y9v/c6P+Os//q8f/r8f+JsP9zov91o/+Rtf+hwf+vyv99qP+Aqv+Aq//k7f/p8P9+qf/K3P/5+//3+v/3+f/d6f/2+f/r8v+Frv/v9f+Drf/6/P9qm/92pP+Ir/+40P/f6f99qf/U4/+Jsf/P3/+VuP9om//S4f/L3f/W5P96p/+St/+Msv98qP+90//O3v/b5//T4f/T4v/R4P/h6/9wn/9omv/l7v/C1v+IsP+1zf/g6//4+v+jwf/y9/+50f+wy/+fv//e6f+Ptf+yzP/X5P/W4//E1/+bvf/a5v/I2v+CrP/C1//x9f+UuP++1P+pxf+Qtf+tyP/L3P+Frf+Ns//f6v/Z5v/A1f9snf+PtP/D1/+lw//B1f+nxP+kw/+Grv+DrP/M3f/J2//U4v+mw//l7f+gv/+hwP/c5/+2zv+evv/j7f+tyf/j7P/G2f+Rtv/1+P+mxP/Z5f+Hr//O3/96pv+Lsf/s8/+2z/+jwv/g6v+Ut//a5/+Vuf9/qv/H2v9/qf+Erf9mmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTczRTY3QTRGODczMTFFQkI0RjFFNzNEMDE1NTkzOUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTczRTY3QTVGODczMTFFQkI0RjFFNzNEMDE1NTkzOUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NzNFNjdBMkY4NzMxMUVCQjRGMUU3M0QwMTU1OTM5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NzNFNjdBM0Y4NzMxMUVCQjRGMUU3M0QwMTU1OTM5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEw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"
                  >
                  <span class="name">{{ song.name }}</span>
                  <span class="artist">{{ song.artist }}</span>
                </div>
                <button class="remove-btn" @click.stop="removeFromPlaylist(index)">×</button>
              </div>
              <div v-if="playlist.length === 0" class="empty-state">
                <div class="empty-icon">🎵</div>
                <div class="empty-text">暂无歌曲</div>
                <div class="empty-subtext">搜索歌曲添加到播放列表</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- 错误提示 -->
      <Transition name="fade">
        <div v-if="errorMessage" class="error-toast">
          {{ errorMessage }}
        </div>
      </Transition>

      <!-- 控制面板 -->
      <div class="escook-music-ball__inner">
        <!-- 上一首 -->
        <div class="control-btn prev-btn" title="上一首 (←)" @click.stop="playPrev">
          <span class="iconfont">⏮</span>
        </div>

        <div class="escook-play-pause" :class="{ 'loading': isLoading }" title="播放/暂停 (空格)" @click.stop="togglePlay">
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-else-if="!isPlaying" class="iconfont icon-playfill"></span>
          <span v-else class="iconfont icon-pause"></span>
        </div>

        <!-- 下一首 -->
        <div class="control-btn next-btn" title="下一首 (→)" @click.stop="playNext">
          <span class="iconfont">⏭</span>
        </div>

        <div class="escook-time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>

        <div class="escook-duration">
          <ElSlider v-model="progressValue" :show-tooltip="false"/>
        </div>

        <div class="escook-volume">
          <ElSlider v-model="volumeValue" :show-tooltip="false"/>
          <span
              :class="isMuted ? 'icon-ic_volume_off' : 'icon-ic_volume_up'"
              class="iconfont"
              @click="toggleMute"
          ></span>
        </div>

        <!-- 播放模式切换 -->
        <div class="play-mode-btn" :title="playModeText" @click.stop="togglePlayMode">
          <span class="mode-icon">{{ playModeIcon }}</span>
        </div>

        <div class="escook-music-list-button" @click.stop="togglePlaylist">
          <span class="iconfont icon-music_list"></span>
        </div>
      </div>

      <!-- 音频元素 -->
      <audio
          ref="audioRef"
          :src="currentSong?.url"
          @ended="onAudioEnded"
          @loadedmetadata="onAudioLoadedMetadata"
          @pause="onAudioPause"
          @play="onAudioPlay"
          @timeupdate="onAudioTimeUpdate"
      ></audio>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElSlider } from 'element-plus'
import { useMusicPlayer } from '../composables/useMusicPlayer'

const {
  isPlaying, isMuted, volumeValue, currentTime, duration,
  progressValue, playMode, playlist, currentIndex, currentSong,
  isPlaylistVisible, searchKeyword, searchResults, isSearching, hasSearched,
  errorMessage, isLoading, audioRef, togglePlay, toggleMute, togglePlayMode,
  togglePlaylist, hidePlaylist, cancelHidePlaylist, setMouseOverPlaylist,
  playByIndex, playPrev, playNext, removeFromPlaylist, playSongImmediately,
  search, clearSearch, formatTime, onAudioEnded, onAudioLoadedMetadata,
  onAudioPause, onAudioPlay, onAudioTimeUpdate
} = useMusicPlayer()

// 播放模式图标和文本
const playModeIcon = computed(() => {
  const icons: Record<string, string> = {
    sequence: '➡️',
    random: '🔀',
    loop: '🔁'
  }
  return icons[playMode.value] || '➡️'
})

const playModeText = computed(() => {
  const texts: Record<string, string> = {
    sequence: '顺序播放',
    random: '随机播放',
    loop: '单曲循环'
  }
  return texts[playMode.value] || '顺序播放'
})

// 是否显示搜索结果
const showSearchResults = computed(() => {
  return hasSearched.value || searchResults.value.length > 0
})

// 位置样式
const positionStyle = computed(() => ({
  left: '15px',
  bottom: '15px'
}))

// 清空播放列表
const clearPlaylist = () => {
  playlist.value = []
  currentIndex.value = 0
}

// 监听搜索关键词变化，自动防抖搜索
watch(searchKeyword, (newVal) => {
  if (newVal.trim()) {
    // 使用防抖搜索
    const timer = setTimeout(() => {
      search(newVal)
    }, 300)
    // 清理函数会在组件卸载时执行
    return () => clearTimeout(timer)
  } else {
    clearSearch()
  }
})
</script>

<style scoped>
/* 播放列表面板 */
.music-playlist {
  position: absolute;
  bottom: 55px;
  left: 0;
  width: 100%;
  max-height: 300px;
  background: var(--music-list-bgcolor, #f6f6f7);
  border: 1px solid var(--music-list-bdcolor, #efefef);
  border-radius: 12px;
  overflow: hidden;
  z-index: 100;
}

/* 动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 搜索区域 */
.search-section {
  padding: 10px;
  border-bottom: 1px solid var(--music-list-sep-color, #ece9e9);
}

.search-box {
  display: flex;
  gap: 8px;
  background: var(--vp-c-bg, #fff);
  border-radius: 20px;
  padding: 5px;
  border: 1px solid var(--vp-c-divider, #e5e5e5);
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 5px 10px;
  outline: none;
  color: var(--vp-c-text-1, #333);
  font-size: 12px;
}

.search-btn {
  border: none;
  background: var(--vp-c-brand, #409eff);
  color: #fff;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-icon {
  font-size: 12px;
}

.loading-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* 搜索结果 */
.search-results {
  max-height: 200px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  font-size: 11px;
  color: var(--vp-c-text-2, #666);
  border-bottom: 1px solid var(--music-list-sep-color, #ece9e9);
}

.close-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: var(--vp-c-text-2, #666);
}

.results-list {
  max-height: 150px;
  overflow-y: auto;
}

/* 播放列表内容 */
.playlist-content {
  max-height: 250px;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  font-size: 11px;
  color: var(--vp-c-text-2, #666);
  border-bottom: 1px solid var(--music-list-sep-color, #ece9e9);
}

.clear-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 11px;
  color: var(--vp-c-brand, #409eff);
}

.playlist-scroll {
  max-height: 200px;
  overflow-y: auto;
}

/* 歌曲项 */
.song-item,
.playlist-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.song-item:hover,
.playlist-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.playlist-item.active {
  background: rgba(241, 106, 151, 0.1);
}

.song-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.song-name,
.playlist-item .name {
  font-size: 12px;
  color: var(--vp-c-text-1, #333);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist,
.playlist-item .artist {
  font-size: 10px;
  color: var(--vp-c-text-2, #666);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playing-icon {
  width: 12px;
  height: 12px;
  margin-right: 6px;
}

.remove-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-2, #666);
  padding: 0 4px;
}

.remove-btn:hover {
  color: #f16a97;
}

/* 空状态 */
.empty-state {
  padding: 30px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 14px;
  color: var(--vp-c-text-1, #333);
  margin-bottom: 4px;
}

.empty-subtext {
  font-size: 12px;
  color: var(--vp-c-text-2, #666);
}

.empty-tip {
  padding: 20px;
  text-align: center;
  color: var(--vp-c-text-2, #666);
  font-size: 12px;
}

/* 播放模式按钮 */
.play-mode-btn {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 4px;
}

.mode-icon {
  font-size: 14px;
}

/* 动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 错误提示 */
.error-toast {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4d4f;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 200;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 加载动画 */
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--vp-c-brand, #409eff);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.escook-play-pause.loading {
  opacity: 0.8;
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 控制按钮 */
.control-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s;
}

.control-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.control-btn .iconfont {
  font-size: 14px;
}

/* 深色模式适配 */
.dark .music-playlist {
  --music-list-bgcolor: #212223;
  --music-list-bdcolor: #1b1b1f;
  --music-list-sep-color: #1b1b1f;
}
</style>
