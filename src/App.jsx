import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/common/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/common/Footer'
import BackToTop from './components/common/BackToTop'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen bg-dark-200 text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop /> 
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            style: { 
              background: '#1A1A2E', 
              color: '#FFFFFF',
              border: '1px solid rgba(255,215,0,0.2)'
            } 
          }} 
        />
      </div>
    </Router>
  )
}

export default App