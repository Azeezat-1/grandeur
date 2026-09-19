import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true, toJSON: { versionKey: false } },
)

export const Contact = mongoose.model('Contact', contactSchema)