import express from 'express'
import computorController from '../controllers/computorController.js'
import { auth, authAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, computorController.getComputors)
router.get('/active', auth, computorController.getActiveComputors)
router.get('/inactive', auth, computorController.getInActiveComputors)
router.get('/:computorId', auth, computorController.getComputor)
router.post('/', auth, computorController.addComputor)
router.put('/:computorId', auth, computorController.updateComputor)
router.delete('/delete/:computorId', authAdmin, computorController.deleteComputor)

export default router