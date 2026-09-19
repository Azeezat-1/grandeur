import mongoose from 'mongoose'

const trainingApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    program: { type: String, trim: true, default: 'Fashion Design & Tailoring' },
    experience: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, maxlength: 5000, default: '' },
  },
  { timestamps: true, toJSON: { versionKey: false } },
)

export const TrainingApplication = mongoose.model('TrainingApplication', trainingApplicationSchema)