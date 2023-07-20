const express = require('express');
const  TaskController  = require('../controllers/TaskController');
const {protected} = require('../modules/Auth');

const router = express.Router();



router.
route('/tasks')
.get(protected, TaskController.getTasks)
.post(protected, TaskController.addTasks);
 

//single task
router.
route('/tasks/:id')
.get( TaskController.getSignleTask)
.delete( TaskController.deleteTask)
.put( TaskController.editTask)
 
 


module.exports = router;