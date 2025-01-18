import { VideoForm } from '@/components/video-form'
import { FAQ } from '@/components/faq'

async function getDictionary(locale: string) {
  return (await import(`../i18n/dictionaries/${locale}.json`)).default
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(lang)

  return (
    <div className="space-y-8">
      <VideoForm dict={dict} />
      <FAQ dict={dict} />
    </div>
  )
} 