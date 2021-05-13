const { Router } = require('express');
const {  } = require('../controller/task');

const router = Router();

router.post('/createtask', createTask);