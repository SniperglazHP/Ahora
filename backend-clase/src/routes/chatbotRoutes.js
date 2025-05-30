const express = require('express');
const router = express.Router();

// Base de conocimiento del chatbot
const knowledgeBase = {
  menu: {
    entradas: [
      { name: 'Carpaccio de Res', price: '180', description: 'Finas láminas de res con aderezo de limón y parmesano' },
      { name: 'Ensalada César', price: '150', description: 'Lechuga romana, crutones, aderezo césar y queso parmesano' },
      { name: 'Sopa de Cebolla', price: '140', description: 'Tradicional sopa francesa con queso gratinado' },
    ],
    principales: [
      { name: 'Filete a la Pimienta', price: '320', description: 'Corte de res premium con salsa de pimienta y guarnición' },
      { name: 'Pasta Alfredo', price: '220', description: 'Pasta fettuccine con salsa cremosa y pollo' },
      { name: 'Salmón al Horno', price: '290', description: 'Filete de salmón con limón y hierbas' },
    ],
    postres: [
      { name: 'Tiramisú', price: '120', description: 'Postre italiano de café con queso mascarpone' },
      { name: 'Lava Cake', price: '140', description: 'Pastel de chocolate con centro fundido y helado' },
      { name: 'Cheesecake', price: '130', description: 'Tarta de queso con coulis de frutos rojos' },
    ],
    bebidas: [
      { name: 'Vino Tinto', price: '240', description: 'Copa de vino tinto de la casa' },
      { name: 'Limonada Casera', price: '80', description: 'Limonada fresca con hierbabuena' },
      { name: 'Café Especial', price: '95', description: 'Café de especialidad con crema batida' },
    ],
  },
  faq: {
    horario: 'Nuestro horario es: Lunes a Jueves de 12pm a 10pm, Viernes y Sábados de 12pm a 12am, Domingos de 12pm a 9pm.',
    ubicacion: 'Estamos ubicados en Av. Principal #123, Centro Histórico, Ciudad de México.',
    estacionamiento: 'Sí, contamos con estacionamiento gratuito para nuestros clientes.',
    reservaciones: 'Puedes hacer reservaciones en nuestra página web o llamando al (555) 123-4567.',
    pago: 'Aceptamos efectivo y todas las tarjetas de crédito principales.',
    eventos: 'Sí, ofrecemos servicios para eventos privados. Por favor contáctanos para más detalles.'
  }
};

// Procesamiento del mensaje
router.post('/process', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }
    
    const lowerMessage = message.toLowerCase();
    let response = '';
    
    // Análisis básico de intención
    if (lowerMessage.includes('hora') || lowerMessage.includes('horario')) {
      response = knowledgeBase.faq.horario;
    } 
    else if (lowerMessage.includes('ubica') || lowerMessage.includes('dirección') || lowerMessage.includes('donde')) {
      response = knowledgeBase.faq.ubicacion;
    }
    else if (lowerMessage.includes('estaciona')) {
      response = knowledgeBase.faq.estacionamiento;
    }
    else if (lowerMessage.includes('reserva')) {
      response = knowledgeBase.faq.reservaciones;
    }
    else if (lowerMessage.includes('pago') || lowerMessage.includes('tarjeta') || lowerMessage.includes('efectivo')) {
      response = knowledgeBase.faq.pago;
    }
    else if (lowerMessage.includes('evento') || lowerMessage.includes('fiesta') || lowerMessage.includes('celebración')) {
      response = knowledgeBase.faq.eventos;
    }
    // Consultas sobre menú
    else if (lowerMessage.includes('menú') || lowerMessage.includes('carta')) {
      response = 'Nuestro menú incluye diversas categorías: entradas, platos principales, postres y bebidas. ¿En qué categoría estás interesado?';
    }
    else if (lowerMessage.includes('entrada')) {
      const entradas = knowledgeBase.menu.entradas.map(item => `${item.name} ($${item.price})`).join(', ');
      response = `Nuestras entradas son: ${entradas}`;
    }
    else if (lowerMessage.includes('principal')) {
      const principales = knowledgeBase.menu.principales.map(item => `${item.name} ($${item.price})`).join(', ');
      response = `Nuestros platos principales son: ${principales}`;
    }
    else if (lowerMessage.includes('postre')) {
      const postres = knowledgeBase.menu.postres.map(item => `${item.name} ($${item.price})`).join(', ');
      response = `Nuestros postres son: ${postres}`;
    }
    else if (lowerMessage.includes('bebida')) {
      const bebidas = knowledgeBase.menu.bebidas.map(item => `${item.name} ($${item.price})`).join(', ');
      response = `Nuestras bebidas son: ${bebidas}`;
    }
    // Búsqueda específica de platillos
    else {
      // Buscar en todas las categorías
      let found = false;
      for (const category in knowledgeBase.menu) {
        const item = knowledgeBase.menu[category].find(item => 
          lowerMessage.includes(item.name.toLowerCase())
        );
        
        if (item) {
          response = `${item.name} - $${item.price}: ${item.description}`;
          found = true;
          break;
        }
      }
      
      if (!found) {
        response = 'Gracias por tu mensaje. Si tienes preguntas sobre nuestro menú, horarios, o reservaciones, estoy aquí para ayudarte.';
      }
    }
    
    return res.status(200).json({ response });
  } catch (error) {
    console.error('Error procesando mensaje:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;