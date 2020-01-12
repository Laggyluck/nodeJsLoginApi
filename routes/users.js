const express = require('express')
const router = express.Router()
const controllers = require('../controllers/usersController')
const middleware = require('../middleware/getUser')


// Getting all
router.get('/', controllers.userGetAll)

// Getting one
router.get('/:id',middleware.getUser, controllers.userGetOne)

// Creating one
router.post('/',controllers.userCreate)


// Updating one
router.patch('/:id', middleware.getUser, controllers.userUpdate)

// Deleting one
router.delete('/:id', middleware.getUser, controllers.userDelete)

// Logging in
router.post('/login', controllers.userLogIn)

module.exports = router;