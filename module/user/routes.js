const express = require('express')
const router = express.Router()
const { all, findById, remove, save, verifyUser, verifyPass } = require('./controller')

router.get('/', all)
router.get('/:id', findById)
router.post('/login', verifyUser)
router.post('/verifyPass', verifyPass)
router.post('/create', save)
router.put('/:id', save)
router.delete('/:id', remove)

module.exports = router
