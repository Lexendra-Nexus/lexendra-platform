// Tipos de Chat
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  attachments?: Attachment[]
}

export interface ChatSession {
  id: string
  title?: string
  messages: ChatMessage[]
  createdAt: string
}

export interface QueryRequest {
  question: string
  chatId?: string
  userId?: string
}

export interface QueryResponse {
  answer: string
  context?: string[]
  sources?: string[]
}

// Tipos de Documentos
export interface Document {
  id: string
  filename: string
  size: number
  uploadedAt: string
  status: 'pending' | 'processing' | 'processed'
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url?: string
}