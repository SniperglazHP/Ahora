import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Eventos.css';

function Eventos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const eventos = [
    {
      id: 1,
      title: 'Cena de Degustación de Vinos',
      date: '15 de Noviembre, 2023',
      time: '19:00 hrs',
      description: 'Una noche especial con selección de vinos premium acompañados de un menú degustación de 5 tiempos creado por nuestro chef ejecutivo.',
      price: '$950 por persona',
      available: true
    },
    {
      id: 2,
      title: 'Noche de Jazz en Vivo',
      date: '25 de Noviembre, 2023',
      time: '20:30 hrs',
      description: 'Disfrute de una noche de música jazz en vivo mientras degusta nuestra selección de tapas y cócteles especiales.',
      price: '$350 por persona (incluye una bebida)',
      available: true
    },
    {
      id: 3,
      title: 'Curso de Cocina Italiana',
      date: '5 de Diciembre, 2023',
      time: '17:00 hrs',
      description: 'Aprenda los secretos de la auténtica cocina italiana con nuestro chef especializado. El curso incluye preparación de pasta fresca y salsas clásicas.',
      price: '$750 por persona',
      available: true
    },
    {
      id: 4,
      title: 'Cena de Año Nuevo',
      date: '31 de Diciembre, 2023',
      time: '21:00 hrs',
      description: 'Celebre la llegada del Año Nuevo con una cena especial de gala con champagne de bienvenida y música en vivo.',
      price: '$1,500 por persona',
      available: true
    }
  ];

  const openModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="eventos-container">
      <div className="eventos-content">
        <h1>Eventos Especiales</h1>
        <p className="eventos-description">Descubra y participe en nuestros eventos exclusivos para una experiencia culinaria extraordinaria</p>
        
        <div className="eventos-grid">
          {eventos.map(evento => (
            <div key={evento.id} className="evento-card">
              <div className="evento-details">
                <h3>{evento.title}</h3>
                <p className="evento-time">{evento.time}</p>
                <p className="evento-date">{evento.date}</p>
                <p className="evento-price">{evento.price}</p>
                <button 
                  className="evento-details-btn" 
                  onClick={() => openModal(evento)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="back-button-container">
          <Link to="/dashboard" className="back-button">Regresar al Inicio</Link>
        </div>
      </div>
      
      {showModal && selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-content">
              <h2>{selectedEvent.title}</h2>
              <div className="modal-info">
                <p><strong>Fecha:</strong> {selectedEvent.date}</p>
                <p><strong>Hora:</strong> {selectedEvent.time}</p>
                <p><strong>Precio:</strong> {selectedEvent.price}</p>
              </div>
              <div className="modal-description">
                <p>{selectedEvent.description}</p>
              </div>
              <div className="modal-actions">
                {selectedEvent.available ? (
                  <button className="modal-reserve-btn">Reservar Lugar</button>
                ) : (
                  <button className="modal-full-btn" disabled>Evento Completo</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Eventos;
