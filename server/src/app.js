import express from 'express'
import cors from 'cors'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import contactRoutes from './routes/contact.js'
import trainingRoutes from './routes/training.js'
import { notFound, errorHandler } from './middleware/error.js'

export function createApp() {
  const app = express()

  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : null

  app.use(
    cors(
      allowedOrigins && allowedOrigins.length > 0
        ? { origin: allowedOrigins }
        : {},
    ),
  )
  app.use(express.json({ limit: '1mb' }))

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

  app.use('/api/products', productRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/contact', contactRoutes)
  app.use('/api/training', trainingRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}