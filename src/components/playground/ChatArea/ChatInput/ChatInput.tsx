'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { TextArea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { usePlaygroundStore } from '@/store'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'

const ChatInput = () => {
  const { chatInputRef } = usePlaygroundStore()

  const { handleStreamResponse } = useAIChatStreamHandler()
  const [selectedAgent] = useQueryState('agent')
  const [inputMessage, setInputMessage] = useState('')
  const isStreaming = usePlaygroundStore((state) => state.isStreaming)
  const handleSubmit = async () => {
    if (!inputMessage.trim()) return

    const currentMessage = inputMessage
    setInputMessage('')

    try {
      await handleStreamResponse(currentMessage)
    } catch (error) {
      toast.error(
        `Error in handleSubmit: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  return (
    <div className="relative mx-auto flex w-full max-w-4xl items-center justify-center px-4">
      <div className="relative flex w-full items-center">
        <TextArea
          placeholder={'Type your message...'}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.nativeEvent.isComposing &&
              !e.shiftKey &&
              !isStreaming
            ) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          className="min-h-[60px] w-full resize-none rounded-2xl border border-gray-200 bg-gray-50/80 px-6 py-4 pr-16 text-base text-gray-900 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
          style={{ outline: 'none', boxShadow: 'none' }}
          disabled={!selectedAgent}
          ref={chatInputRef}
        />

        {/* Right side send button */}
        <div className="absolute right-3">
          <Button
            onClick={handleSubmit}
            disabled={!selectedAgent || !inputMessage.trim() || isStreaming}
            size="sm"
            className="h-10 w-10 rounded-xl border-0 bg-gray-800 p-0 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isStreaming ? (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primaryAccent border-t-transparent" />
              </div>
            ) : (
              <Icon type="send" color="white" size="sm" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
