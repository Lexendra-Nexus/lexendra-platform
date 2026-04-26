import { useMutation, useQuery } from '@tanstack/react-query'
import * as uploadService from '../services/upload.service.ts'
import { useUIStore } from '../store/ui.store.ts'

// Hook para obtener lista de documentos
export function useDocuments() {
  const query = useQuery({
    queryKey: ['documents'],
    queryFn: uploadService.getDocuments,
  })

  return query
}

// Hook para subir documento
export function useUploadDocument() {
  const { setSelectedDocument } = useUIStore()

  const mutation = useMutation({
    mutationFn: (file: File) => uploadService.uploadDocument(file),
    onSuccess: (data) => {
      setSelectedDocument(data)
    },
  })

  return mutation
}

// Hook para eliminar documento
export function useDeleteDocument() {
  return useMutation({
    mutationFn: (documentId: string) => uploadService.deleteDocument(documentId),
  })
}