import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './Layout.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Component from './pages/Crud'
import EditarUser from './pages/Editor'
// Importar los componentes de las nuevas páginas
import Menu from './pages/Menu.jsx'
import Reservaciones from './pages/Reservaciones.jsx'
import Eventos from './pages/Eventos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/user" element={<Component />} />
            <Route path="/edit" element={<EditarUser />} />
            {/* Nuevas rutas para las páginas del restaurante */}
            <Route path='/menu' element={<Menu />} />
            <Route path='/reservaciones' element={<Reservaciones />} />
            <Route path='/eventos' element={<Eventos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
