/**
 * Servicio para manejar las interacciones del chatbot con el backend
 */

const API_URL = 'https://backend-9avm.onrender.com/api';

/**
 * Envía un mensaje al chatbot y recibe una respuesta
 * @param {string} message - Mensaje del usuario
 * @returns {Promise<string>} - Respuesta del chatbot
 */
export const sendMessage = async (message) => {
  try {
    const response = await fetch(`${API_URL}/chatbot/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error al enviar mensaje al chatbot:', error);
    return 'Lo siento, estoy teniendo problemas para procesar tu mensaje. Por favor, intenta de nuevo más tarde.';
  }
};

/**
 * Procesa un mensaje del usuario
 * @param {string} message - Mensaje del usuario
 * @returns {Promise<string>} - Respuesta procesada
 */
const processMessage = async (message) => {
  try {
    // En modo desarrollo, podemos usar la versión local para tests
    if (process.env.REACT_APP_OFFLINE_MODE === 'true') {
      // Mantener la lógica actual como fallback
      // ...código existente...
    } else {
      // Usar el servicio de backend
      return await sendMessage(message);
    }
  } catch (error) {
    console.error('Error al procesar mensaje:', error);
    return 'Lo siento, tuve un problema al procesar tu mensaje. ¿Puedes intentarlo de nuevo?';
  }
};