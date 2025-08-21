import styles from './styles/App.module.css'
import { ChatProvider } from '@app/providers/ChatProvider'
import { ChatPage } from '@pages/chat'

export default function App() {
  return (
    <div className={styles.appShell}>
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    </div>
  )
}


