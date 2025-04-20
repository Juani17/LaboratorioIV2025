const Backlog = require('../models/Backlog');
const Task = require('../models/Task'); // Asegúrate de tener el modelo Task definido

// GET /backlog: Obtener el backlog
const getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate('tasks'); // Obtiene el backlog con las tareas relacionadas
        if (!backlog) return res.status(404).json({ message: 'Backlog no encontrado' });
        res.json(backlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /backlog: Crear backlog (solo uno en este caso)
const createBacklog = async (req, res) => {
    try {
        // Verifica si ya existe un backlog
        const existingBacklog = await Backlog.findOne();
        if (existingBacklog) return res.status(400).json({ message: 'Ya existe un backlog' });

        // Crea un nuevo backlog
        const backlog = new Backlog();
        const newBacklog = await backlog.save();
        res.status(201).json(newBacklog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT /backlog/add-task/:taskId: Agregar una tarea al backlog
const addTaskToBacklog = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Verifica si la tarea existe
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        // Obtiene el backlog
        const backlog = await Backlog.findOne();
        if (!backlog) return res.status(404).json({ message: 'Backlog no encontrado' });

        // Agrega la tarea al backlog si no está ya incluida
        if (!backlog.tasks.includes(taskId)) {
            backlog.tasks.push(taskId);
            await backlog.save();
        }

        res.json(backlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getBacklog,
    createBacklog,
    addTaskToBacklog,
};