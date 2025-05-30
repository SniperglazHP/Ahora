import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <div className="dashboard-content">
        <h1>Bienvenido a Nuestro Restaurante</h1>
        <h2>Sabores exquisitos para cada ocasión</h2>
        
        <div className="dashboard-sections">
          <div className="dashboard-card">
            <h3>Nuestro Menú</h3>
            <p>Descubre nuestra variedad de platillos gourmet preparados con los mejores ingredientes.</p>
            <Link to="/menu">
              <button className="dashboard-button">Ver Menú</button>
            </Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Reservaciones</h3>
            <p>Reserva una mesa para tu próxima celebración o cena especial.</p>
            <Link to="/reservaciones">
              <button className="dashboard-button">Reservar Ahora</button>
            </Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Eventos Especiales</h3>
            <p>Conoce nuestros eventos y promociones exclusivas de temporada.</p>
            <Link to="/eventos">
              <button className="dashboard-button">Ver Eventos</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;