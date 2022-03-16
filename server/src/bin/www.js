#!/usr/bin/env node
import fs from 'fs'
import http from 'http'
import https from 'https'
import path from 'path'
import app from '../app'
import consola from 'consola'

// HTTP服务
const server = http.createServer(app)
const port = normalizePort(process.env.PORT || '3001')
app.set('port', port)
server.listen(port, consola.success(`HTTP server listening at http://localhost:${port}`))
server.on('error', onError)

// HTTPS服务
app.set('HTTPS_PORT', 11444)
const options = {
  key: fs.readFileSync(path.join(__dirname, '../../cert/lcxcsy.top.key')),
  cert: fs.readFileSync(path.join(__dirname, '../../cert/lcxcsy.top.pem'))
}
https.createServer(options, app)
  .listen(app.get('HTTPS_PORT'), () => {
    consola.success('HTTP server listening at http://localhost:11444');
  })


function normalizePort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      consola.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      consola.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}
