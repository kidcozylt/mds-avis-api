require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./routes/index')
const app = express()
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route)

const prisma = require('./lib/generated/prisma')

const server = app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})

const shutdown = async () => {
  await prisma.$disconnect()
  server.close(() => process.exit(0))
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)