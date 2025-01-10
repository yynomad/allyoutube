'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileImage, Music, AlertCircle, Link2 } from 'lucide-react'
import Link from 'next/link'

interface VideoResultsProps {
  title: string
  downloadUrls: {
    video: string
    audio: string
    thumbnail: string
    qualities: Array<{
      quality: string
      url: string
      hasAudio: boolean
    }>
  }
}

export function VideoResults({ title, downloadUrls }: VideoResultsProps) {
  return (
    <Card className="w-full bg-gray-50">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2 text-yellow-600">
          <p>
            如果下载失败，请点击
            <Link href="#" className="text-emerald-500 hover:underline">加入Telegram交流群</Link>
            {' '}或{' '}
            <Link href="#" className="text-blue-500 hover:underline">加入Discord交流群</Link>
            反馈，获取稳定的YouTube视频下载方案。
          </p>
        </div>

        <h2 className="text-xl font-semibold text-center">{title}</h2>

        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href={downloadUrls.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-[#2196f3] hover:bg-[#1976d2] min-w-[120px]"
          >
            <Download className="mr-2 h-4 w-4" />
            下载视频
          </a>
          <a 
            href={downloadUrls.thumbnail}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground min-w-[120px]"
          >
            <FileImage className="mr-2 h-4 w-4" />
            下载封面
          </a>
          <a 
            href={downloadUrls.audio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 min-w-[120px]"
          >
            <Music className="mr-2 h-4 w-4" />
            下载音频
          </a>
        </div>

        <div className="space-y-4">
          <h3 className="text-center text-gray-600">更多视频分辨率下载选项</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {downloadUrls.qualities.map((quality) => (
              <a
                key={quality.quality}
                href={quality.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-white hover:bg-accent hover:text-accent-foreground w-full"
              >
                {quality.quality} {quality.hasAudio && '🔊'}{!quality.hasAudio && '🔇'}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-center text-sm text-gray-500">
          <p>下载海外平台资源需要您的网络环境支持</p>
          <p>如点击下载按钮后没有直接下载，您可以尝试在下载按钮上右键选择链接另存为</p>
        </div>
      </div>
    </Card>
  )
}

