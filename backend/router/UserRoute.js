const express = require('express');
const  TaskController  = require('../controllers/TaskController');

const router = express.Router();



router.get('/tasks', TaskController.getTasks);
//get single task
router.get('/tasks/:id', TaskController.getSignleTask);
//Post new task
router.post('/tasks', TaskController.addTasks);
router.delete('/tasks/:id', TaskController.deleteTask);
router.put('/tasks/:id', TaskController.editTask);


module.exports = router;