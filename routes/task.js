const { Router } = require('express')
const { tokenVerify } = require('../controller/authorization')
const { createTask, getTasks, completeTask, deleteTask } = require('../controller/task')

const router = Router()

router.post('/createtask', tokenVerify, createTask)

router.get('/gettasks',tokenVerify, getTasks )

router.put('/completetask', completeTask)

router.delete('/deletetask', deleteTask)

module.exports = router