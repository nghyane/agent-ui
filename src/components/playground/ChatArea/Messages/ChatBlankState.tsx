'use client'

import Icon from '@/components/ui/icon'
import Heading from '@/components/ui/typography/Heading'
import Paragraph from '@/components/ui/typography/Paragraph'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { useState } from 'react'
import type { IconType } from '@/components/ui/icon/types'

const ChatBlankState = () => {
  const { handleStreamResponse } = useAIChatStreamHandler()
  const [, setSelectedQuestion] = useState<string>('')

  const quickActions = [
    {
      icon: 'hammer' as IconType,
      text: 'Tư vấn chọn ngành học',
      question:
        'Tôi muốn tìm hiểu về các ngành học phù hợp với sở thích và khả năng của mình. Bạn có thể tư vấn cho tôi không?'
    },
    {
      icon: 'send' as IconType,
      text: 'Quy trình tuyển sinh 2025',
      question:
        'Cho tôi biết quy trình tuyển sinh đại học năm 2025 và các phương thức xét tuyển hiện tại.'
    },
    {
      icon: 'check' as IconType,
      text: 'Điểm chuẩn các năm trước',
      question:
        'Tôi muốn xem điểm chuẩn các ngành của FPT trong những năm gần đây để tham khảo.'
    },
    {
      icon: 'download' as IconType,
      text: 'Học phí và học bổng',
      question:
        'Thông tin về học phí các ngành và các chương trình học bổng của trường như thế nào?'
    }
  ]

  const handleQuickAction = async (question: string) => {
    setSelectedQuestion(question)
    try {
      await handleStreamResponse(question)
    } catch (error) {
      console.error('Error sending quick action:', error)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="FPT Logo"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />
          <Heading
            size={2}
            className="mb-4 !flex !justify-center text-gray-900"
          >
            FPT Tuyển Sinh AI
          </Heading>
          <Paragraph
            size="sm"
            className="mx-auto max-w-lg leading-relaxed text-gray-600"
          >
            Chào mừng bạn đến với hệ thống tư vấn tuyển sinh thông minh. Chọn
            một chủ đề bên dưới để bắt đầu.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.question)}
              className="group flex cursor-pointer items-center gap-4 rounded-xl border border-gray-100 p-5 text-left transition-all duration-200 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-gray-200">
                <Icon type={action.icon} size="sm" className="text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {action.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatBlankState
