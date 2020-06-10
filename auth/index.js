/* Auth configuration strategies */

const express = require('express')

const User = require('../api/user/user.model')
const authLocal = require('./local/passport')
const configPassportLocal = require('./local')

// Passport configuration
authLocal.setup(User)

const router = express.Router()

router.use('/local', configPassportLocal)

module.exports = router