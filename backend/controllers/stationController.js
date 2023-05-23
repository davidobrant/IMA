import db from "../database.js"

const stationController = {}

stationController.getStations = async (req, res) => {
    try {
        const stations = await db.getAllStations()
        res.send(stations)
    } catch (error) {
        res.json({ message: "Something went wrong..."})
    }
}

stationController.getStationById = async (req, res) => {
    const stationId = Number(req.params.stationId)
    try {
        const station = await db.getStationById(stationId)
        res.send(station)
    } catch (error) {
        res.json({ message: "Something went wrong..."})
    }
}

stationController.updateStation = async (req, res) => {
    const stationId = Number(req.params.stationId)
    try {
        const station = await db.updateStation(stationId)
        res.send(station)
    } catch (error) {
        res.json({ message: "Something went wrong..."})
    }
}

export default stationController