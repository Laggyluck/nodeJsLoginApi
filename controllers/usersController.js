const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/getUser')

// Getting all
module.exports.userGetAll = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// Getting one
module.exports.userGetOne = (middleware.getUser, async (req, res) => {
    res.json(res.user)
})

// Creating one
module.exports.userCreate = async (req, res, next) => {
    User.findOne({userEmail: req.body.userEmail}).exec()
    .then(user => {
        if (user) {
            return res.status(409).json({message: "User already exists"})
        } else {
            User.findOne({userName: req.body.userName}).exec()
            .then(user => {
                if (user) {
                    return res.status(409).json({message: "User already exists"})
                } else {
                    bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                        if(err){
                            return res.status(500).json({error: err})
                        } else {
                            const user = new User ({
                                _id: new mongoose.Types.ObjectId(),
                                userName: req.body.userName,
                                userPassword: hash,
                                userEmail: req.body.userEmail
                            })
                            user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: "User has been created",
                                    createdUser: user
                                })
                            })
                            .catch(err => {
                                res.status(500).json({error: err})
                            })
                        }
                    })   
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })   
}

// Updating one
module.exports.userUpdate = (middleware.getUser, async (req, res) => {
    if (req.body.userName != null) {
        res.user.userName = req.body.userName
    }
    if (req.body.userEmail != null) {
        res.user.userEmail = req.body.userEmail
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Deleting one
module.exports.userDelete = (middleware.getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.status(200).json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Logging in
module.exports.userLogIn = (req, res, next) => {
    User.findOne({userEmail: req.body.userEmail}).exec()
    .then(user => {
        if (!user) {
            return res.status(401).json({message: "Authorization error"})
        }
        bcrypt.compare(req.body.userPassword, user.userPassword, (err, result) =>{
            if (err) {
                return res.status(401).json({message: "Authorization error"})
            }
            if (result) {
                const token = jwt.sign({
                    userEmail: user.userEmail,
                    userName: user.userName
                }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
                return res.status(200).json({
                    message: "User authorizated",
                    token: token
                })
            } else
            return res.status(401).json({message: "Authorization error"})
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}