const mysqlConnection = require('../config/database');

class User {
    constructor(username, userMail, password, authMethod) {
        this.username = username;
        this.userMail = userMail;
        this.password = password;
        this.authMethod = authMethod;
    }

    async createUser(user) {
        let usernameEval = await this.checkUsername(user.username);
        let userMailEval = await this.checkMail(user.userMail);

            return new Promise ((resolve, reject) => {
                if(usernameEval){
                    reject({message: "The username already exist!"});
                } else if(userMailEval) {
                    reject({message: "The email is already in use!"});
                } else {
                    const newUser = {
                        username: user.username,
                        user_mail: user.userMail,
                        auth_method_id: user.authMethod,
                        password: user.password
                    }
                    mysqlConnection.query('INSERT INTO user SET ?', newUser, (error) => {
                        if(!error) {
                            resolve(true);
                        } else {
                            console.log(error);
                            reject(false);
                        }
                    });
                }        

                
            });
        
        
    }

    getUser({ username }) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query('SELECT * FROM user where username = ? ', username, (error, rows) => {
                if(error) {
                    reject(error);
                }
                if(rows.length > 0) {
                    resolve(rows);
                } else {
                    reject({message: "Invalid user or password!"});
                }
            });
        });

    }

    checkUsername(username) {
        return new Promise((resolve, reject) => {
            mysqlConnection.query('SELECT username FROM user WHERE username = ?', [username], (error, rows, fields) => {
                if(error) {
                   reject(false);
                } 
                if(rows.length > 0){
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    checkPassword(username, password) {
        return new Promise((resolve, reject) => {
            mysqlConnection.query('SELECT password FROM user WHERE username = ?', [username], (error, rows) => {
                if(error) {
                    reject(false);
                }
                if(rows.length > 0) {
                    console.log(rows);
                }
            })
        })
    }

    checkMail(mail) {
        return new Promise((resolve, reject) => {
            mysqlConnection.query('SELECT user_mail FROM user WHERE user_mail = ?', [mail], (error, rows) => {
                if(error) {
                   reject(error);
                } 
                if(rows.length > 0){
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    getAuthentication() {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query('SELECT * FROM auth_method', (error, result) => {
                if(error == null) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }

    updateUser(user, username) {
        console.log(user);
        return new Promise((resolve, reject) => {
            mysqlConnection.query('UPDATE user SET ? WHERE username = ?', [user, username], (error, result) => {
                if(error !== null) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = User;