/* Main application routes */

// Import endopoints

const helloWorld = require('./api/helloworld')

module.exports = (app) => {
  app.use('/api/helloworld', helloWorld)
}
