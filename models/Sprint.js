const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },  
    tareas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task' // Relación con el modelo Task
        }
    ],
    color: {
        type: String,
        required: true
    }
})