const Task = require('../model/Task')
const jwt = require('jsonwebtoken')
const task = new Task()

const createTask = (req, res) => {
    const payload = jwt.verify(req.body.token, process.env.SEED )
    task.taskName = req.body.taskName
    task.userId = payload.userId
    task.creationDate = new Date()
    
    task.createTask(task).then(
        (result) => {
            res.json({response: "ok", message: "Task created"})
        }
        ).catch((error) => {
            res.json({response: "false", message: "error"})
        })
        
}

const getTasks = (req, res) => {
    const payload = jwt.verify(req.body.token, process.env.SEED)
    task.getTasks({ userId: payload.userId, completed: req.body.completed }).then(
        (result) => {
            res.json(result)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
}

const completeTask = (req, res) => {
    const payload = jwt.verify(req.body.token, process.env.SEED)
    const completedTask = {
        completed: true,
        completed_date: new Date()
    }
    
    task.completeTask( {taskId: req.body.taskId, userId: payload.userId}, completedTask).then(
        (result) => {
            res.json(result)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
    
}

const deleteTask = (req, res) => {
    task.deleteTask({ taskId: req.body.taskId }).then(
        (result) => {
            res.json(result)
        }
    ).catch((error) => {
        res.json(error)
    })
}

module.exports = {
    createTask,
    getTasks,
    completeTask,
    deleteTask
}
