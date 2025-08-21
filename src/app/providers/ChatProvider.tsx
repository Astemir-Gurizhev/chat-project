import { ChatProvider as FeatureChatProvider } from '@features/chat'
import { EchoChatService } from '@features/chat/api/ChatService'
import { defaultIdGenerator, systemClock } from '@shared'

const chatService = new EchoChatService({ delayMs: 1500, idGenerator: defaultIdGenerator, clock: systemClock })

export function ChatProvider(props: React.PropsWithChildren) {
  const { children } = props
  return (
    <FeatureChatProvider service={chatService} idGenerator={defaultIdGenerator} clock={systemClock}>
      {children}
    </FeatureChatProvider>
  )
}


