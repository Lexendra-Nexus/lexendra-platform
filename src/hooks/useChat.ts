import * as chatService from '../services/chat.service.ts'
import { useChatStore } from '../store/chat.store.ts'
import type { QueryRequest } from '../types'

// Hook para chat con streaming
export function useStreamingChat() {
  const { setLoading, setError, updateLastMessage } = useChatStore()

  const sendStreamingMessage = async (request: QueryRequest, assistantMessageId: string) => {
    setLoading(true)
    setError(null)

    try {
      let fullResponse = ''

      await chatService.chatStream(request, (chunk) => {
        try {
          const data = JSON.parse(chunk)
          if (data.chunk) {
            fullResponse += data.chunk
            updateLastMessage(assistantMessageId, fullResponse)
          } else if (data.done) {
            setLoading(false)
          } else if (data.error) {
            setError(data.error)
            setLoading(false)
          }
        } catch (e) {
          // Si no es JSON válido, asumir que es texto plano
          fullResponse += chunk
          updateLastMessage(assistantMessageId, fullResponse)
        }
      })
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return {
    sendStreamingMessage,
  }
}