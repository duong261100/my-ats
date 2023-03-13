import { Router } from 'express'
import { getAllStatus } from '../controllers/StatusController.js'

const router = Router()

router.get('/', getAllStatus)

export default router
