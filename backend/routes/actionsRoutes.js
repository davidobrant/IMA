import express from 'express'
import actionsController from '../controllers/actionsController.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.put('/users/move/fromstation', auth, actionsController.moveUserToStation)
router.put('/users/move/frombench', auth, actionsController.moveUserToStationFromBench)
router.put('/users/move/bench', auth, actionsController.benchUser)
router.put('/computors/move/fromstation', auth, actionsController.moveComputorFromStation)
router.put('/computors/move/fromservice', auth, actionsController.moveComputorFromService)
router.put('/computors/move/toservice', auth, actionsController.moveComputorToService)

export default router