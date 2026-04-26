import { FileUploader } from '../components/ui/FileUploader.tsx'
import { Button } from '../components/ui/Button.tsx'
import { useDocuments, useUploadDocument, useDeleteDocument } from '../hooks/useUpload.ts'
import { Trash2 } from 'lucide-react'

export default function AnalysisPage() {
  const { data: documents = [], isLoading } = useDocuments()
  const uploadMutation = useUploadDocument()
  const deleteMutation = useDeleteDocument()

  const handleUpload = (file: File) => {
    uploadMutation.mutate(file)
  }

  const handleDelete = (documentId: string) => {
    deleteMutation.mutate(documentId)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-legal-text mb-8 font-lora">Análisis de Documentos</h1>

      {/* Upload Section */}
      <div className="bg-legal-bgLight border border-legal-border rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-bold text-legal-text mb-4 font-lora">Cargar Documento</h2>
        <FileUploader onFileSelect={handleUpload} />
        {uploadMutation.isPending && <p className="text-legal-text mt-2 font-lora">Subiendo...</p>}
      </div>

      {/* Documents List */}
      <div className="bg-legal-bgLight border border-legal-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-legal-text mb-4 font-lora">Documentos</h2>

        {isLoading ? (
          <p className="text-legal-text font-lora">Cargando...</p>
        ) : documents.length === 0 ? (
          <p className="text-legal-text font-lora">No hay documentos</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex justify-between items-center p-3 bg-legal-bg rounded-lg border border-legal-border/50">
                <div>
                  <p className="text-legal-text font-medium font-lora">{doc.filename}</p>
                  <p className="text-legal-text text-sm font-lora">{doc.size} bytes</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(doc.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}