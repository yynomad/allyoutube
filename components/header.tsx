import Link from 'next/link'

interface HeaderProps {
  dict: {
    nav: {
      home: string
    }
  }
  lang: string
}

export function Header({ dict, lang }: HeaderProps) {
  return (
    <header className="bg-blue-500 text-white">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-14">
          <Link
            href={`/${lang}`}
            className="text-lg font-medium hover:text-gray-200 transition-colors"
          >
            {dict.nav.home}
          </Link>
        </div>
      </nav>
    </header>
  )
}

