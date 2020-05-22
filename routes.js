/* Main application routes */

// Import endopoints

const helloWorld = require('./api/helloworld')
const product = require('./api/product')

module.exports = (app) => {
  app.use('/api/helloworld', helloWorld)
  app.use('/api/product', product)
}
