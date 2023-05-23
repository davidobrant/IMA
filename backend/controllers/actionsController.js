import db from "../database.js"

let actionsController = {}

actionsController.moveUserToStation = async (req, res) => {
    try {
        const { userId, fromStation, toStation } = req.body
        if(!userId || !fromStation || !toStation) {
            res.sendStatus(400).json('Something is missing')
        }   
        const current = await db.getUserFromStation(toStation)
        await db.removeUserFromStation(fromStation)
        await db.moveUserToStation(userId, toStation)
        await db.moveUserToStation(current.userId, fromStation)
        res.status(200).json('User moved, successfully')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

actionsController.moveUserToStationFromBench = async (req, res) => {
    try {
        const { userId, toStation } = req.body
        if(!userId || !toStation) {
            res.sendStatus(400).json('Something is missing')
        }   
        await db.moveUserToStation(userId, toStation)
        res.status(200).json('User moved, successfully')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

actionsController.benchUser = async (req, res) => {
    try {
        const { userId, stationId } = req.body
        if(!userId || !stationId) {
            res.sendStatus(400).json('Something is missing')
        }   
        await db.removeUserFromStation(stationId)
        res.status(200).json('User moved, successfully')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

export default actionsController