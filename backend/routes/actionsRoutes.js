import express from 'express'
import actionsController from '../controllers/actionsController.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.put('/users/move/fromstation', auth, actionsController.moveUserToStation)
router.put('/users/move/frombench', auth, actionsController.moveUserToStationFromBench)
router.put('/users/move/bench', auth, actionsController.benchUser)

export default router