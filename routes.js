/* Main application routes */

// Import endopoints

const helloWorld = require('./api/helloworld')
const product = require('./api/product')
const user = require('./api/user')
const auth = require('./auth')

module.exports = (app) => {
  app.use('/api/helloworld', helloWorld)
  app.use('/api/product', product)
  app.use('/api/user', user)
  app.use('/auth', auth)
}
