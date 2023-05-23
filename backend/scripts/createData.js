import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    multipleStatements: false
}).promise()

let init = {}

init.Users = async () => {
    const query = [
        ["Aaa", "Aaa", "aaa@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Bbb", "Bbb", "bbb@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Ccc", "Ccc", "ccc@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Ddd", "Ddd", "ddd@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Eee", "Eee", "eee@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Fff", "Fff", "fff@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Ggg", "Ggg", "ggg@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Hhh", "Hhh", "hhh@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Iii", "Iii", "iii@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Jjj", "Jjj", "jjj@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Kkk", "Kkk", "kkk@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Lll", "Lll", "lll@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Mmm", "Mmm", "mmm@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Nnn", "Nnn", "nnn@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Ooo", "Ooo", "ooo@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
        ["Ppp", "Ppp", "ppp@mail.com", "$2b$10$8w/IbeDd8.9JwX3N6Ambg.XFr.aBmy7YTmmAz16ElbCaxlhWmoDa."],
    ]
    await pool.query(`INSERT INTO Users (firstName, lastName, email, password) VALUES ?`, [query])
}

init.Roles = async () => {
    const query = [
        [1000, 'AGENT'],
        [2000, 'TEAMLEADER'],
        [3000, 'ADMIN'],
    ]
    await pool.query(`INSERT INTO Roles (roleId, rolename) VALUES ?`, [query])
}

init.UsersWithRoles = async () => {
    const query = [
        [1, 1000],
        [1, 2000],
        [1, 3000],
        [2, 1000],
        [2, 2000],
        [3, 1000],
        [3, 2000],
        [3, 3000],
        [4, 1000],
        [5, 1000],
        [6, 1000],
        [7, 1000],
        [8, 1000],
        [9, 1000],
    ]
    await pool.query(`INSERT INTO UsersWithRoles (userId, roleId) VALUES ?`, [query])
}

init.Stations = async () => {
    const query = [
        [4,     3,      "open"],
        [null,  null,   "open"],
        [null,  6,      "open"],
        [6,     7,      "open"],
        [12,    null,   "open"],
        [null,  1,      "open"],
        [10,    null,   "open"],
        [8,     null,   "open"],
        [1,     10,     "open"],
        [9,     null,   "open"],
        [16,    null,   "open"],
        [null,  null,   "open"],
        [13,    null,   "open"],
        [5,     5,      "open"],
        [9,    null,   "open"],
        [14,    null,   "open"],
        [null,  null,   "open"],
        [7,    null,   "open"],
        [2,    null,   "open"],
        [null,  null,   "open"],
        [17,    null,   "open"],
        [11,    null,   "open"],
        [15,    null,   "open"],
        [3,    null,   "open"],
    ]
    await pool.query(`INSERT INTO Stations (userId, computorId, status) VALUES ?`, [query])
}

init.StationsWithUsers = async () => {
    const query = [
        [1, 4],
        [2, 1],
        [3, 2],
        [4, 6],
        [5, 3],
        [6, 5],        
    ]
    await pool.query(`INSERT INTO StationsWithUsers (stationId, userId) VALUES ?`, [query])
}

const createData = async () => {
        await init.Users()
        await init.Roles()
        await init.UsersWithRoles()
        await init.Stations()
        await init.StationsWithUsers()
        console.log('--- DATA CREATED ---')
        process.exit(1)
}

createData()