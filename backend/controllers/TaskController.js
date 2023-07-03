const TaskModel = require('../models/TaskModel');



//get request
exports.getTasks = async (req, res) => {
  try {
    const task = await TaskModel.find({});
    res.json(task);
  } catch (error) {
    console.error(error);
  }
};

//get single request
exports.getSignleTask = async (req, res) => {
  try {
    const task = await TaskModel.findById({_id:req.params.id});
    console.log(task);
    res.json(task);
  } catch (error) {
    console.error(error);
  }
};



//post request
exports.addTasks =  async (req, res) => { 
 
  try {
    //instance of TaskModel 
  const task =  new TaskModel(
    { 
       title: req.body.title,
       description: req.body.description,
       deadline: req.body.role,
    }
    );
    task.save();
     const tasksAll =  await TaskModel.find({});
     res.json(tasksAll); 
     res.end();
  } catch (error) {
    console.error(error);
  }
}





exports.deleteTask = async(req,res) => {

  console.log(req.params.id);
  try{ 
    await TaskModel.findByIdAndDelete(req.params.id);
    const tasksAll =  await TaskModel.find({});

     res.json(tasksAll); 
     res.end();
  }
  catch(error){
    console.error(error);
  }
}



exports.editTask = async(req,res) => {

  try{  
    const tasksAll =  await TaskModel.find({});
    console.log(req.params.id);
    console.log(req.body);
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { 
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.role,
     },
      { new: true, runValidators: true }
    ); 

     res.json(tasksAll); 
     res.end();
  }
  catch(error){
    console.error(error);
  }
}