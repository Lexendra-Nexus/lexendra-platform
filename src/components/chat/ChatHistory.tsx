import { useState } from 'react'
import { useChatStore } from '../../store/chat.store.ts'
import { Bot, Search, Settings, HelpCircle, PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react'
import { ChatSessionItem } from './ChatSessionItem.tsx'

export function ChatHistory() {
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const { sessions, currentSessionId, setCurrentSession, createNewSession } = useChatStore()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Hoy'
    if (diffDays === 2) return 'Ayer'
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  const getPreview = (messages: any[]) => {
    if (messages.length === 0) return 'Sin mensajes'
    const lastMessage = messages[messages.length - 1]
    return lastMessage.content.slice(0, 60) + (lastMessage.content.length > 60 ? '...' : '')
  }

  const filteredSessions = sessions.filter(session =>
    session.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getPreview(session.messages).toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleNewChat = () => {
    createNewSession()
  }

  return (
    <div className={`bg-legal-bg border-r border-legal-border transition-all duration-300 flex flex-col h-full ${
      isOpen ? 'w-80' : 'w-20'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-legal-border">
        {isOpen ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg border border-legal-border bg-legal-surface flex items-center justify-center">
                <Bot className="w-4 h-4 text-legal-text" strokeWidth={2.2} />
              </div>
              <div>
              <h2 className="text-lg font-semibold text-legal-text font-lora">Lexentra</h2>
              <p className="text-xs text-legal-text">Asistente Legal</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar historial"
              className="p-1 hover:bg-legal-border rounded transition"
            >
              <PanelLeftClose className="w-5 h-5 text-legal-text" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir historial"
            className="w-full p-2 hover:bg-legal-border rounded transition"
          >
            <PanelLeftOpen className="w-5 h-5 text-legal-text" />
          </button>
        )}
      </div>

      {isOpen && (
        <>
          {/* New Chat Button */}
          <div className="p-4 border-b border-legal-border">
            <button
              onClick={handleNewChat}
              className="w-full bg-legal-surface border border-legal-border hover:bg-legal-surfaceLight text-legal-text py-2 px-4 rounded-md font-lora font-medium transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nuevo Chat
            </button>
          </div>

          {/* Search */}
          <div className="p-3 border-b border-legal-border">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-legal-text" />
              <input
                type="text"
                placeholder="Buscar chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-legal-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-legal-accent font-lora bg-legal-bgLight"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-legal-border">
              {filteredSessions.map(session => (
                <ChatSessionItem
                  key={session.id}
                  session={session}
                  currentSessionId={currentSessionId}
                  isMenuOpen={menuOpen === session.id}
                  onSelect={setCurrentSession}
                  onToggleMenu={(id) => setMenuOpen(menuOpen === id ? null : id)}
                  onCloseMenu={() => setMenuOpen(null)}
                  getPreview={getPreview}
                  formatDate={formatDate}
                />
              ))}
            </ul>
            {filteredSessions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-legal-text text-sm font-lora">No hay chats</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-legal-border p-3 space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-legal-text hover:bg-legal-border rounded transition flex items-center gap-2 font-lora">
              <Settings className="w-4 h-4" />
              Configuración
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-legal-text hover:bg-legal-border rounded transition flex items-center gap-2 font-lora">
              <HelpCircle className="w-4 h-4" />
              Ayuda
            </button>
          </div>
        </>
      )}
    </div>
  )
}
