import styles from './styles/App.module.css'
import { ChatPage } from '@pages/chat'

export default function App() {
  return (
    <div className={styles.appShell}>
      <ChatPage />
    </div>
  )
}


