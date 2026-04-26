// Endpoints de la API del Backend
export const API_ENDPOINTS = {
  // CHAT
  CHAT_QUERY: '/chat/query',
  CHAT_QUERY_MULTIMODAL: '/chat/query-multimodal',
  CHAT_STREAM: '/chat/query/stream',
  CHAT_GET: '/chat',
  CHAT_DELETE: '/chat',

  // DOCUMENTOS
  UPLOAD_FILE: '/documents',
  UPLOAD_BATCH: '/documents/batch',
  GET_DOCUMENTS: '/documents',
  SEARCH_DOCUMENTS: '/documents/search',
  DELETE_DOCUMENT: '/documents',

  // INGEST
  INGEST_BATCH: '/ingest/batch',
  INGEST_STATUS: '/ingest/status',

  // ANÁLISIS
  ANALYZE: '/analysis/analyze',
  GENERATE_REPORT: '/analysis/report',
}