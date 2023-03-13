import { Router } from 'express'

import { login, logout, refreshToken, check, register } from '../controllers/SessionController.js'

const router = Router()

router.post('/', login)
router.delete('/', logout)
router.post('/register', register)
router.post('/refresh_token', refreshToken)
router.get('/check', check)

export default router
