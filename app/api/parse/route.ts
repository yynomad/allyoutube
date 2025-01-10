import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import os from 'os'

const execFileAsync = promisify(execFile)

// 获取 yt-dlp 可执行文件路径
const YT_DLP_PATH = path.join(process.cwd(), 'bin', os.platform() === 'win32' ? 'yt-dlp.exe' : 'yt-dlp')

// 速率限制器
interface RateLimit {
  count: number
  firstRequest: number
}

const rateLimits = new Map<string, RateLimit>()
const WINDOW_SIZE = 60 * 1000 // 1分钟窗口
const MAX_REQUESTS = 5 // 每个窗口最大请求数

function getRateLimitInfo(ip: string): RateLimit {
  const now = Date.now()
  let limit = rateLimits.get(ip)

  // 如果不存在或者已经超过窗口期，重置计数
  if (!limit || now - limit.firstRequest > WINDOW_SIZE) {
    limit = { count: 0, firstRequest: now }
    rateLimits.set(ip, limit)
  }

  return limit
}

// 清理过期的速率限制记录
setInterval(() => {
  const now = Date.now()
  Array.from(rateLimits.entries()).forEach(([ip, limit]) => {
    if (now - limit.firstRequest > WINDOW_SIZE) {
      rateLimits.delete(ip)
    }
  })
}, WINDOW_SIZE)

// 格式化观看次数
function formatViewCount(count: string): string {
  const num = parseInt(count)
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toLocaleString()
}

// 提取视频ID
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/(?:embed|v|shorts)\/([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

// 获取错误信息
function getErrorMessage(error: any): string {
  console.error('详细错误信息:', error)

  if (error.message?.includes('Video unavailable')) {
    return '该视频不可用，可能已被删除或设为私有'
  }

  if (error.message?.includes('Private video')) {
    return '这是一个私密视频，无法访问'
  }

  if (error.message?.includes('Sign in')) {
    return '这个视频需要登录才能观看'
  }

  return '视频解析失败，请稍后重试'
}

interface VideoFormat {
  url: string
  vcodec: string
  acodec: string
  filesize: number
  height?: number
  format_note?: string
}

interface VideoQualities {
  [quality: string]: VideoFormat
}

// 视频信息缓存
interface CacheEntry {
  data: any
  timestamp: number
}

const videoCache = new Map<string, CacheEntry>()
const CACHE_DURATION = 30 * 60 * 1000 // 缓存30分钟

// 清理过期的缓存和速率限制记录
setInterval(() => {
  const now = Date.now()
  
  // 清理过期的速率限制
  Array.from(rateLimits.entries()).forEach(([ip, limit]) => {
    if (now - limit.firstRequest > WINDOW_SIZE) {
      rateLimits.delete(ip)
    }
  })
  
  // 清理过期的视频缓存
  Array.from(videoCache.entries()).forEach(([videoId, entry]) => {
    if (now - entry.timestamp > CACHE_DURATION) {
      videoCache.delete(videoId)
    }
  })
}, 60 * 1000) // 每分钟清理一次

export async function POST(req: Request) {
  try {
    // 获取客户端 IP
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'
    
    // 检查速率限制
    const rateLimit = getRateLimitInfo(ip)
    if (rateLimit.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: '请求过于频繁，请稍后再试' },
        { status: 429 }
      )
    }
    rateLimit.count++

    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: '请提供视频 URL' },
        { status: 400 }
      )
    }

    // 尝试提取视频 ID
    const videoId = extractVideoId(url)

    if (!videoId) {
      return NextResponse.json(
        { error: '无法识别的 YouTube 视频链接，请确保链接格式正确' },
        { status: 400 }
      )
    }

    // 检查缓存
    const cachedData = videoCache.get(videoId)
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data)
    }

    // 构造标准 URL
    const standardUrl = `https://www.youtube.com/watch?v=${videoId}`

    try {
      // 使用 yt-dlp 获取视频信息
      const { stdout } = await execFileAsync('bash', [
        '-c',
        `proxychains ${YT_DLP_PATH} ${standardUrl} --dump-single-json --quiet --no-warnings --format "bv*[protocol^=http]+ba[protocol^=http]/b[protocol^=http]"`
      ])

      // 解析 JSON 输出
      const info = JSON.parse(stdout)

      // 处理格式列表
      const formats = info.formats
        .reduce((acc, format) => {
          // 只处理直接下载地址（rr 开头的 URL）
          const isDirectUrl = format.url?.includes('//rr');
          
          // 处理音频格式
          if (format.acodec !== 'none' && format.vcodec === 'none' && isDirectUrl) {
            acc.audioFormats.push({
              quality: format.format_note || 'Audio',
              url: format.url,
              ext: format.ext
            })
          }
          
          // 处理视频格式
          if (format.height && format.vcodec !== 'none' && isDirectUrl) {
            const quality = `${format.height}p`
            // 优先选择带音频的格式
            if (!acc.videoQualities[quality] || (!acc.videoQualities[quality].hasAudio && format.acodec !== 'none')) {
              acc.videoQualities[quality] = {
                url: format.url,
                hasAudio: format.acodec !== 'none',
                ext: format.ext,
                format_note: format.format_note || '',
                filesize: format.filesize || 0
              }
            }
          }
          
          return acc
        }, {
          audioFormats: [] as Array<{ quality: string; url: string; ext: string }>,
          videoQualities: {} as Record<string, { 
            url: string; 
            hasAudio: boolean; 
            ext: string; 
            format_note: string;
            filesize: number;
          }>
        })

      // 转换为数组格式并排序
      const sortedQualities = Object.entries(formats.videoQualities)
        .map(([quality, data]) => ({
          quality,
          url: (data as typeof formats.videoQualities[string]).url,
          hasAudio: (data as typeof formats.videoQualities[string]).hasAudio,
          ext: (data as typeof formats.videoQualities[string]).ext,
          format_note: (data as typeof formats.videoQualities[string]).format_note,
          filesize: (data as typeof formats.videoQualities[string]).filesize
        }))
        .sort((a, b) => {
          const getNumber = (q: string) => parseInt(q.replace('p', '')) || 0
          return getNumber(b.quality) - getNumber(a.quality)
        })

      // 选择最佳音频格式
      const bestAudio = formats.audioFormats
        .sort((a, b) => {
          // 优先选择 m4a 格式
          if (a.ext === 'm4a' && b.ext !== 'm4a') return -1
          if (b.ext === 'm4a' && a.ext !== 'm4a') return 1
          return 0
        })[0]

      // 选择最佳视频格式（带音频的最高质量）
      const bestVideo = sortedQualities.find(q => q.hasAudio) || sortedQualities[0]

      const response = {
        title: info.title,
        thumbnail: info.thumbnail,
        duration: info.duration,
        author: info.channel,
        uploadDate: new Date(info.upload_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        viewCount: formatViewCount(info.view_count.toString()),
        downloadUrls: {
          default: standardUrl,
          video: bestVideo?.url || info.url,
          audio: bestAudio?.url || info.url,
          thumbnail: info.thumbnail,
          qualities: sortedQualities.map(q => ({
            quality: q.quality,
            url: q.url,
            hasAudio: q.hasAudio,
            format_note: q.format_note,
            filesize: q.filesize
          })),
          audioFormats: formats.audioFormats
        }
      }

      // 存入缓存
      videoCache.set(videoId, {
        data: response,
        timestamp: Date.now()
      })

      return NextResponse.json(response)
    } catch (err) {
      return NextResponse.json(
        { error: getErrorMessage(err) },
        { status: 400 }
      )
    }
  } catch (err) {
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
} 