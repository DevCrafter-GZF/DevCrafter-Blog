<!--
 * @Author: GZF
 * @Description: 网易云音乐播放器组件
-->

<template>
  <div class="music-player">
    <div class="player-header">
      <span class="player-icon">🎵</span>
      <span class="player-title">音乐播放器</span>
    </div>
    
    <!-- 歌曲选择 -->
    <div class="song-selector">
      <select v-model="currentSongId" @change="changeSong" class="song-select">
        <option value="">选择一首歌曲...</option>
        <option v-for="song in songs" :key="song.id" :value="song.id">
          {{ song.name }} - {{ song.artist }}
        </option>
      </select>
    </div>
    
    <!-- 当前播放信息 -->
    <div v-if="currentSong" class="now-playing">
      <div class="song-info">
        <img :src="currentSong.cover" :alt="currentSong.name" class="song-cover">
        <div class="song-details">
          <div class="song-name">{{ currentSong.name }}</div>
          <div class="song-artist">{{ currentSong.artist }}</div>
        </div>
      </div>
    </div>
    
    <!-- 播放器 -->
    <div v-if="currentSongId" class="player-container">
      <iframe 
        :src="playerUrl" 
        frameborder="0" 
        width="100%" 
        height="86" 
        class="netease-player"
      ></iframe>
    </div>
    
    <!-- 提示信息 -->
    <div v-else class="player-tip">
      <p>🎧 请选择上方列表中的音乐进行播放</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 音乐列表 - 网易云音乐ID
const songs = [
  {
    id: '25706282',
    name: '起风了',
    artist: '买辣椒也用券',
    cover: 'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg'
  },
  {
    id: '1293886117',
    name: '体面',
    artist: '于文文',
    cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
  },
  {
    id: '863046037',
    name: '告白气球',
    artist: '周杰伦',
    cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg'
  },
  {
    id: '1293951677',
    name: '追光者',
    artist: '岑宁儿',
    cover: 'https://p1.music.126.net/8N1fsMRm2L5HyZccc6I3ew==/109951163020571782.jpg'
  },
  {
    id: '27808044',
    name: '平凡之路',
    artist: '朴树',
    cover: 'https://p1.music.126.net/Wp4L-I7qwn_sX0SOe33Qrw==/109951163221161145.jpg'
  },
  {
    id: '186016',
    name: '晴天',
    artist: '周杰伦',
    cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg'
  },
  {
    id: '25706285',
    name: '后来',
    artist: '刘若英',
    cover: 'https://p1.music.126.net/e0gGQI-4KdVqEYHsWiXxbg==/109951163424196263.jpg'
  },
  {
    id: '531295576',
    name: '稻香',
    artist: '周杰伦',
    cover: 'https://p1.music.126.net/W5LJG0CjPF9e5z7nSvbBbg==/18874216602702134.jpg'
  }
]

const currentSongId = ref('')

const currentSong = computed(() => {
  return songs.find(song => song.id === currentSongId.value)
})

const playerUrl = computed(() => {
  if (!currentSongId.value) return ''
  // 网易云音乐外链播放器
  return `https://music.163.com/outchain/player?type=2&id=${currentSongId.value}&auto=0&height=66`
})

const changeSong = () => {
  // 歌曲切换时自动播放
  console.log('切换到歌曲:', currentSong.value?.name)
}
</script>

<style scoped>
.music-player {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
}

.player-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.player-icon {
  font-size: 20px;
}

.player-title {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.song-selector {
  margin-bottom: 12px;
}

.song-select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.song-select:hover,
.song-select:focus {
  border-color: var(--vp-c-brand);
}

.now-playing {
  margin-bottom: 12px;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.song-cover {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
}

.song-details {
  flex: 1;
}

.song-name {
  font-weight: 600;
  font-size: 15px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.song-artist {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.player-container {
  border-radius: 8px;
  overflow: hidden;
}

.netease-player {
  display: block;
}

.player-tip {
  text-align: center;
  padding: 24px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.player-tip p {
  margin: 0;
}

/* 深色模式适配 */
.dark .music-player {
  background: var(--vp-c-bg-soft);
}

.dark .song-info {
  background: var(--vp-c-bg-mute);
}
</style>
