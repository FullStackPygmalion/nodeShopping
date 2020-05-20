/* Express Configuration */

const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const errorHandler = require('errorhandler')

module.exports = (app) => {
  const env = app.get('env')


app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())

if (env === 'development' || env === 'test') app.use(errorHandler())

}

