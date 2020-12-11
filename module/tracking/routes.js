const express = require('express')
const router = express.Router()
const { all, findById, remove, save, createOrder, updateOrder, track } = require('./controller')

router.get('/', all)
router.get('/:id', findById)
router.post('/', save)
router.post('/createOrder', createOrder)
router.post('/updateOrder', updateOrder)
router.post('/track', track)
router.put('/:id', save)
router.delete('/:id', remove)

module.exports = router
