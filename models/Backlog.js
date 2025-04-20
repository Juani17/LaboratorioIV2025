const mongoose = require('mongoose');

// Definimos el esquema del Backlog
const BacklogSchema = new mongoose.Schema({
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task', // Relación con el modelo Task
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Backlog', BacklogSchema);