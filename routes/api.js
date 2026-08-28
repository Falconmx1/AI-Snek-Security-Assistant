const express = require('express');
const { getSecurityAdvice } = require('../utils/openai');

const router = express.Router();

// Ruta para hacer consultas de seguridad
router.post('/ask', async (req, res) => {
  const { question } = req.body;

  // Validar que la pregunta exista
  if (!question) {
    return res.status(400).json({ 
      error: 'Falta la pregunta', 
      message: 'Debes enviar un campo "question" en el cuerpo de la solicitud.' 
    });
  }

  try {
    // Obtener respuesta de OpenAI
    const advice = await getSecurityAdvice(question);
    
    // Enviar respuesta exitosa
    res.status(200).json({ 
      success: true, 
      question: question,
      answer: advice 
    });
  } catch (error) {
    console.error('Error al procesar la consulta:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'No se pudo obtener una respuesta de IA. Verifica tu API Key y conexión.' 
    });
  }
});

module.exports = router;
