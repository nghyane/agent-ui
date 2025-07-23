import Icon from '@/components/ui/icon'
import MarkdownRenderer from '@/components/ui/typography/MarkdownRenderer'
import Paragraph from '@/components/ui/typography/Paragraph'
import { usePlaygroundStore } from '@/store'
import type { PlaygroundChatMessage } from '@/types/playground'
import Videos from './Multimedia/Videos'
import Images from './Multimedia/Images'
import Audios from './Multimedia/Audios'
import { memo } from 'react'
import AgentThinkingLoader from './AgentThinkingLoader'

interface MessageProps {
  message: PlaygroundChatMessage
}

const AgentMessage = ({ message }: MessageProps) => {
  const { streamingErrorMessage } = usePlaygroundStore()
  let messageContent
  if (message.streamingError) {
    messageContent = (
      <Paragraph size="sm" className="text-destructive">
        Oops! Something went wrong while streaming.{' '}
        {streamingErrorMessage ? (
          <>{streamingErrorMessage}</>
        ) : (
          'Please try refreshing the page or try again later.'
        )}
      </Paragraph>
    )
  } else if (message.content) {
    messageContent = (
      <div className="flex w-full flex-col gap-3">
        <div className="text-primary">
          <MarkdownRenderer>{message.content}</MarkdownRenderer>
        </div>
        {message.videos && message.videos.length > 0 && (
          <Videos videos={message.videos} />
        )}
        {message.images && message.images.length > 0 && (
          <Images images={message.images} />
        )}
        {message.audio && message.audio.length > 0 && (
          <Audios audio={message.audio} />
        )}
      </div>
    )
  } else if (message.response_audio) {
    if (!message.response_audio.transcript) {
      messageContent = (
        <div className="mt-2 flex items-start">
          <AgentThinkingLoader />
        </div>
      )
    } else {
      messageContent = (
        <div className="flex w-full flex-col gap-3">
          <div className="text-primary">
            <MarkdownRenderer>
              {message.response_audio.transcript}
            </MarkdownRenderer>
          </div>
          {message.response_audio.content && message.response_audio && (
            <Audios audio={[message.response_audio]} />
          )}
        </div>
      )
    }
  } else {
    messageContent = (
      <div className="mt-2">
        <AgentThinkingLoader />
      </div>
    )
  }

  return (
    <div className="group flex w-full items-start gap-3 font-inter">
      <div className="flex-shrink-0 mt-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand/15 to-brand/5">
          <Icon type="agent" size="xs" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-2">
          <span className="text-xs font-medium text-muted">Agent</span>
        </div>
        <div className="text-primary">
          {messageContent}
        </div>
      </div>
    </div>
  )
}

const UserMessage = memo(({ message }: MessageProps) => {
  return (
    <div className="group flex w-full items-start gap-3 font-inter">
      <div className="flex-shrink-0 mt-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/10">
          <Icon type="user" size="xs" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-2">
          <span className="text-xs font-medium text-muted">You</span>
        </div>
        <div className="text-primary">
          {message.content}
        </div>
      </div>
    </div>
  )
})

AgentMessage.displayName = 'AgentMessage'
UserMessage.displayName = 'UserMessage'
export { AgentMessage, UserMessage }
