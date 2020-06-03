/* Routes for product */

const { Router } = require('express')
const controller = require('./product.controller')
const router = new Router()

router.post('/', controller.create)
router.get('/', controller.showAll)
router.get('/:id', controller.showSingle)
router.put('/:id', controller.update)
router.delete('/:id', controller.deleteProduct)


module.exports = router
