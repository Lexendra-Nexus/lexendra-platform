import { Settings, LogOut, Bot, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button.tsx'

export default function Header() {
  return (
    <header className="bg-legal-bgLight border-b border-legal-border p-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl border border-legal-border bg-legal-surface flex items-center justify-center shadow-sm">
          <Bot className="w-5 h-5 text-legal-text" strokeWidth={2.2} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-legal-text font-lora">Lexentra AI</h1>
          <p className="text-sm text-legal-text font-lora flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Asistente Legal Inteligente
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}