require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./routes/index')
const prisma = require('./lib/prisma')

const app = express()

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL 
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Bloqué par CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route)
 

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000
  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })

  const shutdown = async () => {
    await prisma.$disconnect()
    server.close(() => process.exit(0))
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}


module.exports = app