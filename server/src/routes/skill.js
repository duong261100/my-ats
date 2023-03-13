import { Router } from 'express'
import { getAllSkills, createSkill } from '../controllers/SkillController.js'

const router = Router()

router.get('/', getAllSkills)
router.post('/create', createSkill)

export default router
