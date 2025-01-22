'use client'

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ClipboardIcon, Loader2 } from 'lucide-react'
import { useState } from "react"
import { VideoResults } from "./video-results"

interface VideoInfo {
  title: string
  thumbnail: string
  duration: string
  author: string
  uploadDate?: string
  viewCount?: string
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

interface VideoFormProps {
  dict: {
    title: string
    description: string
    form: {
      placeholder: string
      button: string
      loading: string
      error: string
      invalidUrl: string
    }
  }
}

export function VideoForm({ dict }: VideoFormProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()    
    if (!url.trim()) {
      setError(dict.form.invalidUrl)
      return
    }

    setLoading(true)
    setError(null)
    setVideoInfo(null)
    
    try {
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || dict.form.error)
      }

      setVideoInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.form.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">{dict.title}</h1>
      <p className="text-gray-500 text-center mb-8">{dict.description}</p>
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder={dict.form.placeholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-10 text-base"
            style={{ 
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "0.2px"
            }}
            disabled={loading}
            spellCheck={false}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => navigator.clipboard.readText().then(text => setUrl(text))}
            disabled={loading}
          >
            <ClipboardIcon className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-32"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {dict.form.loading}
            </>
          ) : dict.form.button}
        </Button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-8 text-center text-gray-500">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>{dict.form.loading}</p>
        </div>
      )}

      {videoInfo && (
        <div className="mt-6">
          <VideoResults
            title={videoInfo.title}
            downloadUrls={videoInfo.downloadUrls}
          />
        </div>
      )}
    </form>
  )
}

