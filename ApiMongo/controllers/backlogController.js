const Backlog = require('../models/Backlog');
const Task = require('../models/Task');

// Obtener el backlog y poblar tareas
const getBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findOne().populate('tasks');
    if (!backlog) {
      return res.status(404).json({ message: 'Backlog no encontrado' });
    }
    res.json({ tasks: backlog.tasks });
  } catch (error) {
    console.error('Error al obtener backlog:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear el backlog si no existe
const createBacklog = async (req, res) => {
  try {
    const existing = await Backlog.findOne();
    if (existing) {
      return res.status(400).json({ message: 'Ya existe un backlog' });
    }
    const backlog = new Backlog({ tasks: [] });
    await backlog.save();
    res.status(201).json(backlog);
  } catch (error) {
    console.error('Error al crear backlog:', error);
    res.status(500).json({ message: 'Error al crear backlog' });
  }
};

// Agregar una tarea al backlog
const addTaskToBacklog = async (req, res) => {
  const { taskId } = req.params;
  try {
    const backlog = await Backlog.findOne();
    if (!backlog) return res.status(404).json({ message: 'Backlog no encontrado' });

    if (!backlog.tasks.includes(taskId)) {
      backlog.tasks.push(taskId);
      await backlog.save();
    }

    res.status(200).json({ message: 'Tarea agregada al backlog' });
  } catch (error) {
    console.error('Error al agregar tarea al backlog:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Reemplazar todas las tareas del backlog
const updateBacklogTasks = async (req, res) => {
  const { tasks } = req.body; // tareas es un array de IDs
  try {
    const backlog = await Backlog.findOne();
    if (!backlog) return res.status(404).json({ message: 'Backlog no encontrado' });

    backlog.tasks = tasks;
    await backlog.save();

    res.status(200).json({ message: 'Backlog actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar backlog:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getBacklog,
  createBacklog,
  addTaskToBacklog,
  updateBacklogTasks,
};
