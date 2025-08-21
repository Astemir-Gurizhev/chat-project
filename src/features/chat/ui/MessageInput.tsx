import { useState } from 'react'
import styles from '../styles/MessageInput.module.css'

interface MessageInputProps {
  onSend(text: string): Promise<void> | void
  isSending?: boolean
}

export function MessageInput(props: MessageInputProps) {
  const { onSend, isSending } = props
  const [text, setText] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    Promise.resolve(onSend(text)).then(() => setText(''))
  }

  return (
    <form className={styles.inputRow} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Напишите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSending}
        aria-label="Поле ввода сообщения"
      />
      <button type="submit" disabled={!text.trim() || !!isSending}>
        Отправить
      </button>
    </form>
  )
}


