import { apiClient } from './api.ts'
import { API_ENDPOINTS } from '../constants/api.ts'
import type { Document } from '../types'

// Subir un documento
export async function uploadDocument(file: File): Promise<Document> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post(API_ENDPOINTS.UPLOAD_FILE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

// Subir múltiples documentos
export async function uploadBatch(files: File[]): Promise<Document[]> {
  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))

  const response = await apiClient.post(API_ENDPOINTS.UPLOAD_BATCH, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

// Obtener lista de documentos
export async function getDocuments(): Promise<Document[]> {
  const response = await apiClient.get(API_ENDPOINTS.GET_DOCUMENTS)
  return response.data
}

// Buscar documentos
export async function searchDocuments(query: string): Promise<Document[]> {
  const response = await apiClient.get(API_ENDPOINTS.SEARCH_DOCUMENTS, {
    params: { q: query },
  })
  return response.data
}

// Eliminar documento
export async function deleteDocument(documentId: string): Promise<void> {
  await apiClient.delete(`${API_ENDPOINTS.DELETE_DOCUMENT}/${documentId}`)
}