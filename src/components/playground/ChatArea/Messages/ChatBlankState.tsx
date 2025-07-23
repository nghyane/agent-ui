'use client'

import Icon from '@/components/ui/icon'
import Heading from '@/components/ui/typography/Heading'
import Paragraph from '@/components/ui/typography/Paragraph'
import useChatActions from '@/hooks/useChatActions'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { useState } from 'react'
import type { IconType } from '@/components/ui/icon/types'

const ChatBlankState = () => {
  const { focusChatInput } = useChatActions()
  const { handleStreamResponse } = useAIChatStreamHandler()
  const [selectedQuestion, setSelectedQuestion] = useState<string>('')

  const quickActions = [
    {
      icon: 'hammer' as IconType,
      text: 'Tư vấn chọn ngành học',
      question: 'Tôi muốn tìm hiểu về các ngành học phù hợp với sở thích và khả năng của mình. Bạn có thể tư vấn cho tôi không?'
    },
    {
      icon: 'send' as IconType,
      text: 'Quy trình tuyển sinh 2025',
      question: 'Cho tôi biết quy trình tuyển sinh đại học năm 2025 và các phương thức xét tuyển hiện tại.'
    },
    {
      icon: 'check' as IconType,
      text: 'Điểm chuẩn các năm trước',
      question: 'Tôi muốn xem điểm chuẩn các ngành của FPT trong những năm gần đây để tham khảo.'
    },
    {
      icon: 'download' as IconType,
      text: 'Học phí và học bổng',
      question: 'Thông tin về học phí các ngành và các chương trình học bổng của trường như thế nào?'
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
        <div className="text-center mb-12">
          <img 
            src="/logo.svg" 
            alt="FPT Logo" 
            width={120} 
            height={120}
            className="mx-auto mb-6"
          />
          
          <Heading size={2} className="text-gray-900 mb-4 !flex !justify-center">FPT Tuyển Sinh AI</Heading>
          <Paragraph size="sm" className="text-gray-600 max-w-lg mx-auto leading-relaxed">
            Chào mừng bạn đến với hệ thống tư vấn tuyển sinh thông minh. 
            Chọn một chủ đề bên dưới để bắt đầu.
          </Paragraph>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.question)}
              className="flex items-center gap-4 p-5 text-left hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer group border border-gray-100"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                <Icon type={action.icon} size="sm" className="text-gray-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
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
