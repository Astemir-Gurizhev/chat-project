import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import type { Message } from '@entities/message'
import type { IdGenerator, Clock } from '@shared'
import type { ChatService } from '../api/ChatService'

interface ChatState {
  messages: Message[]
  isSending: boolean
  error: string | null
}

type ChatAction =
  | { type: 'user_message_sent'; message: Message }
  | { type: 'bot_message_received'; message: Message }
  | { type: 'sending_started' }
  | { type: 'sending_finished' }
  | { type: 'error_set'; error: string | null }

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'sending_started':
      return { ...state, isSending: true, error: null }
    case 'sending_finished':
      return { ...state, isSending: false }
    case 'user_message_sent':
      return { ...state, messages: [...state.messages, action.message] }
    case 'bot_message_received':
      return { ...state, messages: [...state.messages, action.message] }
    case 'error_set':
      return { ...state, error: action.error }
    default:
      return state
  }
}

interface ChatController {
  sendMessage(text: string): Promise<void>
}

interface ChatDependencies {
  service: ChatService
  idGenerator: IdGenerator
  clock: Clock
}

interface ChatContextValue extends ChatState, ChatController {}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider(props: React.PropsWithChildren<ChatDependencies>) {
  const { children, service, idGenerator, clock } = props
  const [state, dispatch] = useReducer(chatReducer, { messages: [], isSending: false, error: null })

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const userMessage: Message = {
        id: idGenerator.generateId(),
        text: trimmed,
        sender: 'user',
        timestamp: clock.now(),
      }

      dispatch({ type: 'sending_started' })
      dispatch({ type: 'user_message_sent', message: userMessage })
      try {
        const botMessage = await service.sendAndReceive(trimmed)
        dispatch({ type: 'bot_message_received', message: botMessage })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
        dispatch({ type: 'error_set', error: message })
      } finally {
        dispatch({ type: 'sending_finished' })
      }
    },
    [service, idGenerator, clock],
  )

  const value = useMemo<ChatContextValue>(
    () => ({ ...state, sendMessage }),
    [state, sendMessage],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}


