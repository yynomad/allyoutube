'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Languages } from 'lucide-react'

interface LanguageSwitcherProps {
  lang: string
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'zh' : 'en'
    const newPathname = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPathname)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50"
      title={lang === 'en' ? '切换到中文' : 'Switch to English'}
    >
      <Languages className="h-5 w-5" />
    </Button>
  )
} 