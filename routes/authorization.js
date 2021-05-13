const { Router } = require('express');
const { login } = require('../controller/authorization');

const router = Router();

router.post('/login', login);

module.exports = router;