import { ChatMenu } from './ChatMenu.tsx'
import { MoreVertical } from 'lucide-react'

interface ChatSessionItemProps {
  session: any
  currentSessionId: string | null
  isMenuOpen: boolean
  onSelect: (id: string) => void
  onToggleMenu: (id: string) => void
  onCloseMenu: () => void
  getPreview: (messages: any[]) => string
  formatDate: (dateString: string) => string
}

export function ChatSessionItem({
  session,
  currentSessionId,
  isMenuOpen,
  onSelect,
  onToggleMenu,
  onCloseMenu,
  getPreview,
  formatDate,
}: ChatSessionItemProps) {
  return (
    <li
      className={`relative p-3 hover:bg-legal-accent/5 cursor-pointer transition ${
        session.id === currentSessionId ? 'bg-legal-accent/10 border-r-2 border-legal-accent' : ''
      }`}
      onClick={() => onSelect(session.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-legal-text text-sm font-lora truncate">
            {session.title || 'Nuevo Chat'}
          </p>
          <p className="text-xs text-legal-text truncate mt-1">{getPreview(session.messages)}</p>
          <p className="text-xs text-legal-text mt-1">{formatDate(session.createdAt)}</p>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleMenu(session.id)
            }}
            aria-label="Abrir opciones de chat"
            className="p-1 hover:bg-legal-border rounded transition"
          >
            <MoreVertical className="w-4 h-4 text-legal-text" />
          </button>
          {isMenuOpen && (
            <ChatMenu
              sessionId={session.id}
              sessionTitle={session.title || 'Nuevo Chat'}
              onClose={onCloseMenu}
            />
          )}
        </div>
      </div>
    </li>
  )
}
