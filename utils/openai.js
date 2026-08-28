const OpenAI = require('openai');

// Inicializar el cliente de OpenAI con la API Key del entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Función principal para obtener consejos de seguridad.
 * @param {string} userQuestion - La pregunta del usuario.
 * @returns {string} - La respuesta generada por la IA.
 */
async function getSecurityAdvice(userQuestion) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Puedes cambiarlo a "gpt-4" si tienes acceso
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
      max_tokens: 500,
    });

    // Extraer y devolver el contenido de la respuesta
    return completion.choices[0].message.content.trim();

  } catch (error) {
    // Manejar errores específicos de la API de OpenAI
    if (error.status === 401) {
      throw new Error('API Key inválida o no proporcionada. Verifica tu archivo .env');
    } else if (error.status === 429) {
      throw new Error('Demasiadas peticiones a la API. Espera un momento y vuelve a intentar.');
    } else {
      throw new Error(`Error de OpenAI: ${error.message}`);
    }
  }
}

module.exports = { getSecurityAdvice };
