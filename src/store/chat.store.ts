import { create } from 'zustand'
import type { ChatMessage, ChatSession } from '../types'

interface ChatStore {
  // State
  sessions: ChatSession[]
  currentSessionId: string | null
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null

  // Actions
  addMessage: (message: ChatMessage) => void
  updateLastMessage: (messageId: string, content: string) => void
  createNewSession: () => ChatSession
  setCurrentSession: (sessionId: string) => void
  deleteSession: (sessionId: string) => void
  clearSession: (sessionId: string) => void
  renameSession: (sessionId: string, title: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  currentSession: ChatSession | null
}

const STORAGE_KEY = 'lexendra-chat-storage'

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : { sessions: [], currentSessionId: null }
  } catch {
    return { sessions: [], currentSessionId: null }
  }
}

const saveToStorage = (data: { sessions: ChatSession[], currentSessionId: string | null }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

const getSessionMessages = (sessions: ChatSession[], sessionId: string | null) =>
  sessions.find((session) => session.id === sessionId)?.messages || []

const generateSessionTitle = (messages: ChatMessage[]): string => {
  if (messages.length === 0) return 'Nuevo Chat'
  const firstUserMessage = messages.find((m) => m.role === 'user')
  if (firstUserMessage) {
    return firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '')
  }
  return 'Nuevo Chat'
}

export const useChatStore = create<ChatStore>((set, get) => {
  const initialData = loadFromStorage()

  const defaultSessionId = initialData.currentSessionId || (initialData.sessions.length > 0 ? initialData.sessions[0].id : null)
  const defaultMessages = getSessionMessages(initialData.sessions, defaultSessionId)

  return {
    sessions: initialData.sessions,
    currentSessionId: defaultSessionId,
    messages: defaultMessages,
    isLoading: false,
    error: null,

    addMessage: (message) =>
      set((state) => {
        const activeSession = state.sessions.find((session) => session.id === state.currentSessionId)
        let sessions = state.sessions
        let currentSessionId = state.currentSessionId

        if (!activeSession) {
          const newSession: ChatSession = {
            id: `chat-${Date.now()}`,
            title: generateSessionTitle([message]),
            messages: [message],
            createdAt: new Date().toISOString(),
          }
          sessions = [newSession, ...state.sessions]
          currentSessionId = newSession.id
        } else {
          sessions = state.sessions.map((session) =>
            session.id === activeSession.id
              ? {
                  ...session,
                  messages: [...session.messages, message],
                  title: session.title || generateSessionTitle([...session.messages, message]),
                }
              : session
          )
        }

        const messages = getSessionMessages(sessions, currentSessionId)
        const newState = { sessions, currentSessionId, messages }
        saveToStorage({ sessions, currentSessionId })
        return newState
      }),

    updateLastMessage: (messageId, content) =>
      set((state) => {
        const sessions = state.sessions.map((session) => ({
          ...session,
          messages: session.messages.map((msg) =>
            msg.id === messageId ? { ...msg, content } : msg
          ),
        }))
        const messages = getSessionMessages(sessions, state.currentSessionId)
        saveToStorage({ sessions, currentSessionId: state.currentSessionId })
        return { sessions, messages }
      }),

    createNewSession: () => {
      const newSession: ChatSession = {
        id: `chat-${Date.now()}`,
        title: 'Nuevo Chat',
        messages: [],
        createdAt: new Date().toISOString(),
      }
      set((state) => {
        const sessions = [newSession, ...state.sessions]
        const newState = {
          sessions,
          currentSessionId: newSession.id,
          messages: newSession.messages,
        }
        saveToStorage(newState)
        return newState
      })
      return newSession
    },

    setCurrentSession: (sessionId) =>
      set((state) => {
        const messages = getSessionMessages(state.sessions, sessionId)
        const newState = { currentSessionId: sessionId, messages }
        saveToStorage({ sessions: state.sessions, currentSessionId: sessionId })
        return newState
      }),

    deleteSession: (sessionId) =>
      set((state) => {
        const sessions = state.sessions.filter((session) => session.id !== sessionId)
        const currentSessionId = state.currentSessionId === sessionId
          ? (sessions.length > 0 ? sessions[0].id : null)
          : state.currentSessionId
        const messages = getSessionMessages(sessions, currentSessionId)
        const newState = { sessions, currentSessionId, messages }
        saveToStorage(newState)
        return newState
      }),

    clearSession: (sessionId) =>
      set((state) => {
        const newSessions = state.sessions.map(session =>
          session.id === sessionId
            ? { ...session, messages: [] }
            : session
        )
        const newMessages = sessionId === state.currentSessionId ? [] : state.messages
        saveToStorage({ sessions: newSessions, currentSessionId: state.currentSessionId })
        return { sessions: newSessions, messages: newMessages }
      }),

    renameSession: (sessionId, title) =>
      set((state) => {
        const newSessions = state.sessions.map(session =>
          session.id === sessionId
            ? { ...session, title }
            : session
        )
        saveToStorage({ sessions: newSessions, currentSessionId: state.currentSessionId })
        return { sessions: newSessions, messages: state.messages }
      }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),

    get currentSession() {
      const state = get()
      return state.sessions.find(s => s.id === state.currentSessionId) || null
    },
  }
})