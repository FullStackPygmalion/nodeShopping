/* HelloWord EndPoint */

const { Router } = require('express')
const controller = require('./helloWorld.controller')

const router = new Router()

router.get('/', controller.index)

module.exports = router
