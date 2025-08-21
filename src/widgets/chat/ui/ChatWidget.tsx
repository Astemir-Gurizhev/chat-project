import { useEffect, useRef } from 'react'
import { useChat, MessageList, MessageInput } from '@features/chat'
import styles from '../styles/ChatWidget.module.css'

export function ChatWidget() {
	const { messages, sendMessage, isSending, error } = useChat()
	const scrollerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const el = scrollerRef.current
		if (el) el.scrollTop = el.scrollHeight
	}, [messages])

	return (
		<div className={styles.chatWindow}>
			<div className={styles.chatHeader}>Чат</div>
			<div className={styles.chatBody} ref={scrollerRef}>
				<MessageList messages={messages} />
			</div>
			<div className={styles.chatFooter}>
				<MessageInput onSend={sendMessage} isSending={isSending} />
				{error && <div className={styles.errorMessage}>{error}</div>}
			</div>
		</div>
	)
}


