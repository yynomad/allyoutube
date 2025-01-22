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
        <h2 className="text-xl font-semibold text-center">{title}</h2>

        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href={downloadUrls.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-blue-500 hover:bg-blue-600 text-white min-w-[120px]"
          >
            <Download className="mr-2 h-4 w-4" />
            下载视频
          </a>
          <a 
            href={downloadUrls.thumbnail}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-blue-500 hover:bg-blue-600 text-white min-w-[120px]"
          >
            <FileImage className="mr-2 h-4 w-4" />
            下载封面
          </a>
          <a 
            href={downloadUrls.audio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-blue-500 hover:bg-blue-600 text-white min-w-[120px]"
          >
            <Music className="mr-2 h-4 w-4" />
            下载音频
          </a>
        </div>

        <div className="space-y-4">
          <h3 className="text-center text-gray-600">其他视频分辨率，需要下载视频和音频合并，工具见下边常见问题</h3>
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
      </div>
    </Card>
  )
}

