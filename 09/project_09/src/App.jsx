import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CryptoProvider } from './context/CryptoContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Trade from './pages/Trade'
import Profile from './pages/Profile'

function App() {
  return (
    <CryptoProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </CryptoProvider>
  )
}

export default App