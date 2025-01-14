import Link from 'next/link'
import { Download } from 'lucide-react'

const NAV_ITEMS = [
  { name: 'allyoutube.site  下载youtube视频', href: '/' },
]

export function Header() {
  return (
    <header className="bg-blue-500 text-white">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-14">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium hover:text-gray-200 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

