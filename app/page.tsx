import { VideoForm } from '@/components/video-form'
import { FAQ } from '@/components/faq'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YouTube 视频下载器 - 免费在线下载 YouTube 视频',
  description: '免费在线下载 YouTube 视频，支持多种分辨率和格式，无需安装软件，直接在线下载。',
  keywords: 'YouTube下载, YouTube视频下载, 在线下载, 视频下载器, YouTube视频解析',
  openGraph: {
    title: 'YouTube 视频下载器 - 免费在线下载 YouTube 视频',
    description: '免费在线下载 YouTube 视频，支持多种分辨率和格式，无需安装软件，直接在线下载。',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="space-y-8 px-4 sm:px-8 lg:px-16">
      <section className="prose max-w-none">
        <h1 className="text-green-800 text-center text-3xl font-bold mb-4">专业的YouTube 视频和字幕下载</h1>
        <div className="text-center text-gray-600 space-y-2">
          <div>免费在线下载 YouTube 视频，支持多种分辨率和格式</div>
          <div>在YouTube网站上，找到想要下载的视频，复制视频页面链接，粘贴到输入框里，点击解析视频按钮，选择需要的视频清晰度和格式，点击下载即可</div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full">
        <VideoForm />
      </div>

      <div className="max-w-6xl mx-auto">
        <FAQ />
      </div>
    </div>
  )
}

