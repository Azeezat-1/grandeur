import dotenv from 'dotenv'
import { createApp } from './app.js'
import { connectDB } from './config/db.js'
import { Product } from './models/Product.js'
import { seedProducts } from './seedProducts.js'

dotenv.config()

const PORT = Number(process.env.PORT) || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grandeur'

async function ensureCatalog() {
  const count = await Product.countDocuments()
  if (count === 0) {
    const result = await seedProducts()
    console.log(`Catalog empty — seeded ${result.upsertedCount} products.`)
  }
}

async function main() {
  await connectDB(MONGO_URI)
  await ensureCatalog()
  const app = createApp()
  app.listen(PORT, () => {
    console.log(`Grandeur API running on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})