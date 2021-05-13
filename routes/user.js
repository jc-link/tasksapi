const { Router } = require('express');
const { tokenVerify } = require('../controller/authorization');
const { updateUser, deleteUser, createUser, getAuth } = require('../controller/user');
const cors = require('cors');
const router = Router();

const whitelist = ['http://localhost:8080'];

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback("Error by CORS");
        }
    }
  }

router.post('/createuser', createUser);

router.get('/getauth', tokenVerify, getAuth);

router.put('/updateuser',tokenVerify, updateUser);

router.delete('/', deleteUser);

module.exports = router;