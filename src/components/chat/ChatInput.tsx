import { useState, useEffect, useRef } from 'react'
import { Paperclip, SendHorizontal, X, FileText } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string, file?: File) => void
  disabled?: boolean
}

const fileTypes = '.pdf,.docx,.xlsx,.pptx,.png,.jpg,.jpeg'

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${parseFloat((bytes / 1024 ** i).toFixed(2))} ${sizes[i]}`
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }

    setPreviewUrl(null)
  }, [selectedFile])

  const handleSend = () => {
    if (!message.trim() && !selectedFile) return
    onSend(message, selectedFile || undefined)
    setMessage('')
    setSelectedFile(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardItems = event.clipboardData.items
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i]
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          setSelectedFile(new File([file], `pasted-image.${file.type.split('/')[1] ?? 'png'}`, { type: file.type }))
        }
      }
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-legal-bgLight p-6 shadow-lg">
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {/* File Preview Section */}
        {selectedFile && (
          <div className="border border-legal-border rounded-lg p-4 bg-legal-surface flex items-start gap-4">
            {previewUrl && selectedFile.type.startsWith('image/') ? (
              <img src={previewUrl} alt={selectedFile.name} className="w-24 h-24 object-cover rounded" />
            ) : (
              <div className="w-24 h-24 rounded bg-legal-surface flex flex-col items-center justify-center flex-shrink-0 border border-legal-border">
                <FileText className="w-8 h-8 text-legal-text mb-1" />
                <span className="text-[10px] font-semibold text-legal-text">PDF</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-legal-text truncate font-lora">{selectedFile.name}</p>
              <p className="text-xs text-legal-text mt-1 font-lora">{selectedFile.type || 'Archivo'} • {formatBytes(selectedFile.size)}</p>
            </div>
            <button 
              onClick={removeFile} 
              className="text-legal-text hover:opacity-70 transition-opacity flex-shrink-0" 
              type="button"
              aria-label="Eliminar archivo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Input Section */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              onPaste={handlePaste}
              placeholder="Escribe tu pregunta legal aquí..."
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 border border-legal-border rounded-lg bg-legal-bgLight text-legal-text placeholder-legal-textLight focus:outline-none focus:ring-2 focus:ring-legal-accent focus:border-transparent transition font-lora resize-none"
              style={{
                minHeight: '44px',
                maxHeight: '120px',
                overflow: 'auto'
              }}
            />
          </div>
          
          {/* File Attachment Button */}
          <label className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-legal-surface border border-legal-border text-legal-text cursor-pointer hover:bg-legal-surfaceLight transition-all flex-shrink-0 hover:shadow-md">
            <Paperclip className="w-5 h-5" />
            <span className="text-sm hidden sm:inline font-lora font-medium">Archivo</span>
            <input 
              ref={fileInputRef}
              type="file" 
              accept={fileTypes} 
              className="hidden" 
              onChange={handleFileChange}
              aria-label="Cargar archivo"
            />
          </label>

          {/* Send Button */}
          <button
            onClick={handleSend} 
            disabled={disabled || (!message.trim() && !selectedFile)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black border border-black dark:border-white text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 hover:shadow-lg flex-shrink-0 font-lora"
          >
            <SendHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </div>
        
        <p className="text-xs text-legal-text text-center font-lora">Presiona Enter para enviar o Shift+Enter para nueva línea</p>
      </div>
    </div>
  )
}
