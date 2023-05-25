import pool from './config/pool.js'

let db = {}

/* ----- Users ----- */

db.getAllUsers = async () => {
    const [rows] = await pool.query('SELECT userId, firstName, lastName, email FROM Users')
    return rows
}

db.getAdminUsers = async () => {
    const [rows] = await pool.query('SELECT Users.userId FROM Users INNER JOIN UsersWithRoles ON Users.userId = UsersWithRoles.userId WHERE roleId = 3000')
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

db.deleteUsersWithRoles = async (userId) => {
    const [result] = await pool.query(`DELETE FROM UsersWithRoles WHERE userId = ?`, [userId])
    return result
}

db.deleteUser = async (userId) => {
    const [result] = await pool.query(`DELETE FROM Users WHERE userId = ?`, [userId])
    return result
}

db.updateUser = async (userId, firstName, lastName, email) => {
    const [row] = await pool.query(`UPDATE Users SET firstName = ?, lastName = ?, email = ? WHERE userId = ?`, [firstName, lastName, email, userId])
    return row
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

db.getStationByUserId = async (userId) => {
    const [row] = await pool.query('SELECT * FROM Stations WHERE userId = ?', [userId])
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
/* ----- Computors ----- */

db.getComputors = async () => {
    const [rows] = await pool.query(`SELECT * FROM Computors`)
    return rows
}

db.getComputor = async (computorId) => {
    const [row] = await pool.query(`SELECT * FROM Computors WHERE computorId = ?`, [computorId])
    return row[0]
}

db.getActiveComputors = async () => {
    const [rows] = await pool.query('SELECT * FROM Computors LEFT JOIN Stations ON Computors.computorId = Stations.computorId WHERE Stations.computorId IS NOT NULL')
    return rows
}

db.getInActiveComputors = async () => {
    const [rows] = await pool.query('SELECT Computors.computorId, serialNr, type, Computors.status FROM Computors LEFT JOIN Stations ON Computors.computorId = Stations.computorId WHERE Stations.computorId IS NULL')
    return rows
}

db.addComputor = async (serialNr, type, status) => {
    const [result] = await pool.query(`INSERT INTO Computors (serialNr, type, status) VALUES (?,?,?)`, [serialNr, type, status])
    return result.insertId
}

db.getComputorFromStation = async (stationId) => {
    const [row] = await pool.query(`SELECT computorId FROM Stations WHERE stationId = ?`, [stationId])
    return row[0]
}

db.removeComputorFromStation = async (stationId) => {
    const [result] = await pool.query(`UPDATE Stations SET computorId = ? WHERE stationId = ?`, [null, stationId])
    return result
}

db.removeComputorFromStationByComputorId = async (computorId) => {
    const [result] = await pool.query(`UPDATE Stations SET computorId = null WHERE computorId = ?`, [computorId])
    return result
}

db.moveComputorToStation = async (computorId, stationId) => {
    const [result] = await pool.query(`UPDATE Stations SET computorId = ? WHERE stationId = ?`, [computorId, stationId])
    return result
}

db.deleteComputor = async (computorId) => {
    const [result] = await pool.query(`DELETE FROM Computors WHERE computorId = ?`, [computorId])
    return result
}

db.updateComputor = async (computorId, serialNr, type, status) => {
    const [result] = await pool.query(`UPDATE Computors SET serialNr = ?, type = ?, status = ? WHERE computorId = ?`, [serialNr, type, status, computorId])
    return result
}

/* --x-- Computors --x-- */
/* ----- UserActions ----- */

db.getUserFromStation = async (stationId) => {
    const [row] = await pool.query(`SELECT userId FROM Stations WHERE stationId = ?`, [stationId])
    return row[0]
}

db.removeUserFromStation = async (stationId) => {
    const [result] = await pool.query(`UPDATE Stations SET userId = ? WHERE stationId = ?`, [null, stationId])
    return result
}

db.removeUserFromStationByUserId = async (userId) => {
    const [result] = await pool.query(`UPDATE Stations SET userId = NULL WHERE userId = ?`, [userId])
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