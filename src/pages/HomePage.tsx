import { Link } from 'react-router-dom'
import { MessageSquare, Scale } from 'lucide-react'
import { Button } from '../components/ui/Button.tsx'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-legal-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-legal-text mb-4 font-lora">Lexentra AI</h1>
          <p className="text-xl text-legal-text font-lora">Tu asistente legal inteligente</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Chat */}
          <Link to="/chat">
            <div className="bg-legal-bgLight border border-legal-border p-6 rounded-lg hover:border-legal-primary transition-all hover:shadow-lg">
              <MessageSquare className="w-8 h-8 text-legal-text mb-4" />
              <h2 className="text-xl font-bold text-legal-text mb-2 font-lora">Chat Legal</h2>
              <p className="text-legal-text font-lora">Consulta con IA especializada en derecho</p>
            </div>
          </Link>

          {/* Análisis */}
          <Link to="/analysis">
            <div className="bg-legal-bgLight border border-legal-border p-6 rounded-lg hover:border-legal-primary transition-all hover:shadow-lg">
              <Scale className="w-8 h-8 text-legal-text mb-4" />
              <h2 className="text-xl font-bold text-legal-text mb-2 font-lora">Análisis de Documentos</h2>
              <p className="text-legal-text font-lora">Sube y analiza archivos legales con IA</p>
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/chat">
            <Button size="lg" className="px-8">
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}