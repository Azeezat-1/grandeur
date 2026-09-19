import { TrainingApplication } from '../models/TrainingApplication.js'
import { AppError } from '../middleware/error.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\s-]{7,20}$/
const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0

export async function createTrainingApplication(req, res, next) {
  try {
    const { fullName, email, phone, program, experience, message } = req.body || {}

    if (!isNonEmpty(fullName)) throw new AppError('Full name is required.')
    if (!isNonEmpty(email) || !EMAIL_PATTERN.test(email)) throw new AppError('A valid email address is required.')
    if (!isNonEmpty(phone) || !PHONE_PATTERN.test(phone)) throw new AppError('A valid phone number is required.')

    const application = await TrainingApplication.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      program: isNonEmpty(program) ? program.trim() : 'Fashion Design & Tailoring',
      experience: isNonEmpty(experience) ? experience.trim() : '',
      message: isNonEmpty(message) ? message.trim() : '',
    })

    res.status(201).json({ message: 'Application received — we will be in touch.', application })
  } catch (err) {
    next(err)
  }
}