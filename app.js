require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

//connecting to database
mongoose.connect("mongodb+srv://admin2:" + process.env.MONGO_PASS + "@test-lvzxm.mongodb.net/test?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true})
//checking connection
//const db = mongoose.connection
//db.on('error', (error) => console.error(error))
//db.once('open', () => console.log('Connected to Databse'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json())

app.use('/posts', postsRouter)
app.use('/users', usersRouter)


module.exports = app