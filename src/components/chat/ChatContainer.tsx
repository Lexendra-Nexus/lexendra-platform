import { ChatMessages } from './ChatMessages.tsx'
import { ChatInput } from './ChatInput.tsx'
import { useStreamingChat } from '../../hooks/useChat.ts'
import { useChatStore } from '../../store/chat.store.ts'

export function ChatContainer() {
  const { addMessage, updateLastMessage, isLoading, messages, currentSessionId, createNewSession, setCurrentSession } = useChatStore()
  const { sendStreamingMessage } = useStreamingChat()

  const handleSend = async (message: string, file?: File) => {
    let activeSessionId = currentSessionId
    if (!activeSessionId) {
      const newSession = createNewSession()
      activeSessionId = newSession.id
      setCurrentSession(activeSessionId)
    }

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message || (file ? `Archivo adjunto: ${file.name}` : ''),
      timestamp: new Date().toISOString(),
      attachments: file
        ? [
            {
              id: `${Date.now()}-${file.name}`,
              name: file.name,
              type: file.type,
              size: file.size,
              url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
            },
          ]
        : undefined,
    }

    addMessage(userMessage)

    try {
      if (file) {
        // Para archivos, usar streaming multimodal
        const formData = new FormData()
        formData.append('message', message)
        formData.append('history', JSON.stringify(messages.map((msg) => ({ role: msg.role, content: msg.content }))))
        formData.append('chatId', activeSessionId || 'default')
        formData.append('file', file)

        // Usar streaming multimodal
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/chat/query-multimodal/stream`,
          {
            method: 'POST',
            body: formData,
          }
        )

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        // Crear mensaje de asistente vacío para streaming
        const assistantMessageId = (Date.now() + 1).toString()
        const assistantMessage = {
          id: assistantMessageId,
          role: 'assistant' as const,
          content: '',
          timestamp: new Date().toISOString(),
        }
        addMessage(assistantMessage)

        let fullResponse = ''

        while (true) {
          const { done, value } = await reader!.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '')
              try {
                const data = JSON.parse(dataStr)
                if (data.chunk) {
                  fullResponse += data.chunk
                  // Actualizar el mensaje en tiempo real
                  updateLastMessage(assistantMessageId, fullResponse)
                } else if (data.done) {
                  // Streaming completado
                  break
                } else if (data.error) {
                  console.error('Error en streaming:', data.error)
                  updateLastMessage(assistantMessageId, `Error: ${data.error}`)
                }
              } catch (e) {
                // Si no es JSON válido, asumir que es texto plano
                fullResponse += dataStr
                updateLastMessage(assistantMessageId, fullResponse)
              }
            }
          }
        }
      } else {
        // Para texto, usar streaming normal
        // Crear mensaje de asistente vacío para streaming
        const assistantMessageId = (Date.now() + 1).toString()
        const assistantMessage = {
          id: assistantMessageId,
          role: 'assistant' as const,
          content: '',
          timestamp: new Date().toISOString(),
        }
        addMessage(assistantMessage)

        await sendStreamingMessage({
          question: message,
          chatId: activeSessionId || 'default',
          userId: 'user',
        }, assistantMessageId)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Agregar mensaje de error
      addMessage({
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Lo siento, ocurrió un error. Por favor, intenta de nuevo.',
        timestamp: new Date().toISOString(),
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ChatMessages />
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  )
}