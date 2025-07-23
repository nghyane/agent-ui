'use client'

import ChatInput from './ChatInput'
import MessageArea from './MessageArea'

const ChatArea = () => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-background font-inter">
      <div className="flex flex-1 flex-col overflow-hidden">
        <MessageArea />
      </div>
      <div className="bg-background/95 px-6 py-4 backdrop-blur-sm">
        <ChatInput />
      </div>
    </div>
  )
}

export default ChatArea
