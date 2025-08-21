import type { Message } from '@entities/message'
import styles from '../styles/MessageList.module.css'

interface MessageListProps {
  messages: Message[]
}

export function MessageList(props: MessageListProps) {
  const { messages } = props
  return (
    <div className={styles.messageList} role="log" aria-live="polite">
      {messages.map((m) => (
        <div key={m.id} className={`${styles.message} ${m.sender === 'user' ? styles.messageUser : styles.messageBot}`}>
          <div className={styles.bubble}>
            <span>{m.text}</span>
          </div>
          <div className={styles.meta} aria-hidden>
            {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
    </div>
  )
}


