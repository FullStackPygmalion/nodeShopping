/* User Routes */

const { Router } = require('express')
const controller = require('./user.controller')
const auth = require('./../../auth/auth.service');
const router = new Router()

router.post('/', controller.create)
    // router.get('/', controller.showAll)
router.get('/', auth.isAuthenticated(), controller.showAll);
/* Home work */
// router.delete('/:id', auth.hasRole('admin'), controller.delete);
// router.update('/:id', auth.hasRole('admin'), controller.update);


module.exports = router
