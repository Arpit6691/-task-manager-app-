const Task = require("../models/Task");

const { encrypt, decrypt } = require("../utils/encryption");

// CREATE TASK
 exports.createTask = async (req, res) => {
  try {

    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await Task.create({
      user: req.userId,
      title: encrypt(title),
      description: encrypt(description || ""),
      status
    });

    res.status(201).json({
      message: "Task created"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET TASKS (pagination + filter + search)
 
exports.getTasks = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const status = req.query.status;
    const search = req.query.search;

    let query = { user: req.userId };

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const decryptedTasks = tasks.map((task) => ({
      _id: task._id,
      title: decrypt(task.title),
      description: decrypt(task.description),
      status: task.status,
      createdAt: task.createdAt
    }));

    const total = await Task.countDocuments(query);

    res.json({
      total,
      page,
      tasks: decryptedTasks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
exports.updateTask = async(req,res)=>{

try{

const task = await Task.findOneAndUpdate(
{_id:req.params.id,user:req.userId},
req.body,
{new:true}
);

if(!task){
return res.status(404).json({
message:"Task not found"
});
}

res.json(task);

}catch(error){
res.status(500).json({message:error.message});
}

};




// DELETE TASK
exports.deleteTask = async(req,res)=>{

try{

const task = await Task.findOneAndDelete({
_id:req.params.id,
user:req.userId
});

if(!task){
return res.status(404).json({
message:"Task not found"
});
}

res.json({
message:"Task deleted"
});

}catch(error){
res.status(500).json({message:error.message});
}

};