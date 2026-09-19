import dotenv from 'dotenv'
import { connectDB, disconnectDB } from './src/config/db.js'
import { Product } from './src/models/Product.js'
import { products } from '../client/src/data/products.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grandeur'

async function seed() {
  await connectDB(MONGO_URI)

  const docs = products.map((p) => ({
    name: p.name,
    slug: p.slug,
    legacyId: p.id,
    category: p.category,
    description: p.description,
    price: p.price,
    image: p.image,
    detailImages: p.detailImages || [],
    sizes: p.sizes || [],
    colors: p.colors || [],
    stock: p.stock,
    featured: p.featured,
    details: p.details,
  }))

  const bulk = docs.map((doc) => ({
    updateOne: {
      filter: { slug: doc.slug },
      update: { $set: doc },
      upsert: true,
    },
  }))

  const result = await Product.bulkWrite(bulk)

  console.log(`Seeded ${result.upsertedCount} new products, updated ${result.modifiedCount}.`)

  await disconnectDB()
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})