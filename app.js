/* Main application */

const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const expressConfig = require('./config/express')
const routeConfig = require('./routes.js')
const config = require('./config/environment')

// Setup server
const app = express()


const server = http.createServer(app)

expressConfig(app)
routeConfig(app)


// Start server

function startServer() {
  app.shopping = server.listen(config.port, config.ip, () =>
    console.log(`Servidor corriendo en puerto: ${config.port}`)
  )
}

startServer()


module.export = app
