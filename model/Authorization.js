const { json } = require('express');
const mysqlConnection = require('../config/database');
const User = require('./User');

const user = new User();

class Authorization {
    
    constructor() {

    }
   
    login(username) {
        
        return new Promise((resolve, reject) => {
            user.getUser(username)
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            }
        );
        })
        
    }
}

module.exports = Authorization;