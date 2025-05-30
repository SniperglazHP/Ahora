import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: '¡Hola! Soy el asistente virtual de Restaurante Frutifantastico. ¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Opciones rápidas para mostrar al usuario - Añadidas más opciones
  const quickOptions = [
    { id: 1, text: '¿Cuál es el horario?' },
    { id: 2, text: '¿Cómo hago una reservación?' },
    { id: 3, text: '¿Qué platillos recomiendan?' }
  ];

  // Autoscroll al recibir nuevos mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Añade mensaje del usuario
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simula que el bot está escribiendo
    setIsTyping(true);

    try {
      // Envía mensaje al backend y recibe respuesta
      const response = await processMessage(input);
      
      // Pequeño delay para simular procesamiento
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      }, 800);
      
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: 'Lo siento, tuve un problema al procesar tu mensaje. ¿Puedes intentarlo de nuevo?', 
        sender: 'bot' 
      }]);
    }
  };

  // Función para procesar mensajes (simula conexión con backend)
  const processMessage = async (message) => {
    // En un entorno real, esto sería una llamada API al backend
    // Aquí implementamos lógica simple para demostración
    
    const lowerMessage = message.toLowerCase();
    
    // HORARIOS
    if (lowerMessage.match(/hora|horario|abren|cierran|abierto|cuando|disponible|atienden/)) {
      return 'Nuestro horario es: Lunes a Jueves de 12pm a 10pm, Viernes y Sábados de 12pm a 12am, Domingos de 12pm a 9pm. ¡Te esperamos!';
    } 
    
    // RESERVACIONES
    else if (lowerMessage.match(/reserva|reservación|reservar|agendar|apartar|mesa|lugar|espacio|cupo/)) {
      return 'Puedes hacer reservaciones de varias formas:\n• A través de nuestra página web en la sección "Reservaciones"\n• Llamando al (555) 123-4567\n• Por WhatsApp al (555) 765-4321\n• Por correo a reservas@frutifantastico.com\n\n¿Necesitas ayuda para hacer tu reserva ahora?';
    }
    
    // MENÚ Y PLATILLOS
    else if (lowerMessage.match(/menu|carta|platillos|comida|comer|platos|especialidad|ofrecen|sirven|tienen de comer/)) {
      return 'Nuestro menú incluye una amplia variedad de platillos:\n• Entradas: desde ensaladas frescas hasta carpaccios\n• Platos fuertes: especialidades con frutas tropicales y carnes selectas\n• Mariscos: frescos del día con preparaciones únicas\n• Postres: creaciones exclusivas de nuestro chef pastelero\n\n¿Te interesa alguna categoría en particular?';
    }
    
    // PLATOS RECOMENDADOS / ESPECIALIDADES
    else if (lowerMessage.match(/recomend|especial|popular|favorito|signature|destacado|mejor plato|qué pedir/)) {
      return 'Nuestras especialidades más populares son:\n• Salmón a la naranja con reducción de maracuyá\n• Lomo de res con salsa de mango y chile\n• Risotto de frutos rojos con pollo glaseado\n• Tacos tropicales de camarón y piña\n\nCualquiera de estos platillos te dejará una experiencia inolvidable. ¿Te gustaría saber más sobre alguno?';
    }
    
    // OPCIONES VEGETARIANAS/VEGANAS
    else if (lowerMessage.match(/vegetarian|vegan|sin carne|plant based|verde|vegetales|vegetal|saludable/)) {
      return 'Ofrecemos varias opciones vegetarianas y veganas:\n• Ensalada Frutifantástica con aderezo de frambuesa\n• Hamburguesa de frijol negro y champiñones\n• Curry de verduras con leche de coco\n• Pasta primavera con pesto vegano\n• Bowl de quinoa y aguacate\n\nTodos nuestros platos vegetarianos están claramente marcados en la carta. ¿Tienes alguna preferencia en particular?';
    }
    
    // PRECIOS
    else if (lowerMessage.match(/precio|costo|cuánto cuesta|valor|tarifa|económico|caro|barato|presupuesto/)) {
      return 'Nuestros precios varían según la categoría:\n• Entradas: desde $140 hasta $220\n• Platos principales: desde $220 hasta $450\n• Ensaladas completas: desde $180\n• Postres: desde $120\n• Bebidas: desde $80 (sin alcohol) y $150 (con alcohol)\n• Menú ejecutivo de lunes a viernes: $280 (incluye entrada, plato fuerte y postre)\n\n¿Te interesa algún platillo en particular?';
    }
    
    // UBICACIÓN
    else if (lowerMessage.match(/ubicación|dirección|donde están|como llegar|dónde es|dónde queda|mapa|ubicados/)) {
      return 'Estamos ubicados en Av. Frutal #123, Colonia Gastronómica, Ciudad de México.\n\nReferencias:\n• A dos cuadras del Parque Central\n• Frente a la Plaza Comercial Las Delicias\n• Estación de metro "Sabores" a 5 minutos caminando\n\n¿Necesitas indicaciones más específicas para llegar?';
    }
    
    // ESTACIONAMIENTO
    else if (lowerMessage.match(/estacionamiento|parking|parqueo|donde estacionar|aparcamiento|valet|carro|auto|coche/)) {
      return 'Contamos con estacionamiento propio con 50 lugares disponibles. También ofrecemos servicio de valet parking por un costo adicional de $60. Si nuestro estacionamiento está lleno, hay un estacionamiento público a una cuadra con tarifa preferencial para nuestros clientes.';
    }
    
    // DELIVERY / SERVICIO A DOMICILIO
    else if (lowerMessage.match(/delivery|domicilio|envío|llevar|a casa|reparto|mandan a|entrega|envían/)) {
      return 'Sí, contamos con servicio a domicilio:\n• Directo: Llamando al (555) 987-6543\n• Apps: Disponibles en UberEats, Rappi y DiDi Food\n• Horario de entregas: 12:30pm a 9:30pm\n• Zona de cobertura: 8km a la redonda\n\nEl tiempo estimado de entrega es de 30-45 minutos dependiendo de tu ubicación. ¿Te gustaría hacer un pedido?';
    }
    
    // PARA LLEVAR / TAKEOUT
    else if (lowerMessage.match(/para llevar|takeout|recoger|pickup|take away|comida para llevar/)) {
      return 'Por supuesto, puedes ordenar para llevar:\n• Por teléfono al (555) 987-6543\n• A través de nuestra página web\n• Directamente en el restaurante\n\nTu orden estará lista en aproximadamente 20 minutos. Además, tenemos un 10% de descuento en órdenes para llevar de lunes a jueves.';
    }
    
    // PROMOCIONES / DESCUENTOS
    else if (lowerMessage.match(/promoción|descuento|oferta|happy hour|2x1|especial del día|promo|cupón/)) {
      return 'Actualmente tenemos estas promociones:\n• Lunes: 2x1 en cócteles seleccionados\n• Martes: 20% de descuento en platos principales\n• Miércoles: Noche de vinos, 30% de descuento en botellas seleccionadas\n• Jueves a domingo: Happy Hour de 4pm a 7pm\n• Todo el mes: 15% de descuento en tu primera reserva online\n\nSíguenos en redes sociales para enterarte de promociones exclusivas.';
    }
    
    // EVENTOS / CELEBRACIONES
    else if (lowerMessage.match(/evento|fiesta|celebración|cumpleaños|aniversario|reunión|privado|grupo grande|boda/)) {
      return 'Organizamos todo tipo de eventos:\n• Cumpleaños\n• Aniversarios\n• Reuniones corporativas\n• Despedidas\n• Eventos familiares\n\nContamos con un área privada para hasta 40 personas y ofrecemos paquetes personalizados según tus necesidades. ¿Te gustaría recibir más información sobre nuestros servicios para eventos?';
    }
    
    // MÉTODOS DE PAGO
    else if (lowerMessage.match(/pago|pagar|tarjeta|efectivo|débito|crédito|transferencia|factura|facturación/)) {
      return 'Aceptamos diversas formas de pago:\n• Efectivo\n• Todas las tarjetas de crédito y débito\n• Transferencias bancarias\n• Aplicaciones móviles (Apple Pay, Google Pay)\n• Vales de despensa digitales\n\nTambién ofrecemos facturación electrónica. Solo solicítala al momento de pagar.';
    }
    
    // MENÚ INFANTIL
    else if (lowerMessage.match(/niños|infantil|pequeños|kids|baby|menú infantil|child|children|familia/)) {
      return 'Tenemos un menú infantil delicioso y divertido:\n• Mini hamburguesas frutales\n• Nuggets de pollo caseros\n• Pasta con albóndigas\n• Pizza personal frutal\n\nTodos incluyen bebida, postre y una sorpresa. También contamos con sillas altas, área de juegos y cambiadores en los baños.';
    }
    
    // WIFI Y COMODIDADES
    else if (lowerMessage.match(/wifi|internet|conectar|comodidades|baño|enchufe|cargar|facilidades|servicios/)) {
      return 'Contamos con WiFi gratuito para clientes (pregunta la contraseña a tu mesero), baños amplios con cambiadores para bebés, enchufes en varias mesas para cargar dispositivos, y área de espera cómoda con revistas y agua de cortesía.';
    }
    
    // BEBIDAS
    else if (lowerMessage.match(/bebida|tomar|alcohol|vino|cerveza|cocktail|cóctel|bar|trago|refresco|agua|jugo/)) {
      return 'Nuestra carta de bebidas incluye:\n• Coctelería de autor con frutas exóticas\n• Amplia selección de vinos nacionales e importados\n• Cervezas artesanales y comerciales\n• Jugos y smoothies naturales\n• Café de especialidad\n• Aguas frescas caseras\n\n¡Prueba nuestra especialidad: Sangría Frutifantástica con 7 frutas tropicales!';
    }
    
    // COMIDA PARA LLEVAR / DELIVERY
    else if (lowerMessage.match(/comida para llev|a domicilio|delivery|uber eats|rappi|envío/)) {
      return 'Ofrecemos servicio a domicilio y para llevar. Puedes ordenar a través de nuestra página web, llamando al (555) 987-6543 o mediante las principales aplicaciones de entrega. El horario de este servicio es de 12:30pm a 9:30pm.';
    }
    
    // ALERGIAS / RESTRICCIONES DIETÉTICAS
    else if (lowerMessage.match(/alergia|celiaco|sin gluten|gluten free|intolerancia|lactosa|diabético|dieta/)) {
      return 'Tomamos muy en serio las alergias e intolerancias alimentarias. Contamos con opciones sin gluten, sin lácteos y bajas en sodio. Por favor, infórmanos de tus necesidades dietéticas específicas al hacer tu reserva o al ordenar, y nuestro chef adaptará los platos según sea necesario.';
    }
    
    // POSTRES
    else if (lowerMessage.match(/postre|dulce|dessert|pastel|helado|tarta|flan|mousse|chocolate/)) {
      return 'Nuestros postres son creaciones exclusivas del chef pastelero:\n• Volcán de chocolate con centro de maracuyá\n• Tarta de frutas de temporada\n• Crème brûlée de vainilla con infusión de naranja\n• Helados y sorbetes artesanales\n• Mousse de tres chocolates\n\nTodos elaborados diariamente con ingredientes frescos. ¿Cuál te gustaría probar?';
    }
    
    // AGRADECIMIENTOS
    else if (lowerMessage.match(/gracias|agradezco|muchas gracias|thank|thanks|muy amable|te lo agradezco/)) {
      return '¡De nada! Estoy aquí para ayudarte con cualquier duda sobre nuestro restaurante. Si necesitas más información, no dudes en preguntar. ¿Hay algo más en lo que pueda asistirte?';
    }
    
    // SALUDOS
    else if (lowerMessage.match(/hola|buenos días|buenas tardes|buenas noches|saludos|hey|hi|hello/)) {
      return '¡Hola! Bienvenido al asistente virtual de Restaurante Frutifantastico. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre nuestro menú, horarios, ubicación o hacer una reservación.';
    }
    
    // DESPEDIDAS
    else if (lowerMessage.match(/adiós|bye|hasta luego|nos vemos|chao|hasta pronto|me voy/)) {
      return '¡Gracias por contactarnos! Esperamos verte pronto en Restaurante Frutifantastico. Si tienes más preguntas en el futuro, no dudes en volver a consultarme. ¡Buen día!';
    }
    
    // IDIOMAS
    else if (lowerMessage.match(/inglés|english|language|idioma|speak|hablas|francés|italiano/)) {
      return 'Nuestro personal habla español e inglés. Adicionalmente, contamos con menús disponibles en español, inglés, francés e italiano. ¿En qué idioma prefieres ser atendido?';
    }
    
    // ACCESIBILIDAD
    else if (lowerMessage.match(/accesib|discapacidad|silla de ruedas|rampa|elevador|ascensor|movilidad/)) {
      return 'Nuestro restaurante es totalmente accesible. Contamos con rampas de acceso, baños adaptados, y espacios amplios para la circulación de sillas de ruedas. Si necesitas alguna asistencia especial, por favor indícalo al hacer tu reserva.';
    }
    
    // RESPUESTA POR DEFECTO
    else {
      const respuestas = [
        'Gracias por tu mensaje. ¿Puedes ser un poco más específico para poder ayudarte mejor? Puedo informarte sobre nuestro menú, horarios, reservaciones, o eventos especiales.',
        'No estoy seguro de entender completamente tu pregunta. ¿Puedes reformularla? Estoy aquí para ayudarte con información sobre nuestro restaurante.',
        'Estoy aquí para asistirte con información sobre Restaurante Frutifantástico. ¿Te gustaría saber sobre nuestro menú, ubicación, horarios o hacer una reserva?',
        'Disculpa, no tengo información específica sobre eso. Pero puedo ayudarte con detalles sobre nuestro menú, precios, ubicación, reservaciones o eventos especiales. ¿Qué te interesa saber?',
        'Gracias por contactarnos. Puedo ayudarte con información sobre nuestra carta, promociones especiales, reservaciones o servicio a domicilio. ¿En qué área puedo asistirte?'
      ];
      
      // Seleccionar una respuesta aleatoria
      return respuestas[Math.floor(Math.random() * respuestas.length)];
    }
  };

  const handleQuickOption = (option) => {
    setInput(option);
    // No enviar inmediatamente para que el usuario vea lo que eligió
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Botón flotante para abrir/cerrar chat */}
      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </button>
      
      {/* Ventana del chat */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Asistente Virtual</h3>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-quick-options">
            {quickOptions.map(option => (
              <button 
                key={option.id}
                onClick={() => handleQuickOption(option.text)}
                className="quick-option-btn"
              >
                {option.text}
              </button>
            ))}
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;