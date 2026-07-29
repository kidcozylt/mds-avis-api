const { PrismaClient } = require('@prisma/client')

// On instancie PrismaClient en nommant la variable différemment du module importé
const prisma = new PrismaClient({
  log: ['warn', 'error'],
})

module.exports = prisma