import { ChatWidget } from '@widgets/chat'
import { ChatProvider, EchoChatService } from '@features/chat'
import { defaultIdGenerator, systemClock } from '@shared'

export default function ChatPage() {
	const fastService = new EchoChatService({ delayMs: 1500, idGenerator: defaultIdGenerator, clock: systemClock })
	const slowService = new EchoChatService({ delayMs: 5000, idGenerator: defaultIdGenerator, clock: systemClock })

	return (
		<>
			<ChatProvider service={fastService} idGenerator={defaultIdGenerator} clock={systemClock}>
				<ChatWidget />
			</ChatProvider>
			<ChatProvider service={slowService} idGenerator={defaultIdGenerator} clock={systemClock}>
				<ChatWidget />
			</ChatProvider>
		</>
	)
}


