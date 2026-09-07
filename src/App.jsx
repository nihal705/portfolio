import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/common/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/common/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-200 text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
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