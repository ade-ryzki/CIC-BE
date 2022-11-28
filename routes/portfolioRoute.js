const express = require("express")
const { verify } = require("jsonwebtoken")
const {getAllPortfolio, addNewPortfolio, updatePortfolio, deletePortfolio} = require('../controller/portfolioController')
const router = express.Router()
const upload = require('../helper/multer')
const verifyAuth = require("../helper/verifyAuth")

router.get('/', getAllPortfolio)
router.post('/', verifyAuth, upload.single('image'), addNewPortfolio)
router.patch('/:id',verifyAuth,upload.single('image'), updatePortfolio)
router.delete('/:id',verifyAuth, deletePortfolio)

module.exports = router