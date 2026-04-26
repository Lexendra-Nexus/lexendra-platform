import { ChatContainer } from '../components/chat/ChatContainer.tsx'
import { ChatHistory } from '../components/chat/ChatHistory.tsx'

export default function ChatPage() {
  return (
    <div className="h-full flex">
      <ChatHistory />
      <div className="flex-1 flex flex-col">
        <ChatContainer />
      </div>
    </div>
  )
}