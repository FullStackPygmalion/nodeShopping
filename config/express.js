/* Express Configuration */

const session = require('express-session')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const errorHandler = require('errorhandler')
const config = require('./environment')

module.exports = (app) => {
  const env = app.get('env')


app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(methodOverride())


app.use(session({
    secret: config.secrets.session, 
    saveUninitialized: true,
    resave: false
}))

if (env === 'development' || env === 'test') app.use(errorHandler())

}

