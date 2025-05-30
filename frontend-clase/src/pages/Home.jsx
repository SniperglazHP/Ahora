import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      {/* Sección de héroe con título e imagen */}
      <div className='hero-section'>
        <div className='text-content'>
          <h1>Restaurante Frutifantastico</h1>
          <h2>Sabores extraordinarios en cada bocado</h2>
        </div>
        <div className='image-container'>
          <img 
            src='./descarga.jpeg' 
            alt='Restaurante Frutifantastico' 
            className='restaurant-image' 
          />
        </div>
      </div>
      
      {/* Sección de características */}
      <div className='features'>
        <div className='feature-card'>
          <h3>Platos Exquisitos</h3>
          <p>Descubre nuestras creaciones culinarias con frutas frescas</p>
        </div>
        <div className='feature-card'>
          <h3>Ambiente Acogedor</h3>
          <p>Disfruta de una experiencia gastronómica única</p>
        </div>
        <div className='feature-card'>
          <h3>Servicio Premium</h3>
          <p>Atención personalizada para cada cliente</p>
        </div>
      </div>
    </div>
  )
}

export default Home