const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Authorization = require('../model/Authorization')
const { response } = require('express')

const authorization = new Authorization()

const login = (req, res) => {

    authorization.login( { username: req.body.username } ).then((result) => {
        if(bcrypt.compareSync(req.body.password, result[0].password)){
            const user = {
                username: result[0].username,
                userMail: result[0].user_mail,
                userId: result[0].user_id
            }
            const token = tokenGeneration(user)
            res.json({token})
        } else {
            res.json({message: "Usuario o contraseña invalidos"})
        }
    }).catch((error) => {
        res.json(error)
    })
    
    

}

const tokenGeneration = (user) => {
    return jwt.sign(user, process.env.SEED, {expiresIn: '5m'})
}

const passwordHash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const tokenVerify = (req, res, next) => {
    let token = req.get('Authorization')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = decoded.user
        next()
    })
}

module.exports = {
    login,
    tokenVerify
}