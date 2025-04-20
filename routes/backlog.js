const express = require('express');
const router = express.Router();
const {
    getBacklog,
    createBacklog,
    addTaskToBacklog,
} = require('../controllers/backlogController');

// GET /backlog: Obtener el backlog
router.get('/', getBacklog);

// POST /backlog: Crear backlog (solo uno en este caso)
router.post('/', createBacklog);

// PUT /backlog/add-task/:taskId: Agregar una tarea al backlog
router.put('/add-task/:taskId', addTaskToBacklog);

module.exports = router;