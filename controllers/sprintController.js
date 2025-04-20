const Sprint = require('../models/Sprint'); // Asegúrate de tener el modelo Sprint definido

const getAllSprint = async (req, res) => {
    try {
        const sprints = await Sprint.find(); // Obtiene todos los sprints de la base de datos
        res.json(sprints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getSprintById = async (req, res) => {    
    try {
        const sprint = await Sprint.findById(req.params.id);
        if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
        res.json(sprint);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const createSprint = async (req, res) => {
    const sprint = new Sprint({
        nombre: req.body.nombre,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        tareas: req.body.tareas,
        color: req.body.color
    });

    try {
        const newSprint = await sprint.save(); // Guarda el nuevo sprint en la base de datos
        res.status(201).json(newSprint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const updateSprint = async (req, res) => {
    try {
        const updatedSprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSprint) 
            return res.status(404).json({ message: 'Sprint no encontrado' });
            res.json(updatedSprint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const deleteSprintById = async (req, res) => {
    try {
        const deletedSprint = await Sprint.findByIdAndDelete(req.params.id);
        if (!deletedSprint) return res.status(404).json({ message: 'Sprint no encontrado' });
        res.json({ message: 'Sprint deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const addTaskBySprintId = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id);
        if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });

        // Agregar la tarea al sprint
        sprint.tasks.push(req.params.taskId);
        await sprint.save();

        res.json(sprint);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllSprint,
    createSprint,
    getSprintById,
    updateSprint,
    deleteSprintById,
    addTaskBySprintId
};