import { create } from 'zustand'
import type { Document } from '../types'

interface UIStore {
  // State
  isSidebarOpen: boolean
  selectedDocument: Document | null
  theme: 'dark' | 'light'
  isAnalyzing: boolean

  // Actions
  toggleSidebar: () => void
  setSelectedDocument: (doc: Document | null) => void
  setTheme: (theme: 'dark' | 'light') => void
  setAnalyzing: (analyzing: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  selectedDocument: null,
  theme: 'dark',
  isAnalyzing: false,

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  setSelectedDocument: (doc) => set({ selectedDocument: doc }),

  setTheme: (theme) => set({ theme }),

  setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
}))