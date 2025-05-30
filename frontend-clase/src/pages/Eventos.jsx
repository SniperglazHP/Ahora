import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Eventos.css';

function Eventos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();
  
  // Estado inicial para el formulario de nuevo evento
  const initialFormState = {
    title: '',
    date: '',
    time: '',
    description: '',
    price: '',
  };
  
  const [formData, setFormData] = useState(initialFormState);
  
  // Convertimos eventos a estado para poder modificarlos
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
  
  const handleDeleteEvent = (id) => {
    if(window.confirm('¿Estás seguro que deseas eliminar este evento?')) {
      setEventos(eventos.filter(evento => evento.id !== id));
    }
  };
  
  const handleAddFormToggle = () => {
    setShowAddForm(!showAddForm);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    // Crear nuevo evento
    const newEvent = {
      id: Date.now(), // ID único basado en timestamp
      ...formData,
      available: true
    };
    
    // Añadir a la lista de eventos
    setEventos([...eventos, newEvent]);
    
    // Limpiar y cerrar formulario
    setFormData(initialFormState);
    setShowAddForm(false);
  };

  // Determinar si el usuario tiene permisos de administrador
  const isAdmin = user && user.username === 'admin'; // Simplificado para este ejemplo

  return (
    <div className="eventos-container">
      <div className="eventos-content">
        <h1>Eventos Especiales</h1>
        <p className="eventos-description">Descubra y participe en nuestros eventos exclusivos para una experiencia culinaria extraordinaria</p>
        
        {/* Botón para agregar eventos (solo visible para admin) */}
        {isAdmin && (
          <div className="admin-controls">
            <button 
              className="add-event-btn" 
              onClick={handleAddFormToggle}
            >
              {showAddForm ? 'Cancelar' : 'Agregar Nuevo Evento'}
            </button>
          </div>
        )}
        
        {/* Formulario para añadir eventos */}
        {isAdmin && showAddForm && (
          <div className="add-event-form-container">
            <form className="add-event-form" onSubmit={handleAddEvent}>
              <h3>Crear Nuevo Evento</h3>
              
              <div className="form-group">
                <label htmlFor="title">Título del Evento:</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Fecha:</label>
                  <input 
                    type="text" 
                    id="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleFormChange} 
                    placeholder="Ej: 15 de Diciembre, 2023"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="time">Hora:</label>
                  <input 
                    type="text" 
                    id="time" 
                    name="time" 
                    value={formData.time} 
                    onChange={handleFormChange}
                    placeholder="Ej: 19:00 hrs" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Precio:</label>
                <input 
                  type="text" 
                  id="price" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleFormChange}
                  placeholder="Ej: $950 por persona" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleFormChange} 
                  required
                ></textarea>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="submit-event-btn">Guardar Evento</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
        
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
                {isAdmin && (
                  <button 
                    className="evento-delete-btn" 
                    onClick={() => handleDeleteEvent(evento.id)}
                  >
                    Eliminar Evento
                  </button>
                )}
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
