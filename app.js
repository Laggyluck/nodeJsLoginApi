require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

//connecting to database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//checking connection
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Databse'))

app.use(express.json())

app.use('/posts', postsRouter)
app.use('/users', usersRouter)


module.exports = app