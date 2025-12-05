const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const taskRouter = express.Router();

taskRouter.post('/add', auth.verifyToken, taskController.createTask);
taskRouter.get('/all', auth.verifyToken, taskController.getTasks);
taskRouter.get('/oldest', auth.verifyToken, taskController.getTasksOldest);
taskRouter.get('/completed', auth.verifyToken, taskController.getCompletedTasks);
taskRouter.get('/pending', auth.verifyToken, taskController.getPendingTasks);
taskRouter.put('/update/:id', auth.verifyToken, taskController.updateTask);
taskRouter.delete('/delete/:id', auth.verifyToken, taskController.deleteTask);

module.exports = taskRouter;
