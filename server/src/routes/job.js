import { Router } from 'express'
import { getAllJobs, createJob, getJobById, searchJob } from '../controllers/JobController.js'

const router = Router()

router.get('/', getAllJobs)
router.get('/:id', getJobById)
router.post('/', createJob)
router.post('/search', searchJob)

export default router
