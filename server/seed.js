import dotenv from 'dotenv'
import { connectDB, disconnectDB } from './src/config/db.js'
import { seedProducts } from './src/seedProducts.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grandeur'

async function main() {
  await connectDB(MONGO_URI)
  const result = await seedProducts()
  console.log(`Seeded ${result.upsertedCount} new products, updated ${result.modifiedCount}.`)
  await disconnectDB()
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})