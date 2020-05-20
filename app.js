/* Main application */

const express = require('express')
const http = require('http')

// Setup server
const app = express()

const server = http.createServer(app)

const config = {
  port: 8080,
  ip: '127.0.0.1'
}

// Start server

function startServer() {
  app.shopping = server.listen(config.port, config.ip, () =>
    console.log(`Servidor corriendo en puerto: ${config.port}`)
  )
}

startServer()


module.export = app
