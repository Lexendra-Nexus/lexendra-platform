# Lexentra Nexus - Frontend (`lexendra-platform`)

Interfaz web del asistente legal Lexentra Nexus, construida para:

- chat legal con streaming,
- carga de archivos para consulta documental,
- historial de conversaciones,
- análisis y gestión básica de documentos,
- modo claro/oscuro automático según el sistema operativo.

## Base clave del proyecto

- **UX legal enfocada en productividad**: chat principal + historial + módulo de análisis.
- **Streaming en tiempo real**: la respuesta del asistente se renderiza por chunks.
- **Flujo multimodal**: texto + adjuntos (PDF, DOCX, XLSX, PPTX, imágenes).
- **Persistencia local de sesiones**: estado de chats guardado en `localStorage`.
- **Tema automático**: adapta claro/oscuro vía `prefers-color-scheme`.

## Stack técnico

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (estado local)
- React Query (estado servidor)
- Axios
- React Markdown
- Lucide React (íconos)

## Estructura principal

```txt
src/
├── App.tsx
├── main.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ChatPage.tsx
│   └── AnalysisPage.tsx
├── components/
│   ├── chat/
│   ├── layout/
│   └── ui/
├── hooks/
├── services/
├── store/
├── constants/
├── types/
├── config/
└── styles/
    └── globals.css
```

## Requisitos

- Node.js 18+
- Backend corriendo (por defecto `http://localhost:3001`)

## Instalación

```bash
cd lexendra-platform
npm install
```

## Variables de entorno

Crea `lexendra-platform/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Scripts

```bash
# desarrollo
npm run dev

# build
npm run build

# preview build
npm run preview
```

## Endpoints que consume el frontend

- Chat:
  - `POST /chat/query`
  - `POST /chat/query/stream`
  - `POST /chat/query-multimodal`
  - `POST /chat/query-multimodal/stream`
- Documentos:
  - `GET /documents`
  - `POST /documents`
  - `POST /documents/batch`
  - `GET /documents/search`
  - `DELETE /documents/:id`
- Análisis:
  - `POST /analysis/analyze`
  - `POST /analysis/report`

## Flujo funcional (alto nivel)

1. Usuario escribe en `ChatInput` y opcionalmente adjunta archivo.
2. `ChatContainer` crea/usa sesión activa (`chatId`).
3. Para texto usa `chat/query/stream`; para archivos usa `query-multimodal/stream`.
4. La respuesta streaming se actualiza en tiempo real en `ChatMessages`.
5. El historial por sesión se guarda en Zustand + `localStorage`.

## Tema y diseño

- Tema claro/oscuro automático por sistema (`prefers-color-scheme`).
- Estilo minimalista: jerarquía visual por tamaño/peso/espaciado.
- Coherencia entre chat, sidebar, header, input y análisis.
- En adjuntos PDF se prioriza legibilidad del archivo identificado (sin preview blanco roto).

## Componentes clave

- `components/chat/ChatContainer.tsx`: orquestador de envío y streaming.
- `components/chat/ChatMessages.tsx`: render del hilo y Markdown.
- `components/chat/ChatInput.tsx`: entrada, attach y preview de adjuntos.
- `components/chat/ChatHistory.tsx`: sesiones y búsqueda.
- `components/ui/FileUploader.tsx`: carga de archivos en módulo análisis.

## Troubleshooting rápido

- **No conecta con backend**: revisar `VITE_API_BASE_URL`.
- **No llega streaming**: validar que backend exponga SSE y CORS.
- **No se ven cambios de UI**: correr `npm run build` para validar tipos/estilos.
- **Tema no cambia**: verificar configuración de tema del SO y recargar app.

## Notas

- El frontend está preparado para uso legal operativo: respuestas largas, formato Markdown y continuidad de sesión.
- Si cambias rutas backend, actualiza `src/constants/api.ts`.
