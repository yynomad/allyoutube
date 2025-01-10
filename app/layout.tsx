import { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <div className="container py-8">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

