import path from 'path'
import { fileURLToPath } from 'url'
import config from './utils/config.js'
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './controllers/users.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const mongoUrl = config.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(middleware.requestLogger)
}

app.use('/api/users', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))

  app.get(/^(?!\/api\/).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
