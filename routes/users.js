const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
})

//Creating one
router.post('/', async (req, res, next) => {
    User.findOne({userEmail: req.body.userEmail}).exec()
    .then(user => {
        console.log(user);
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
                    // try {
                    //     const newUser = user.save()
                    //     res.status(201).json(newUser)
                    // } catch(err) {
                    //     res.status(400).json(err.message)
                    // }
                }
            })   
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
    
})
// Updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.userName = req.body.name
    }
    if (req.body.email != null) {
        res.user.userEmail = req.body.email
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.status(200).json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Logging in

// In progress

// Function used to find user in database and to pass one to routes
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}


module.exports = router;