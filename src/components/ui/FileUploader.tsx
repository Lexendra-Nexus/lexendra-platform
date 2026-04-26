import React, { useRef } from 'react'
import { FileUp } from 'lucide-react'
import { isValidFileSize } from '../../utils/helpers.ts'

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  maxSizeMB?: number
  accept?: string
}

export function FileUploader({ onFileSelect, maxSizeMB = 10, accept = '.pdf,.doc,.docx' }: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && isValidFileSize(file.size, maxSizeMB)) {
      onFileSelect(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file && isValidFileSize(file.size, maxSizeMB)) {
      onFileSelect(file)
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
        isDragging ? 'border-legal-primary bg-legal-surface' : 'border-legal-border bg-legal-bgLight'
      }`}
      onClick={() => inputRef.current?.click()}
    >
      <FileUp className="w-8 h-8 mx-auto mb-2 text-legal-text" />
      <p className="text-legal-text font-lora font-semibold">Arrastra archivos o haz clic para seleccionar</p>
      <p className="text-legal-text text-sm font-lora mt-1">Máximo {maxSizeMB}MB</p>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={handleChange}
      />
    </div>
  )
}