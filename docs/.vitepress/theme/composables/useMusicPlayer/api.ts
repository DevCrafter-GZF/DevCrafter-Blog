/**
 * 音乐 API 封装
 */
import type { Song, SearchApiResponse, PlaylistApiResponse } from './types'

const HOT_SONGS_CHART_ID = 3778678

// API 基础配置
const API_BASE_URL = 'https://music-api.heheda.top'

/**
 * 搜索歌曲
 */
export async function searchSongs(keyword: string, limit: number = 10): Promise<Song[]> {
  if (!keyword.trim()) return []

  const response = await fetch(
    `${API_BASE_URL}/search?keywords=${encodeURIComponent(keyword)}&limit=${limit}`
  )
  const data: SearchApiResponse = await response.json()

  if (!data.result?.songs) return []

  return data.result.songs.map(song => ({
    id: song.id.toString(),
    name: song.name,
    artist: song.artists?.map(a => a.name).join('/') || '未知歌手',
    cover: song.album?.picUrl || '',
    url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
  }))
}

/**
 * 获取热歌榜
 */
export async function getHotSongs(chartId: number = HOT_SONGS_CHART_ID, limit: number = 10): Promise<Song[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/playlist/detail?id=${chartId}`)
    const data: PlaylistApiResponse = await response.json()

    if (!data.result?.tracks) return []

    return data.result.tracks.slice(0, limit).map(song => ({
      id: song.id.toString(),
      name: song.name,
      artist: song.ar?.map(a => a.name).join('/') || '未知歌手',
      cover: song.al?.picUrl || '',
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    }))
  } catch (error) {
    console.error('获取热歌榜失败:', error)
    return []
  }
}

/**
 * 获取歌曲 URL
 */
export function getSongUrl(songId: string): string {
  return `https://music.163.com/song/media/outer/url?id=${songId}.mp3`
}
