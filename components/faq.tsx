'use client'

import { ChevronUp, ChevronDown, Download, Smartphone, FileQuestion } from 'lucide-react'
import { useState } from 'react'

interface FAQProps {
  dict: {
    faq: {
      title: string
      joinGroup: string
      items: {
        howToDownload: {
          question: string
          answer: string
        }
        cantOpen: {
          question: string
          answer: string
        }
        mobile: {
          question: string
          answer: string
        }
        ios: {
          question: string
          answer: string
        }
        noAudio: {
          question: string
          answer: string
        }
      }
    }
  }
}

export function FAQ({ dict }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const FAQ_ITEMS = [
    {
      question: dict.faq.items.howToDownload.question,
      answer: dict.faq.items.howToDownload.answer,
      icon: <Download className="w-5 h-5" />
    },
    {
      question: dict.faq.items.cantOpen.question,
      answer: dict.faq.items.cantOpen.answer,
      icon: <Download className="w-5 h-5" />
    },
    {
      question: dict.faq.items.mobile.question,
      answer: dict.faq.items.mobile.answer,
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      question: dict.faq.items.ios.question,
      answer: dict.faq.items.ios.answer,
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      question: dict.faq.items.noAudio.question,
      answer: dict.faq.items.noAudio.answer,
      icon: <FileQuestion className="w-5 h-5" />
    }
  ]

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-2">{dict.faq.title}</h1>
      <p className="text-gray-500 text-center mb-8">
        {dict.faq.joinGroup}
        <a href="https://t.me/+iCoexLc8fsg0Njdl" className="text-blue-500 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      </p>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => (
          <div 
            key={index}
            className="border rounded-lg"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-400">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.question}</span>
              </div>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <div 
                className="px-4 pb-4 text-sm text-gray-600 ml-12"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

