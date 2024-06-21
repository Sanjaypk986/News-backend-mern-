const express = require('express')
const { } = require('../controllers/userController')
const { getAllUsers } = require('../controllers/userController')
const { getUserById } = require('../controllers/userController')
const { addUser } = require('../controllers/userController')
const { updateUserById } = require('../controllers/userController')
const { deleteUserById } = require('../controllers/userController')
const router = express.Router()

router.get('/', getAllUsers)

router.get('/:userId', getUserById)

router.post('/', addUser)

router.patch('/:userId', updateUserById)

router.delete('/:userId', deleteUserById)

module.exports = router