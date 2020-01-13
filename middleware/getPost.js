const Post = require('../models/post')


// Function to find post in database and to pass one to routes
module.exports.getPost = async (req, res, next) => {
    let post
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.post = post
    next()
}