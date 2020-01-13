const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    date: {
        type: Date,
        required: true
    },
    author: {
        type: JSON,
        required: true
    },
    content: {
        type: String,
        max: 1000,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)