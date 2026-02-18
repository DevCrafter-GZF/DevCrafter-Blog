/**
 * 音乐 API 封装
 * 使用已验证可用的 heheda.top API
 */
import type { Song, SearchApiResponse, PlaylistApiResponse } from './types'

const HOT_SONGS_CHART_ID = 3778678

// API 基础配置 - 使用已验证可用的音乐 API
const API_BASE_URL = 'https://music-api.heheda.top'

/**
 * 搜索歌曲
 */
export async function searchSongs(keyword: string, limit: number = 10): Promise<Song[]> {
  if (!keyword.trim()) return []

  try {
    const response = await fetch(
      `${API_BASE_URL}/search?keywords=${encodeURIComponent(keyword)}&limit=${limit}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    )
    
    if (!response.ok) {
      console.error('搜索请求失败:', response.status)
      return []
    }
    
    const data: SearchApiResponse = await response.json()

    if (!data.result?.songs) return []

    // 返回歌曲列表，URL 需要单独获取
    return data.result.songs.map(song => ({
      id: song.id.toString(),
      name: song.name,
      artist: song.artists?.map(a => a.name).join('/') || '未知歌手',
      cover: song.album?.picUrl || '',
      url: '' // URL 需要单独获取
    }))
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
    const response = await fetch(`${API_BASE_URL}/playlist/detail?id=${chartId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) {
      console.error('获取热歌榜请求失败:', response.status)
      return []
    }
    
    const data: PlaylistApiResponse = await response.json()

    if (!data.result?.tracks) return []

    // 获取前20首，然后过滤掉无法播放的
    const candidates = data.result.tracks.slice(0, limit * 2)
    const songs: Song[] = []
    
    for (const song of candidates) {
      if (songs.length >= limit) break
      
      // 检查歌曲是否有播放资源
      const url = await getSongUrl(song.id.toString())
      if (url) {
        songs.push({
          id: song.id.toString(),
          name: song.name,
          artist: song.ar?.map(a => a.name).join('/') || '未知歌手',
          cover: song.al?.picUrl || '',
          url: url
        })
      }
    }
    
    return songs
  } catch (error) {
    console.error('获取热歌榜失败:', error)
    return []
  }
}

/**
 * 获取歌曲 URL
 * 使用 heheda.top API 获取真实播放地址
 */
export async function getSongUrl(songId: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/song/url?id=${songId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) {
      console.error('获取歌曲URL请求失败:', response.status)
      return ''
    }
    
    const data = await response.json()
    
    // 网易云音乐 API 返回格式: { data: [{ url: 'xxx', ... }] }
    if (data.data && data.data.length > 0) {
      return data.data[0].url || ''
    }
    
    return ''
  } catch (error) {
    console.error('获取歌曲URL失败:', error)
    return ''
  }
}
