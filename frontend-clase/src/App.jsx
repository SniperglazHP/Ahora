import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Component from './pages/Crud'
import EditarUser from './pages/Editor'

// Importar las nuevas páginas del restaurante
import Menu from './pages/Menu'
import Reservaciones from './pages/Reservaciones'
import Eventos from './pages/Eventos'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<Component />} />
        <Route path="/edit" element={<EditarUser />} />
        
        {/* Rutas para las páginas del restaurante */}
        <Route 
          path="/menu" 
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reservaciones" 
          element={
            <ProtectedRoute>
              <Reservaciones />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/eventos" 
          element={
            <ProtectedRoute>
              <Eventos />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App