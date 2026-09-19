import { Router } from 'express'
import { createTrainingApplication } from '../controllers/trainingController.js'

const router = Router()

router.post('/apply', createTrainingApplication)

export default router