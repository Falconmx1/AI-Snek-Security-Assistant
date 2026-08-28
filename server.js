const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api', apiRoutes);

// Ruta de estado para verificar que el servicio funciona
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AI-Snek Security Assistant is running!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🐍 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 Endpoint de consultas: POST http://localhost:${PORT}/api/ask`);
});
