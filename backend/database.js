import pool from './config/pool.js'

let db = {}

/* ----- Users ----- */

db.getAllUsers = async () => {
    const [rows] = await pool.query('SELECT userId, firstName, lastName, email FROM Users')
    return rows
}

db.getUserById = async (userId) => {
    const [row] = await pool.query(`SELECT userId, firstName, lastName, email FROM Users WHERE userId = ?`, [userId])
    return row[0]
}

db.getUserByEmail = async (email) => {
    const [row] = await pool.query(`SELECT userId, firstName, lastName, email, password FROM Users WHERE email = ?`, [email])
    return row[0]
}

db.createUser = async (firstName, lastName, email, password) => {
    const [result] = await pool.query(`
    INSERT INTO Users (firstName, lastName, email, password) 
    VALUES (?,?,?,?)
    `, [firstName, lastName, email, password])
    const userId = result.insertId
    return db.getUserById(userId)
}

db.getActiveUsers = async () => {
    const [rows] = await pool.query('SELECT stationId, Users.userId, firstName, lastName, email, computorId, Stations.status FROM Users INNER JOIN Stations ON Stations.userId = Users.userId;')
    return rows
}

db.getInactiveUsers = async () => {
    const [rows] = await pool.query('SELECT Users.userId, firstName, lastName, email FROM Users LEFT JOIN Stations ON Stations.userId = Users.userId WHERE Stations.stationId IS NULL')
    return rows
}

/* --x-- Users --x-- */
/* ----- Roles ----- */

db.setUserRole = async (userId, roleId) => {
    const [result] = await pool.query(`
    INSERT INTO UsersWithRoles (userId, roleId) VALUES (?,?)`,
    [userId, roleId])
    return result
}

db.getUserRoles = async (userId) => {
    const [result] = await pool.query(`
    SELECT rolename FROM UsersWithRoles INNER JOIN Roles ON UsersWithRoles.roleId = Roles.roleId WHERE userId = ?`,
    [userId])
    return result
}

db.removeUserRole = async (userId, roleId) => {
    const [result] = pool.query(`
    DELETE FROM UsersWithRoles WHERE userId = ? AND roleId = ?`,
    [userId, roleId])
    return result
}

/* --x-- Roles --x-- */
/* ----- Stations ----- */

db.getAllStations = async () => {
    const [rows] = await pool.query('SELECT * FROM Stations')
    return rows
}

db.getStationById = async (stationId) => {
    const [row] = await pool.query('SELECT * FROM Stations WHERE stationId = ?', [stationId])
    return row[0]
}

db.updateStation = async (stationId) => {
    const [rows] = await pool.query('SELECT * FROM Stations WHERE stationId = ?', [stationId])
    return rows
}

db.getStationsWithUsers = async () => {
    const [rows] = await pool.query('SELECT stationId, userId FROM StationsWithUsers')
    return rows
}

/* --x-- Stations --x-- */
/* ----- UserActions ----- */

db.getUserFromStation = async (stationId) => {
    const [row] = await pool.query(`SELECT userId FROM Stations WHERE stationId = ?`, [stationId])
    return row[0]
}

db.removeUserFromStation = async (stationId) => {
    const [result] = await pool.query(`UPDATE Stations SET userId = ? WHERE stationId = ?`, [null, stationId])
    return result
}

db.moveUserToStation = async (userId, stationId) => {
    const [result] = await pool.query(`UPDATE Stations SET userId = ? WHERE stationId = ?`, [userId, stationId])
    return result
}

/* --x-- UserActions --x-- */
/* ----- StationActions ----- */



/* --x-- StationActions --x-- */

export default db