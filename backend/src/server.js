
import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'

import kucingRoutes from './routes/kucingRoutes.js'
import shelterRoutes from './routes/shelterRoutes.js'
import adopsiRoutes from './routes/adopsiRoutes.js'

dotenv.config()

const fastify = Fastify({ logger: true })

await fastify.register(cors, {
  origin: 'http://localhost:5173',
})

fastify.register(kucingRoutes, { prefix: '/api' })
fastify.register(shelterRoutes, { prefix: '/api' })
fastify.register(adopsiRoutes, { prefix: '/api' })

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT })
    console.log('Backend berjalan di http://localhost:' + process.env.PORT)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
