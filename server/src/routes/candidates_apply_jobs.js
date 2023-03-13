import { Router } from 'express'
import {
  getAllCandidatesApplyJobs,
  getCandidatesApplyJobByJobId,
  addCandidateApplyJob,
  moveCandidateToStep,
  deleteCandidateApplyJob,
  getCandidatesApplyJobByCandidateId,
  checkApply,
  updateCaj,
} from '../controllers/CandidatesApplyJobsController.js'

const router = Router()

router.get('/', getAllCandidatesApplyJobs)
router.get('/candidates/:candidateId', getCandidatesApplyJobByCandidateId)
router.post('/', addCandidateApplyJob)
router.put('/update', updateCaj)
router.put('/', moveCandidateToStep)
router.delete('/:job_id/:candidate_id', deleteCandidateApplyJob)
router.get('/:id', getCandidatesApplyJobByJobId)
router.get('/check/:candidateId', checkApply)

export default router
