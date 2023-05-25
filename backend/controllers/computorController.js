import db from "../database.js"

let computorController = {}

computorController.getComputors = async (req, res) => {
    try {
        const computors = await db.getComputors()
        res.send(computors)
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

computorController.getActiveComputors = async (req, res) => {
    try {
        const computors = await db.getActiveComputors()
        res.send(computors)
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

computorController.getInActiveComputors = async (req, res) => {
    try {
        const computors = await db.getInActiveComputors()
        res.send(computors)
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

computorController.getComputor = async (req, res) => {
    try {
        const computorId = req.params.computorId
        if(!computorId) {
            res.sendStatus(400).json('Something is missing')
        }   
        const computor = await db.getComputor(computorId)
        res.send(computor)
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

computorController.addComputor = async (req, res) => {
    try {
        const { serialNr, type, status } = req.body
        if(!serialNr || !type || !status) {
            res.sendStatus(400).json('Something is missing')
        } 
        await db.addComputor(serialNr, type, status)
        res.status(201).json('Computor added')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

computorController.updateComputor = async (req, res) => {
    try {
        const { computorId, serialNr, type, status } = req.body
        if(!computorId || !serialNr || !type || !status) {
            return res.status(400).json('Something is missing')
        } 
        await db.updateComputor(computorId, serialNr, type, status)
        res.status(201).json('Computor updated')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

computorController.deleteComputor = async (req, res) => {
    try {
        const computorId = Number(req.params.computorId)
        if(!computorId) {
            return res.status(400).json('Not found...')
        }
        await db.removeComputorFromStationByComputorId(computorId)
        await db.deleteComputor(computorId)
        res.status(200).json('Computor deleted')
    } catch (error) {
        res.status(400).json('Something went wrong')
    }
}

export default computorController