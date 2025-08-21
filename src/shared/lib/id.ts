export interface IdGenerator {
  generateId(): string
}

export const defaultIdGenerator: IdGenerator = {
  generateId: () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
}


