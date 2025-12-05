
const Task = require('../models/task');

const taskController={
    // create a new task
    createTask: async(req, res)=>{
        try{
            // get task data from request body
            const {title, deadline} = req.body;
            const userId=req.userId;
            // create a new task
            const newTask = new Task({
                user: userId,
                title, 
                deadline
            });
            // save the task to database
            const savedTask= await newTask.save();
            // return the saved task
            res.status(200).send({message: 'Task created successfully', task: savedTask})
        }catch(error){
            res.send({message:error.message})
        }
    },
    // get all tasks for a user
    getTasks: async(req, res)=>{
        try{
            // get the user id from request object
            const userId = req.userId;
            // find all  tasks for the user
            const tasks = await Task.find({user: userId}).sort({createdAt:-1});
            // return the tasks
            res.status(200).send({message: 'Tasks retrieved successfully', tasks })
        }catch(error){
            res.send({message:error.message})
        }

    },
    getTasksOldest: async(req, res)=>{
        try{
            const userId = req.userId;

            const tasks = await Task.find({user:userId}).sort({createdAt:1});
            
            res.status(200).send({message: 'Tasks retrieved successfully', tasks})
        
        }catch(error){
            
            res.send({message:error.message})
        }
    },
    getCompletedTasks: async(req, res)=>{
        try{
            const userId = req.userId;

            const tasks = await Task.find({user:userId, completed:true})

            res.status(200).send({message: 'Completed tasks retrieved', tasks})
        }catch(error){
            res.send({message:error.message})
        }
    },
    getPendingTasks:async(req, res)=>{
        try{
            const userId = req.userId;

            const tasks = await Task.find({user:userId, completed:false})

            res.status(200).send({message: 'Pending tasks retrieved', tasks})
        }catch(error){
            res.send({message:error.message})
        }
    },
    updateTask: async(req, res)=>{
        try{
            const taskId = req.params.id;

            const {title, deadline, completed}= req.body;

            const updatedTask = await Task.findByIdAndUpdate(taskId,{
                title,
                deadline,
                completed
            }, {new:true})
            
            res.status(200).send({message: 'Task updated successfully', task:updatedTask})
        }catch(error){
            res.send({message:error.message})
        }
    },
    deleteTask: async(req, res)=>{
         try{
            const taskId = req.params.id;

            
            const deletedTask = await Task.findByIdAndDelete(taskId)
            
            if(!deletedTask){
                return res.status(400).send({message:'Task not found'})
            }
            
            res.status(200).send({message: 'Task deleted successfully', task:deletedTask})
        }catch(error){
            res.send({message:error.message})
        }
    }
}
module.exports=taskController;
