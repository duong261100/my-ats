import { Router } from 'express'
import { getResumes, saveResume, loadResume } from '../controllers/ResumeController.js'

const router = Router()

router.get('/:id', getResumes)
router.get('/:id/load-content', loadResume)
router.post('/:id/save-content', saveResume)

export default router
