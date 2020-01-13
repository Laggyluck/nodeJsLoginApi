const express = require('express')
const router = express.Router()
const controllers = require('../controllers/postsController')
const middleware = require('../middleware/getPost')
const authenticateToken = require('../middleware/authenticateToken')


// Getting all
router.get('/',authenticateToken, controllers.postGetAll)

// Getting one
router.get('/:id', middleware.getPost, controllers.postGetOne)

// Creating one
router.post('/', authenticateToken, controllers.postCreate)
 
// Updating one
router.patch('/:id', authenticateToken, middleware.getPost, controllers.postUpdate)

// Deleting one
router.delete('/:id', authenticateToken, middleware.getPost, controllers.postDelete)

module.exports = router;