import express from 'express'
import signInController from '../controllers/signInController.js'

const router = express.Router()

router.post('/login', signInController.login)
router.post('/register', signInController.register)
router.get('/logout', signInController.logout)

export default router