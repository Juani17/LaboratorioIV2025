const mongoose = require('mongoose');
const sprintSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaCierre: {
        type: Date,
        required: true
    },  
    tareas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task' // Relación con el modelo Task
        }
    ]
})
module.exports = mongoose.model('Sprint', sprintSchema);