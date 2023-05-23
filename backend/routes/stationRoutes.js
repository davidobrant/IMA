import express from 'express'
import stationController from '../controllers/stationController.js'

const router = express.Router()

router.get('/', stationController.getStations)
router.get('/:stationId', stationController.getStationById)
router.put('/:stationId', stationController.updateStation)

export default router