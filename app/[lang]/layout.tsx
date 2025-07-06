import { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Script from 'next/script'
import { i18n } from '../i18n/settings'
import { LanguageSwitcher } from '@/components/language-switcher'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

async function getDictionary(locale: string) {
  return (await import(`../i18n/dictionaries/${locale}.json`)).default
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: dict.title,
    description: dict.description,
    keywords: 'YouTube下载, YouTube视频下载, 在线下载, 视频下载器, YouTube视频解析',
    openGraph: {
      title: dict.title,
      description: dict.description,
      type: 'website',
    },
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0M1Z67P4D9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0M1Z67P4D9');
        `}
      </Script>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6713468388362324" crossOrigin="anonymous" />
      <link rel="icon" href="/favicon.ico" />
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <LanguageSwitcher lang={params.lang} />
          <Header dict={dict} lang={params.lang} />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
          <Footer dict={dict} />
        </div>
      </body>
    </html>
  )
} 