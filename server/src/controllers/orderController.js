import { Order } from '../models/Order.js'
import { Product } from '../models/Product.js'
import { AppError } from '../middleware/error.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\s-]{7,20}$/

const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0

function validatePayload({ customer, address, items }) {
  if (!customer) throw new AppError('Customer information is required.')
  if (!isNonEmpty(customer.fullName)) throw new AppError('Full name is required.')
  if (!isNonEmpty(customer.email) || !EMAIL_PATTERN.test(customer.email)) {
    throw new AppError('A valid email address is required.')
  }
  if (!isNonEmpty(customer.phone) || !PHONE_PATTERN.test(customer.phone)) {
    throw new AppError('A valid phone number is required.')
  }

  if (!address) throw new AppError('Delivery address is required.')
  if (!isNonEmpty(address.address)) throw new AppError('Delivery address is required.')
  if (!isNonEmpty(address.city)) throw new AppError('City is required.')
  if (!isNonEmpty(address.state)) throw new AppError('State is required.')

  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError('Your order must contain at least one item.')
  }
}

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `GD-${stamp}${random}`
}

export async function createOrder(req, res, next) {
  try {
    const { customer, address, items } = req.body || {}

    validatePayload({ customer, address, items })

    const resolvedItems = []
    for (const raw of items) {
      const product = await Product.findOne({ legacyId: raw.product, active: true }).lean()
      if (!product) throw new AppError(`We no longer carry this item (${raw.product}). Please update your bag.`)
      if (raw.qty > product.stock) {
        throw new AppError(`Only ${product.stock} of "${product.name}" are available.`)
      }

      resolvedItems.push({
        product: product.legacyId,
        slug: product.slug,
        name: product.name,
        price: product.price,
        qty: raw.qty,
        size: isNonEmpty(raw.size) ? raw.size.trim() : '',
        color: isNonEmpty(raw.color) ? raw.color.trim() : '',
      })
    }

    const subtotal = resolvedItems.reduce((sum, item) => sum + item.price * item.qty, 0)

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
      },
      address: {
        address: address.address.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
        note: isNonEmpty(address.note) ? address.note.trim() : '',
      },
      items: resolvedItems,
      subtotal,
    })

    await Promise.all(
      resolvedItems.map((item) =>
        Product.updateOne({ legacyId: item.product }, { $inc: { stock: -item.qty } }),
      ),
    )

    res.status(201).json({ message: 'Order placed successfully.', order })
  } catch (err) {
    next(err)
  }
}

export async function listOrders(req, res, next) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100).lean()
    res.json({ count: orders.length, orders })
  } catch (err) {
    next(err)
  }
}