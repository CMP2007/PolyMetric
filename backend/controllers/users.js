import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

const usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'la contraseña es requerida y debe tener al menos 3 dígitos',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

export default usersRouter
