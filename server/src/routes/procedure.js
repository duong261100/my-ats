import { Router } from 'express'
import { getAllProcedures, createProcedure, getProcedureById } from '../controllers/ProcedureController.js'

const router = Router()

router.get('/', getAllProcedures)
router.get('/:id', getProcedureById)
router.post('/', createProcedure)

export default router
