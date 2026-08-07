const path = require('path')
const config = require('./utils/config')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// backend/app.js
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor conectado con éxito' })
})

app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(middleware.requestLogger)
}

if (process.env.NODE_ENV === 'test') {
  // const testingRouter = require('./controllers/testing')
  // app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))

  app.get(/^(?!\/api\/).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
