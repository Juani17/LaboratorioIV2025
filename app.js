const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Carga las variables del .env

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json()); // para parsear JSON

// Rutas
const taskRoutes = require('./routes/tasks');
const sprintRoutes = require('./routes/sprints');
const backlogRoutes = require('./routes/backlog');

app.use('/api/tasks', taskRoutes);
app.use('/api/sprints', sprintRoutes);
app.use('/api/backlog', backlogRoutes);

// Conexión a MongoDB (sin opciones obsoletas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' Conectado a MongoDB :)');
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' :( Error al conectar a MongoDB:', error.message);
  });
