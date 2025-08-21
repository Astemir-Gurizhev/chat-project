import type { Message } from '@entities/message'
import type { IdGenerator, Clock } from '@shared'

export interface ChatService {
  sendAndReceive(userText: string): Promise<Message>
}

export class EchoChatService implements ChatService {
  private readonly delayMs: number
  private readonly idGenerator: IdGenerator
  private readonly clock: Clock

  constructor(options: { delayMs: number; idGenerator: IdGenerator; clock: Clock }) {
    this.delayMs = options.delayMs
    this.idGenerator = options.idGenerator
    this.clock = options.clock
  }

  async sendAndReceive(userText: string): Promise<Message> {
    await new Promise((resolve) => setTimeout(resolve, this.delayMs))
    return {
      id: this.idGenerator.generateId(),
      text: userText,
      sender: 'bot',
      timestamp: this.clock.now(),
    }
  }
}


