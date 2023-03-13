import { Router } from 'express'
import { getAllLevels, createLevel } from '../controllers/LevelController.js'

const router = Router()

router.get('/', getAllLevels)
router.post('/create', createLevel)

export default router
