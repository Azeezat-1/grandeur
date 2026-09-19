import mongoose from 'mongoose'

export function notFound(req, res, next) {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found.` })
}

export function errorHandler(err, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(' ')
    return res.status(400).json({ message })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid identifier provided.' })
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'A record with that value already exists.' })
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON payload.' })
  }

  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong.' })
}

export class AppError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.status = status
  }
}