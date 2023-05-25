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

actionsController.moveComputorFromStation = async (req, res) => {
    try {
        const { computorId, fromStation, toStation } = req.body
        if(!computorId || !fromStation || !toStation) {
            res.sendStatus(400).json('Something is missing')
        }
        const current = await db.getComputorFromStation(toStation)
        await db.removeComputorFromStation(fromStation)
        await db.moveComputorToStation(computorId, toStation)
        await db.moveComputorToStation(current.computorId, fromStation)
        res.status(200).json('Computor moved, successfully')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

actionsController.moveComputorFromService = async (req, res) => {
    try {
        const { computorId, toStation } = req.body
        if(!computorId || !toStation) {
            res.sendStatus(400).json('Something is missing')
        }
        await db.moveComputorToStation(computorId, toStation)
        res.status(200).json('Computor moved, successfully')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

actionsController.moveComputorToService = async (req, res) => {
    try {
        const { fromStation } = req.body
        if(!fromStation) {
            res.status(400).json('Missing station ID')
        }
        await db.removeComputorFromStation(fromStation)
        res.status(200).json('Computor moved to Service')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

export default actionsController