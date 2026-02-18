/**
 * 音乐 API 封装
 */
import type { Song, SearchApiResponse, PlaylistApiResponse } from './types'

const HOT_SONGS_CHART_ID = 3778678

// API 基础配置 - 使用可用的音乐 API
const API_BASE_URL = 'https://api.wuenci.com/meting/api/'

/**
 * 搜索歌曲
 */
export async function searchSongs(keyword: string, limit: number = 10): Promise<Song[]> {
  if (!keyword.trim()) return []

  try {
    const response = await fetch(
      `${API_BASE_URL}?server=netease&type=search&id=${encodeURIComponent(keyword)}`
    )
    const data = await response.json()

    if (!Array.isArray(data)) return []

    return data.slice(0, limit).map((song: any) => ({
      id: song.id?.toString() || song.url || Math.random().toString(),
      name: song.name || '未知歌曲',
      artist: song.artist || song.author || '未知歌手',
      cover: song.cover || song.pic || '',
      url: song.url || ''
    })).filter(song => song.url)
  } catch (error) {
    console.error('搜索失败:', error)
    return []
  }
}

/**
 * 获取热歌榜
 */
export async function getHotSongs(chartId: number = HOT_SONGS_CHART_ID, limit: number = 10): Promise<Song[]> {
  try {
    // 使用热歌榜歌单 ID 获取歌曲
    const response = await fetch(`${API_BASE_URL}?server=netease&type=playlist&id=${chartId}`)
    const data = await response.json()

    if (!Array.isArray(data)) return []

    return data.slice(0, limit).map((song: any) => ({
      id: song.id?.toString() || song.url || Math.random().toString(),
      name: song.name || '未知歌曲',
      artist: song.artist || song.author || '未知歌手',
      cover: song.cover || song.pic || '',
      url: song.url || ''
    })).filter(song => song.url)
  } catch (error) {
    console.error('获取热歌榜失败:', error)
    return []
  }
}

/**
 * 获取歌曲 URL
 * 使用 Meting API 获取真实播放地址
 */
export async function getSongUrl(songId: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}?server=netease&type=url&id=${songId}`)
    const data = await response.json()
    if (Array.isArray(data) && data.length > 0) {
      return data[0].url || ''
    }
    return ''
  } catch (error) {
    console.error('获取歌曲URL失败:', error)
    return ''
  }
}
