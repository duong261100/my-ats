import { Router } from 'express'
import { getAllCandidates, createCandidate, getCandidateById } from '../controllers/CandidateController.js'

const router = Router()

router.get('/', getAllCandidates)
router.post('/', createCandidate)
router.get('/:id', getCandidateById)

export default router
