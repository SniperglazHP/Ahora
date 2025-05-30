import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Eventos.css';

function Eventos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    price: '',
    available: true
  });
  
  // Estado inicial de eventos
  const [eventos, setEventos] = useState([
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
  ]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      description: '',
      price: '',
      available: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.description || !newEvent.price) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    // Crear nuevo evento con ID único
    const newEventWithId = {
      ...newEvent,
      id: Date.now() // Usar timestamp como ID único
    };
    
    // Agregar al estado
    setEventos([...eventos, newEventWithId]);
    
    // Cerrar modal y limpiar formulario
    closeCreateModal();
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("¿Está seguro que desea eliminar este evento?")) {
      setEventos(eventos.filter(evento => evento.id !== eventId));
    }
  };

  return (
    <div className="eventos-container">
      <div className="eventos-content">
        <h1>Eventos Especiales</h1>
        <p className="eventos-description">Descubra y participe en nuestros eventos exclusivos para una experiencia culinaria extraordinaria</p>
        
        <div className="admin-controls">
          <button className="create-event-btn" onClick={openCreateModal}>
            Crear Nuevo Evento
          </button>
        </div>
        
        <div className="eventos-grid">
          {eventos.map(evento => (
            <div key={evento.id} className="evento-card">
              <button 
                className="delete-event-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEvent(evento.id);
                }}
              >
                ×
              </button>
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
      
      {/* Modal para crear nuevo evento */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={closeCreateModal}>
          <div className="modal-container create-event-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCreateModal}>×</button>
            <div className="modal-content">
              <h2>Crear Nuevo Evento</h2>
              <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                  <label htmlFor="title">Título*</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={newEvent.title} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Fecha*</label>
                    <input 
                      type="text" 
                      id="date" 
                      name="date" 
                      value={newEvent.date} 
                      onChange={handleInputChange}
                      placeholder="ej: 15 de Diciembre, 2023"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Hora*</label>
                    <input 
                      type="text" 
                      id="time" 
                      name="time" 
                      value={newEvent.time} 
                      onChange={handleInputChange}
                      placeholder="ej: 19:00 hrs"
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Descripción*</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    value={newEvent.description} 
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Precio*</label>
                  <input 
                    type="text" 
                    id="price" 
                    name="price" 
                    value={newEvent.price} 
                    onChange={handleInputChange}
                    placeholder="ej: $950 por persona"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input 
                      type="checkbox" 
                      name="available" 
                      checked={newEvent.available} 
                      onChange={(e) => setNewEvent({...newEvent, available: e.target.checked})}
                    />
                    Disponible para reservaciones
                  </label>
                </div>
                <button type="submit" className="modal-reserve-btn">Crear Evento</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Eventos;
