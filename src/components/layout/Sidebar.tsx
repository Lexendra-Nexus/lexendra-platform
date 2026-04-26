import { MessageSquare, Scale, Menu, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUIStore } from '../../store/ui.store.ts'
import { Button } from '../ui/Button.tsx'

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore()

  const links = [
    { to: '/chat', icon: MessageSquare, label: 'Chat' },
    { to: '/analysis', icon: Scale, label: 'Análisis' },
  ]

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Abrir menú lateral"
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-legal-surface border border-legal-border rounded-lg text-legal-text hover:bg-legal-surfaceLight transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isSidebarOpen && (
        <aside className="w-64 bg-legal-bgLight border-r border-legal-border p-4 hidden md:block shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl border border-legal-border bg-legal-surface flex items-center justify-center shadow-sm">
              <Bot className="w-6 h-6 text-legal-text" strokeWidth={2.2} />
            </div>
            <h1 className="text-2xl font-bold text-legal-text font-lora">Lexentra</h1>
          </div>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button variant="secondary" className="w-full justify-start">
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
      )}
    </>
  )
}