import { Contact } from '../models/Contact.js'
import { AppError } from '../middleware/error.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\s-]{7,20}$/
const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0

export async function createContactMessage(req, res, next) {
  try {
    const { name, email, phone, message } = req.body || {}

    if (!isNonEmpty(name)) throw new AppError('Name is required.')
    if (!isNonEmpty(email) || !EMAIL_PATTERN.test(email)) throw new AppError('A valid email address is required.')
    if (!isNonEmpty(phone) || !PHONE_PATTERN.test(phone)) throw new AppError('A valid phone number is required.')
    if (!isNonEmpty(message)) throw new AppError('Message is required.')

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
    })

    res.status(201).json({ message: 'Thank you — we have received your message.', contact })
  } catch (err) {
    next(err)
  }
}