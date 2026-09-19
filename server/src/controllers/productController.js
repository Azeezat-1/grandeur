import { Product } from '../models/Product.js'

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const mapProduct = (doc) => {
  const { legacyId, _id, __v, ...rest } = doc
  return { ...rest, id: legacyId }
}

export async function getProducts(req, res, next) {
  try {
    const { category, search, sort } = req.query

    const query = { active: true }
    if (category && category !== 'all') query.category = category
    if (search && search.trim()) {
      query.name = { $regex: escapeRegex(search.trim()), $options: 'i' }
    }

    let sortOpts = { createdAt: 1 }
    if (sort === 'price-low') sortOpts = { price: 1 }
    else if (sort === 'price-high') sortOpts = { price: -1 }
    else if (sort === 'newest') sortOpts = { createdAt: -1 }
    else if (sort === 'name') sortOpts = { name: 1 }

    const products = await Product.find(query).sort(sortOpts).lean()
    res.json({
      count: products.length,
      products: products.map(mapProduct),
    })
  } catch (err) {
    next(err)
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    const product = await Product.findOne({ slug: req.params.slug, active: true }).lean()
    if (!product) return res.status(404).json({ message: 'Product not found.' })
    res.json({ product: mapProduct(product) })
  } catch (err) {
    next(err)
  }
}