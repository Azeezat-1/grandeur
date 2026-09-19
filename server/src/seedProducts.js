import { Product } from './models/Product.js'
import { products } from '../../client/src/data/products.js'

export async function seedProducts() {
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
  return result
}