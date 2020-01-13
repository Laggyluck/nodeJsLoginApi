const Post = require('../models/post')
const mongoose = require('mongoose')
const authenticateToken = require('../middleware/authenticateToken')
const middleware = require('../middleware/getPost')


// Getting all
module.exports.postGetAll =(authenticateToken, async (req, res) => {
    try {
        const author = req.user.userName
        const posts = await Post.find({author: author})
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting one
module.exports.postGetOne = (middleware.getPost, async (req, res) => {
    res.json(res.user)
})

// Creating one
module.exports.postCreate = (authenticateToken, (req, res) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        date: new Date().toLocaleString({timezone: "Europe/Warsaw"}),
        author: req.user.userName,
        content: req.body.content
    })
    console.log(post)
    post.save()
    .then(result => {
        res.status(200).json({
            message: "Added new post",
            createdPost: result
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

// Updating one
module.exports.postUpdate = (authenticateToken, middleware.getPost, async (req, res) => {
    if (req.user.userName != res.post.author) {
        res.status(401).json({message: "Authentication failed"})
    } else {
        res.post.content = req.body.content
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Deleting one
module.exports.postDelete = (authenticateToken, middleware.getPost, async (req, res) => {
    if (req.user.userName != res.post.author) {
        res.status(401).json({message: "Authentication failed"})
    } else {
        try {
            await res.post.remove()
            res.status(200).json({ message: 'Deleted post' })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
})