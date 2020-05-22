/* Routes for product */

const { Router } = require('express')
const controller = require('./product.controller')
const router = new Router()

router.post('/', controller.create)
router.get('/', controller.index)
router.get('/:id', controller.show)

module.exports = router
