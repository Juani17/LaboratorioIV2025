const express = require('express');
const router = express.Router();
const {
    getAllSprint,
    createSprint,
    getSprintById,
    updateSprint,
    deleteSprintById,
    addTaskBySprintId   
} = require('../controllers/sprintController');

router.get('/', getAllSprint);
router.get('/:id', getSprintById);
router.post('/', createSprint);
router.put('/:id', updateSprint);
router.delete('/:id', deleteSprintById);
router.put('/:id/add-task/:taskId', addTaskBySprintId);

module.exports = router;