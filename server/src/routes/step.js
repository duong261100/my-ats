import { Router } from 'express'
import { getAllSteps, createStep } from '../controllers/StepController.js'

const router = Router()

router.get('/', getAllSteps)
router.post('/create', createStep)

export default router
