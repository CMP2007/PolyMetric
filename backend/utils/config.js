import 'dotenv/config'

const PORT = process.env.PORT || 3001
let MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_URI
} else {
  throw new Error('NODE_ENV no está definido. Por seguridad, la conexión se ha detenido.')
}

export default { MONGODB_URI, PORT }
