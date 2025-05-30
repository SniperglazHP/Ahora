import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reservaciones.css';

function Reservaciones() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '2',
    mensaje: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.fecha || !formData.hora) {
      setFormError('Por favor complete todos los campos obligatorios');
      return;
    }
    
    // Aquí iría la lógica para enviar los datos a un servidor
    // Por ahora, simulamos una respuesta exitosa
    setTimeout(() => {
      setFormSubmitted(true);
      setFormError(null);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      hora: '',
      personas: '2',
      mensaje: ''
    });
    setFormSubmitted(false);
  };

  // Generar opciones para el número de personas
  const personasOptions = [];
  for (let i = 1; i <= 20; i++) {
    personasOptions.push(<option key={i} value={i}>{i} {i === 1 ? 'persona' : 'personas'}</option>);
  }

  return (
    <div className="reservaciones-container">
      <div className="reservaciones-content">
        <h1>Reservaciones</h1>
        <p className="reservaciones-description">Reserve su mesa con anticipación para asegurar la mejor experiencia</p>
        
        {formSubmitted ? (
          <div className="reservacion-confirmada">
            <div className="confirmacion-icon">✓</div>
            <h2>¡Reservación Confirmada!</h2>
            <p>Gracias por reservar con nosotros. Hemos enviado un correo de confirmación a {formData.email}.</p>
            <p>Le esperamos el día {formData.fecha} a las {formData.hora} hrs.</p>
            <button className="reservacion-btn" onClick={resetForm}>Hacer otra reservación</button>
            <Link to="/dashboard" className="back-button">Volver al inicio</Link>
          </div>
        ) : (
          <div className="reservacion-form-container">
            <div className="reservacion-form-wrapper">
              <form className="reservacion-form" onSubmit={handleSubmit}>
                {formError && <div className="form-error">{formError}</div>}
                
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo*</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico*</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono*</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      name="telefono" 
                      value={formData.telefono} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fecha">Fecha*</label>
                    <input 
                      type="date" 
                      id="fecha" 
                      name="fecha" 
                      value={formData.fecha} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="hora">Hora*</label>
                    <input 
                      type="time" 
                      id="hora" 
                      name="hora" 
                      value={formData.hora} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="personas">Número de personas*</label>
                  <select 
                    id="personas" 
                    name="personas" 
                    value={formData.personas} 
                    onChange={handleChange}
                    required
                  >
                    {personasOptions}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="mensaje">Peticiones especiales</label>
                  <textarea 
                    id="mensaje" 
                    name="mensaje" 
                    value={formData.mensaje} 
                    onChange={handleChange}
                    placeholder="Indíquenos si tiene alergias, preferencias o si celebra una ocasión especial"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <button type="submit" className="reservacion-btn">Confirmar Reservación</button>
                </div>
                
                <p className="form-disclaimer">*Campos obligatorios</p>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <div className="back-button-container" style={{marginTop: '30px', textAlign: 'center'}}>
        <Link 
          to="/dashboard" 
          className="back-button"
          style={{
            backgroundColor: '#d9534f',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background-color 0.3s'
          }}
        >
          Regresar al Inicio
        </Link>
      </div>
    </div>
  );
}

export default Reservaciones;
