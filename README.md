# 🐍 AI-Snek Security Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai)](https://openai.com/)

**Asistente de seguridad impulsado por IA** que responde consultas y recomienda buenas prácticas usando Node.js + OpenAI. Ideal para equipos de desarrollo y seguridad que buscan respuestas rápidas y confiables.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características

- 🤖 **Respuestas Inteligentes**: Utiliza GPT-3.5-turbo para generar respuestas claras y profesionales.
- 🔒 **Enfoque en Seguridad**: Respuestas centradas en buenas prácticas, recomendaciones y soluciones concretas.
- ⚡ **API Simple y Rápida**: Endpoint fácil de usar para integrar con otras aplicaciones.
- 🛡️ **Manejo de Errores Robusto**: Captura y gestiona errores comunes de la API de OpenAI.
- 📦 **Ligero y Modular**: Código limpio y organizado para fácil mantenimiento.
- 🔐 **Seguro**: Las claves API se manejan mediante variables de entorno.

---

## 📌 Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** v18.0.0 o superior
- **npm** (viene con Node.js)
- Una **API Key** de OpenAI con acceso al modelo GPT-3.5-turbo o GPT-4

---

## 🚀 Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio

```bash
git clone https://github.com/Falconmx1/AI-Snek-Security-Assistant.git
cd AI-Snek-Security-Assistant

2. Instalar las dependencias

npm install
3. Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto (puedes basarte en .env.example si existe):


OPENAI_API_KEY=tu_api_key_aqui
PORT=3000
⚠️ Importante: Reemplaza tu_api_key_aqui con tu clave real de OpenAI. Nunca compartas ni subas este archivo al repositorio.

⚙️ Configuración
Variables de Entorno
Variable                 Descripción                            Valor por Defecto
OPENAI_API_KEY           Tu clave de API de OpenAI              (Requerido)
PORT                     Puerto donde correrá el servidor       

🖥️ Uso
Iniciar el servidor en producción

npm start
Iniciar el servidor en modo desarrollo (con autorecarga)

npm run dev
Una vez iniciado, verás un mensaje como este:


🐍 Servidor corriendo en http://localhost:3000
📡 Endpoint de consultas: POST http://localhost:3000/api/ask
📡 Endpoints de la API

📡 Endpoints de la API
POST /api/ask
Envía una pregunta de seguridad y recibe una respuesta de IA.

Cuerpo de la Solicitud (JSON)
Campo       Tipo       Requerido       Descripción
question    string     ✅ Sí           La pregunta sobre seguridad que deseas realizar.

Respuesta Exitosa (200 OK)

{
  "success": true,
  "question": "¿Cómo protejo mi API Key en un proyecto de Node.js?",
  "answer": "Para proteger tu API Key en Node.js, debes... (respuesta generada por IA)"
}
Respuesta de Error (400 Bad Request)
json
{
  "error": "Falta la pregunta",
  "message": "Debes enviar un campo \"question\" en el cuerpo de la solicitud."
}
Respuesta de Error (500 Internal Server Error)
json
{
  "error": "Error interno del servidor",
  "message": "No se pudo obtener una respuesta de IA. Verifica tu API Key y conexión."
}
GET /health
Verifica el estado del servicio.

Respuesta Exitosa (200 OK)

{
  "status": "OK",
  "message": "AI-Snek Security Assistant is running!"
}
🧪 Ejemplos de Uso
Con cURL

curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "¿Cuáles son las mejores prácticas para almacenar contraseñas?"}'
Con JavaScript (Fetch API)

fetch('http://localhost:3000/api/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: '¿Cómo puedo proteger mi aplicación de ataques XSS?',
  }),
})
.then(response => response.json())
.then(data => console.log(data.answer))
.catch(error => console.error('Error:', error));
Con Python (Requests)

import requests

url = 'http://localhost:3000/api/ask'
payload = {'question': '¿Qué es el phishing y cómo prevenirlo?'}
response = requests.post(url, json=payload)

if response.status_code == 200:
    print(response.json()['answer'])
else:
    print(f'Error: {response.status_code}')

🛠️ Tecnologías Utilizadas
Node.js - Entorno de ejecución JavaScript

Express - Framework web minimalista

OpenAI SDK - Cliente oficial para la API de OpenAI

dotenv - Carga de variables de entorno desde archivo .env

Nodemon - Herramienta para desarrollo con autorecarga

