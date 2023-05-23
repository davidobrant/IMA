import express from 'express'
import profileController from '../controllers/profileController.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, profileController.getProfile)

export default router