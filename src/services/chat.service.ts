import { apiClient } from './api.ts'
import { API_ENDPOINTS } from '../constants/api.ts'
import type { QueryRequest, QueryResponse, ChatSession } from '../types'

// Enviar mensaje de chat (request/response normal)
export async function chatQuery(request: QueryRequest): Promise<QueryResponse> {
  const response = await apiClient.post(API_ENDPOINTS.CHAT_QUERY, request)
  return response.data
}

export async function chatQueryMultimodal(request: FormData): Promise<QueryResponse> {
  const response = await apiClient.post(API_ENDPOINTS.CHAT_QUERY_MULTIMODAL, request, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

// Streaming de chat (SSE)
export async function chatStream(
  request: QueryRequest,
  onChunk: (chunk: string) => void
): Promise<void> {
  const response = await fetch(
    `${apiClient.defaults.baseURL}${API_ENDPOINTS.CHAT_STREAM}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    }
  )

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader!.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.replace('data: ', '')
        onChunk(data)
      }
    }
  }
}

// Obtener sesión de chat
export async function getChatSession(chatId: string): Promise<ChatSession> {
  const response = await apiClient.get(`${API_ENDPOINTS.CHAT_GET}/${chatId}`)
  return response.data
}

// Limpiar sesión de chat
export async function clearChat(chatId: string): Promise<void> {
  await apiClient.delete(`${API_ENDPOINTS.CHAT_DELETE}/${chatId}`)
}