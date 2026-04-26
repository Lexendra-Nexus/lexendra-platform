import { useChatStore } from '../../store/chat.store.ts'
import { MarkdownRenderer } from '../../utils/markdown.tsx'
import { useEffect, useRef } from 'react'
import { Bot, User, Paperclip } from 'lucide-react'

export function ChatMessages() {
  const { messages } = useChatStore()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-legal-bg">
      {messages.length === 0 && (
        <div className="text-center mt-20 p-8">
          <div className="inline-flex items-center justify-center mb-4 p-4 rounded-2xl bg-legal-surface border border-legal-border shadow-sm">
            <Bot className="w-11 h-11 text-legal-text" strokeWidth={2.2} />
          </div>
          <h3 className="text-xl font-semibold text-legal-text mb-2 font-lora">Bienvenido a Lexentra</h3>
          <p className="text-legal-text font-lora">Soy tu asistente legal inteligente. ¿En qué puedo ayudarte hoy?</p>
        </div>
      )}

      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex gap-3 max-w-2xl ${
            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          }`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border border-legal-border shadow-sm ${
              msg.role === 'user' 
                ? 'bg-legal-surface' 
                : 'bg-legal-surface'
            }`}>
              {msg.role === 'user' ? (
                <User className="w-5 h-5 text-legal-text" strokeWidth={2.1} />
              ) : (
                <Bot className="w-5 h-5 text-legal-text" strokeWidth={2.1} />
              )}
            </div>

            {/* Message Content */}
            <div className={`${
              msg.role === 'user'
                ? 'bg-legal-surface text-legal-text rounded-lg rounded-tr-none border border-legal-border'
                : 'bg-legal-bgLight text-legal-text rounded-lg rounded-tl-none shadow-sm border border-legal-border'
            } p-4`}>
              <p className="text-[11px] tracking-wide font-semibold text-legal-text mb-2 font-lora uppercase">{
                msg.role === 'user' ? 'Tú' : 'Lexentra AI'
              }</p>
              <div className={msg.role === 'assistant' ? 'prose prose-sm max-w-none' : ''}>
                {msg.role === 'assistant' ? (
                  <MarkdownRenderer content={msg.content} />
                ) : (
                  <p className="leading-relaxed font-lora">{msg.content}</p>
                )}
              </div>

              {/* Attachments Display */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-4 pt-1 space-y-2">
                  {msg.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-2">
                      {attachment.url && attachment.type.startsWith('image/') ? (
                        <img src={attachment.url} alt={attachment.name} className="h-24 w-24 object-cover rounded" />
                      ) : (
                        <div className="flex items-center gap-2 bg-legal-surface border border-legal-border px-3 py-2 rounded max-w-xs">
                          <Paperclip className="w-4 h-4 text-legal-text flex-shrink-0" />
                          <span className="text-xs truncate font-lora text-legal-text">{attachment.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div ref={endRef} />
    </div>
  )
}