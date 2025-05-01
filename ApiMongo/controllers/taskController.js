const Task = require('../models/Task');

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const task = new Task({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechaLimite: req.body.fechaLimite,
        color: req.body.color
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};
