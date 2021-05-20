const { response } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const user = new User()

const createUser = (req, res) => {

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)
    user.username = req.body.username
    user.password = hashPassword
    user.userMail = req.body.mail
    user.authMethod = 1
    
    user.createUser(user).then(
        (result) => {
            res.json({response: "ok", message: "User created"})
        }, (message) => {
            res.json(message)
        }
    )

}

const updateUser = (req, res) => {
    
    const payload = jwt.verify(req.body.token, process.env.SEED )
    const updatedUser = {
        username: req.body.username,
        user_mail: req.body.mail
    }

    user.updateUser(updatedUser, payload.userId).then(
        (result) => {
            res.json(result)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
    
}

const getUser = (req, res = response) => {

    const users = user.getUser()
    res.json(users)

}

const getAuth = (req, res = response) => {

    user.getAuthentication().then(
        (result) => {
            res.json(result)
        },
        (error) => {
            res.json(error)
        }
    )

}


const deleteUser = (req, res = response) => {
    
    const payload = jwt.verify(req.body.token, process.env.SEED )
    user.deleteUser({ userId : payload.userId }).then(
        (result) => {
            res.json(result)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )

}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAuth
}