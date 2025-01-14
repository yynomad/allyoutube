'use client'

import { ChevronUp, ChevronDown, Download, Smartphone, FileQuestion } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  icon: React.ReactNode
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: '怎么下载？',
    answer: '在新打开的页面上，点击右下角的三个小点，然后选择下载',
    icon: <Download className="w-5 h-5" />
  },
  {
    question: '为什么打不开下载链接？',
    answer: '下载链接需要更换干净的节点，有些节点可能被封锁了，更换节点后即可正常下载。',
    icon: <Download className="w-5 h-5" />
  },
  {
    question: '手机上可以用吗？',
    answer: '手机浏览器可以正常使用，打开手机浏览器访问地址，就可以正常下载，但是需要网络支持',
    icon: <Smartphone className="w-5 h-5" />
  },
  {
    question: 'iOS设备上点击下载视频按钮后没有直接下载怎么办？',
    answer: '因Safari及微信内置浏览器均不支持下载文件，所以保存视频需要借助第三方App来完成下载。可以使用这个工具：<a href="https://www.notion.so/iPhone-youtube-178f66ff04f880469d70e8e068824c5b" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">iPhone下载视频</a>',
    icon: <Smartphone className="w-5 h-5" />
  },
  {
    question: '下载的视频没声音？',
    answer: 'youtube把视频和音频分开保存的，可以下载分开下载然后合并，工具：<a href="https://pan.baidu.com/s/1No35h-CVphJtKUsLVHHqBA" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">剪映</a>，提取码9876',
    icon: <FileQuestion className="w-5 h-5" />
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-2">常见问题</h1>
      <p className="text-gray-500 text-center mb-8">
        找不到你想要的答案？
        <a href="https://t.me/+iCoexLc8fsg0Njdl" className="text-blue-500 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
          加入小飞机群
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

