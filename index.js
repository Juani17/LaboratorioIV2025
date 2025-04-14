require('dotenv').config(); // Cargar .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin"
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error al conectar:', err));

// Modelo
const Usuario = require('./models/Usuario');

// Rutas
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  const guardado = await nuevoUsuario.save();
  res.json(guardado);
});

// Inicio del servidor
app.listen(3000, () => {
  console.log('Servidor corriendo :) en http://localhost:3000');
});
