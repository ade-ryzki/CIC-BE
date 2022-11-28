const express = require("express")
const usersController = require('../controller/usersController')
const router = express.Router()

router.get('/', usersController.getAllUsers)
router.post('/', usersController.addNewUsers)
router.patch('/:id', usersController.updateUsers)
router.delete('/:id', usersController.deleteUsers)

module.exports = router