// Cargar dotenv ANTES que cualquier otra cosa
require('dotenv').config();

const OpenAI = require('openai');

// Validar que la API Key existe
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ ERROR CRÍTICO: OPENAI_API_KEY no está definida en .env');
  console.error('📁 Verifica que el archivo .env existe en la raíz y contiene:');
  console.error('   OPENAI_API_KEY=sk-proj-tu-clave-aqui');
  process.exit(1); // Detener la ejecución
}

// Inicializar OpenAI con la clave
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Función principal para obtener consejos de seguridad.
 * @param {string} userQuestion - La pregunta del usuario.
 * @param {number} retries - Número de reintentos (por defecto 3).
 * @returns {string} - La respuesta generada por la IA.
 */
async function getSecurityAdvice(userQuestion, retries = 3) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un asistente de seguridad informática experto. 
                    Responde preguntas de manera clara, concisa y profesional. 
                    Siempre enfócate en buenas prácticas, recomendaciones y soluciones concretas.`
        },
        {
          role: "user",
          content: userQuestion
        }
      ],
      temperature: 0.7,
      max_tokens: 300, // Reducido para gastar menos tokens
    });

    return completion.choices[0].message.content.trim();

  } catch (error) {
    // Manejar específicamente errores de rate limit (429)
    if (error.status === 429) {
      if (retries > 0) {
        const waitTime = 5000; // Esperar 5 segundos
        console.log(`⏳ Límite de peticiones alcanzado. Reintentando en ${waitTime/1000} segundos... (${retries} intentos restantes)`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return getSecurityAdvice(userQuestion, retries - 1);
      } else {
        throw new Error('Límite de peticiones agotado. Espera un minuto y vuelve a intentar.');
      }
    } else if (error.status === 401) {
      throw new Error('API Key inválida. Verifica tu clave en .env');
    } else {
      throw new Error(`Error de OpenAI: ${error.message}`);
    }
  }
}

module.exports = { getSecurityAdvice };
