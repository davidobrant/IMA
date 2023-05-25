import db from "../database.js"
import bcrypt from 'bcrypt'

const userController = {}

userController.getUsers = async (req, res) => {
    try {
        const users = await db.getAllUsers()
        res.send(users)
    } catch (error) {
        res.json({ message: "Something went wrong..."})
    }
}

userController.getAdminUsers = async (req, res) => {
    try {
        const users = await db.getAdminUsers()
        res.send(users)
    } catch (error) {
        res.json({ message: "Something went wrong..."})
    }
}

userController.toggleAdmin = async (req, res) => {
    try {
        const { userId } = req.body
        const roles = await db.getUserRoles(userId)
        const isAdmin = roles.some(r => r.rolename === "ADMIN")
        if(!isAdmin) {
            await db.setUserRole(userId, 3000)
        } else {
            await db.removeUserRole(userId, 3000)
        }
        res.status(200).json('Roles changed')
    } catch (error) {
        res.json({ message: "Something went wrong..."})
    }
}

userController.getUserById = async (req, res) => {
    const id = Number(req.params.id)
    const user = await db.getUserById(id)
    res.send(user)
}

userController.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json("Need all fields...")
        } 
        const hashedPassword = await bcrypt.hash(password, 10)
        const { userId } = await db.createUser(firstName, lastName, email, hashedPassword)
        await db.setUserRole(Number(userId), 1000)
        const roles = await db.getUserRoles(userId)
        const userData = {
            userId: userId,
            username: username,
            email: email,
            roles: roles.map((role) => role.rolename)
        }
        res.status(201).json(userData)
    } catch (error) {
        res.sendStatus(400)
    }
}

userController.addUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json("Need all fields...")
        } 
        const hashedPassword = await bcrypt.hash(password, 10)
        const { userId } = await db.createUser(firstName, lastName, email, hashedPassword)
        await db.setUserRole(Number(userId), 1000)
        res.status(201).json('User created')
    } catch (error) {
        res.sendStatus(400)
    }
}

userController.updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.userId)
        const { userId: userID, firstName, lastName, email } = req.body
        if(!userId || !firstName || !lastName || !email || !userID) {
            return res.status(400).json('Somethings missing...')
        }
        const match = await db.getUserByEmail(email)
        if(match.userId !== userId) {
            return res.status(405).json('Email already exists...')
        }
        const user = await db.updateUser(userId, firstName, lastName, email)
        res.status(201).json(user)
    } catch (error) {
        return res.status(400).json("'Update didn't take")
    }
}

userController.deleteUser = async (req, res) => {
    const userId = req.params.userId
    try {
        await db.removeUserFromStationByUserId(userId)
        await db.deleteUsersWithRoles(userId)
        await db.deleteUser(userId)
        res.status(200).json('User deleted')
    } catch (err) {
        res.sendStatus(400)
    }
}

userController.getActiveUsers = async (req, res) => {
    const users = await db.getActiveUsers()
    res.send(users)
}

userController.getInactiveUsers = async (req, res) => {
    const users = await db.getInactiveUsers()
    res.send(users)
}

export default userController