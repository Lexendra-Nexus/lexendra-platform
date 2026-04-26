import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'
import HomePage from './pages/HomePage.tsx'
import ChatPage from './pages/ChatPage.tsx'
import AnalysisPage from './pages/AnalysisPage.tsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Layout>
  )
}