import { MessageCircle, MessageSquare, Wrench } from 'lucide-react'

interface FooterProps {
  dict: {
    footer: {
      contact: string
      email: string
      copyright: string
    }
  }
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t py-2">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-gray-500 flex justify-center items-center space-x-4">
          {dict.footer.contact} {dict.footer.email}
        </div>
        <div className="text-gray-500">{dict.footer.copyright}</div>
      </div>
    </footer>
  )
}

