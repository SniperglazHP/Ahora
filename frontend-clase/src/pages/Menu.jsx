import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

function Menu() {
  const [activeCategory, setActiveCategory] = useState('entradas');
  
  const menuItems = {
    entradas: [
      { id: 1, name: 'Carpaccio de Res', price: '$180', description: 'Finas láminas de res con aderezo de limón y parmesano', image: '/carpacio.jpeg' },
      { id: 2, name: 'Ensalada César', price: '$150', description: 'Lechuga romana, crutones, aderezo césar y queso parmesano', image: '/EnsaladaCesar.jpg' },
      { id: 3, name: 'Sopa de Cebolla', price: '$140', description: 'Tradicional sopa francesa con queso gratinado', image: '/sopacebolla.jpg' },
    ],
    principales: [
      { id: 4, name: 'Filete a la Pimienta', price: '$320', description: 'Corte de res premium con salsa de pimienta y guarnición', image: '/filetepimienta.jpg' },
      { id: 5, name: 'Pasta Alfredo', price: '$220', description: 'Pasta fettuccine con salsa cremosa y pollo', image: '/pastaalfredo.jpg' },
      { id: 6, name: 'Salmón al Horno', price: '$290', description: 'Filete de salmón con limón y hierbas', image: '/salmonalhorno.jpg' },
    ],
    postres: [
      { id: 7, name: 'Tiramisú', price: '$120', description: 'Postre italiano de café con queso mascarpone', image: '/tiramisu.jpg' },
      { id: 8, name: 'Lava Cake', price: '$140', description: 'Pastel de chocolate con centro fundido y helado', image: '/LavaCake.jpg' },
      { id: 9, name: 'Cheesecake', price: '$130', description: 'Tarta de queso con coulis de frutos rojos', image: '/cheesecake.jpg' },
    ],
    bebidas: [
      { id: 10, name: 'Vino Tinto', price: '$240', description: 'Copa de vino tinto de la casa', image: '/vinotinto.jpg' },
      { id: 11, name: 'Limonada Casera', price: '$80', description: 'Limonada fresca con hierbabuena', image: '/limonada.jpeg' },
      { id: 12, name: 'Café Especial', price: '$95', description: 'Café de especialidad con crema batida', image: '/cafe.jpg' },
    ]
  };
  
  // Función para imprimir el ticket con todos los platillos
  const handlePrintTicket = () => {
    // Crear contenido del ticket
    let ticketContent = `
      <html>
        <head>
          <title>Ticket de Menú</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              max-width: 300px;
              margin: 0 auto;
              padding: 10px;
            }
            .ticket-header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
            }
            .category-title {
              text-align: center;
              font-weight: bold;
              margin: 15px 0 5px 0;
              border-bottom: 1px solid #000;
            }
            .menu-item {
              margin-bottom: 10px;
            }
            .item-name {
              font-weight: bold;
            }
            .item-price {
              float: right;
            }
            .ticket-footer {
              text-align: center;
              margin-top: 20px;
              border-top: 1px dashed #000;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="ticket-header">
            <h2>Nuestro Menú</h2>
            <p>Restaurante Gourmet</p>
            <p>${new Date().toLocaleDateString()}</p>
          </div>
    `;

    // Añadir cada categoría y sus platillos
    const categorias = {
      entradas: 'ENTRADAS',
      principales: 'PLATOS PRINCIPALES',
      postres: 'POSTRES',
      bebidas: 'BEBIDAS'
    };

    for (const [category, items] of Object.entries(menuItems)) {
      ticketContent += `<div class="category-title">${categorias[category]}</div>`;
      
      items.forEach(item => {
        ticketContent += `
          <div class="menu-item">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
            <div>${item.description}</div>
          </div>
        `;
      });
    }

    // Cerrar el ticket
    ticketContent += `
          <div class="ticket-footer">
            <p>¡Gracias por su visita!</p>
          </div>
        </body>
      </html>
    `;

    // Crear una ventana nueva para imprimir
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(ticketContent);
    printWindow.document.close();

    // Esperar a que se cargue el contenido antes de imprimir
    printWindow.onload = function() {
      printWindow.print();
    };
  };
 
  return (
    <div className="menu-container">
      <div className="menu-content">
        <h1>Nuestro Menú</h1>
        <p className="menu-description">Disfruta de nuestra selección de platillos preparados con los mejores ingredientes</p>
        
        <div className="menu-categories">
          <button
            className={`menu-category-btn ${activeCategory === 'entradas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('entradas')}
          >
            Entradas
          </button>
          <button
            className={`menu-category-btn ${activeCategory === 'principales' ? 'active' : ''}`}
            onClick={() => setActiveCategory('principales')}
          >
            Platos Principales
          </button>
          <button 
            className={`menu-category-btn ${activeCategory === 'postres' ? 'active' : ''}`}
            onClick={() => setActiveCategory('postres')}
          >
            Postres
          </button>
          <button
            className={`menu-category-btn ${activeCategory === 'bebidas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('bebidas')}
          >
            Bebidas
          </button>
        </div>
        
        <div className="menu-items">
          {menuItems[activeCategory].map(item => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image-container">
                <img src={item.image} alt={item.name} className="menu-item-image" />
              </div>
              <div className="menu-item-info">
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="back-button-container">
          <button onClick={handlePrintTicket} className="print-button">Imprimir Menú Completo</button>
          <Link to="/dashboard" className="back-button">Regresar al Inicio</Link>
        </div>
      </div>
    </div>
  )
}

export default Menu;

