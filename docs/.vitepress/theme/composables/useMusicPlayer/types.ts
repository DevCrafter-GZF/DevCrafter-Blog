/**
 * 音乐播放器类型定义
 */

// 歌曲信息
export interface Song {
  id: string
  name: string
  artist: string
  cover?: string
  url: string
  duration?: number
}

// 播放模式
export enum PlayMode {
  SEQUENCE = 'sequence',  // 顺序播放
  RANDOM = 'random',      // 随机播放
  LOOP = 'loop'           // 单曲循环
}

// 播放器状态
export interface PlayerState {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  currentTime: number
  duration: number
  playMode: PlayMode
}

// 搜索状态
export interface SearchState {
  keyword: string
  results: Song[]
  isSearching: boolean
  hasSearched: boolean
}

// 播放列表状态
export interface PlaylistState {
  songs: Song[]
  currentIndex: number
  isVisible: boolean
}

// API 响应类型
export interface SearchApiResponse {
  result?: {
    songs?: Array<{
      id: number
      name: string
      artists?: Array<{ name: string }>
      album?: { picUrl?: string }
    }>
  }
}

export interface PlaylistApiResponse {
  result?: {
    tracks?: Array<{
      id: number
      name: string
      ar?: Array<{ name: string }>
      al?: { picUrl?: string }
    }>
  }
}
