const Task = require('../model/Task');

const task = new Task();

const createTask = (req, res) => {
    task.taskName = req.body.taskName;
    task.userId = req.body.userId;
    task.creationDate = new Date();
    
    task.createTask(task).then(
        (result) => {
            res.json({response: "ok", message: "Task created"});
        }, (error) => {
            res.json({response: "false", message: "error"});
        }
    );
}

module.exports = {
    createTask
}
