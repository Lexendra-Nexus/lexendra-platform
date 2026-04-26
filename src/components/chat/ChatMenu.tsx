import { useEffect, useState } from 'react'
import { Trash2, PencilLine, MessageSquare, Eraser, X } from 'lucide-react'
import { useChatStore } from '../../store/chat.store.ts'

interface ChatMenuProps {
  sessionId: string
  sessionTitle: string
  onClose: () => void
}

export function ChatMenu({ sessionId, sessionTitle, onClose }: ChatMenuProps) {
  const { deleteSession, clearSession, renameSession } = useChatStore()
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(sessionTitle)

  const handleDelete = () => {
    deleteSession(sessionId)
    setIsDeleteModalOpen(false)
    onClose()
  }

  const handleClear = () => {
    clearSession(sessionId)
    onClose()
  }

  const handleRename = () => {
    const sanitizedTitle = newTitle.trim()
    if (sanitizedTitle) renameSession(sessionId, sanitizedTitle)
    setIsRenameModalOpen(false)
    onClose()
  }

  useEffect(() => {
    setNewTitle(sessionTitle)
  }, [sessionTitle])

  const closeRenameModal = () => {
    setNewTitle(sessionTitle)
    setIsRenameModalOpen(false)
  }

  return (
    <>
      <div className="absolute right-2 top-8 bg-legal-bgLight border border-legal-border rounded-xl shadow-lg py-1 z-10 min-w-56">
        <button
          type="button"
          onClick={() => setIsRenameModalOpen(true)}
          className="w-full px-3 py-2.5 text-left hover:bg-legal-surface flex items-center gap-2 text-legal-text text-sm"
        >
          <PencilLine className="w-4 h-4" />
          Renombrar chat
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-full px-3 py-2.5 text-left hover:bg-legal-surface flex items-center gap-2 text-legal-text text-sm"
        >
          <Eraser className="w-4 h-4" />
          Limpiar conversación
        </button>
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full px-3 py-2.5 text-left hover:bg-legal-surface flex items-center gap-2 text-legal-error text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar chat
        </button>
      </div>

      {isRenameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-legal-border bg-legal-bgLight shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-legal-border">
              <h3 className="text-base font-semibold text-legal-text">Renombrar chat</h3>
              <button
                type="button"
                onClick={closeRenameModal}
                className="p-1 rounded-md hover:bg-legal-surface text-legal-text"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              <label className="text-sm text-legal-text block">Nuevo nombre</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newTitle.trim()) {
                    handleRename()
                  }
                }}
                autoFocus
                className="w-full px-3 py-2 border border-legal-border rounded-lg bg-legal-surface text-legal-text focus:outline-none focus:ring-2 focus:ring-legal-accent"
              />
            </div>
            <div className="px-5 py-4 border-t border-legal-border flex justify-end gap-2">
              <button
                type="button"
                onClick={closeRenameModal}
                className="px-4 py-2 rounded-lg border border-legal-border text-legal-text hover:bg-legal-surface"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleRename}
                disabled={!newTitle.trim()}
                className="px-4 py-2 rounded-lg bg-legal-primary text-legal-light hover:bg-legal-accentLight disabled:opacity-50"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-legal-border bg-legal-bgLight shadow-2xl">
            <div className="px-5 py-4 border-b border-legal-border">
              <h3 className="text-base font-semibold text-legal-text flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Eliminar chat
              </h3>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-legal-text">
                Esta acción eliminará el chat <span className="font-semibold">"{sessionTitle}"</span> y no se puede deshacer.
              </p>
            </div>
            <div className="px-5 py-4 border-t border-legal-border flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-legal-border text-legal-text hover:bg-legal-surface"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-legal-error text-legal-light hover:opacity-90"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
