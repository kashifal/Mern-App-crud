const mongoose = require('mongoose'); 


const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {type:String}, 
  description: {type:String}, 
  deadline: {type:Date, default: Date.now }, 
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;