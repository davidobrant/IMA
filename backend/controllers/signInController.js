import db from "../database.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const signInController = {}

const cookieOptions = {
    // httpOnly: true, 
    expiresIn: '15m',
    sameSite: 'strict',
    secure: false,
}

signInController.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password) return res.sendStatus(400)
        const user = await db.getUserByEmail(email)
        if(!user) return res.status(400).json('Invalid username or password')
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(400).json('Invalid username or password')
        const roles = await db.getUserRoles(Number(user.userId))
        const token = jwt.sign({
            userId: user.userId,
            email: user.email, 
            roles: roles.map((role) => role.rolename)
        }, process.env.ACCESS_TOKEN_SECRET) 
        const userData = {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: roles.map((role) => role.rolename)
        }
        res.status(200)
            .cookie('IMA_token', token, cookieOptions)
            .cookie('IMA_userId', user.userId, cookieOptions)
            .json(userData)
    }
    catch (err) {
        res.status(400).json({ message: err})
    }
}

signInController.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json("Need all fields...")
        } 
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await db.createUser(firstName, lastName, email, hashedPassword)
        
        await db.setUserRole(Number(user.userId), 1000)
        const roles = await db.getUserRoles(user.userId)
        const token = jwt.sign({
            userId: user.userId,
            email: email, 
            roles: roles.map((role) => role.rolename)
        }, process.env.ACCESS_TOKEN_SECRET) 
        const userData = {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: roles.map((role) => role.rolename)
        }
        res.status(200)
            .cookie('IMA_token', token, cookieOptions)
            .cookie('IMA_userId', user.userId, cookieOptions)
            .json(userData)
    } catch (err) {
        res.status(400).json({ message: err})
    }
}

signInController.logout = async (req, res) => {
    try {
        res.status(200)
            .clearCookie('IMA_token')
            .clearCookie('IMA_userId')
            .json({ message: "Logged out"})
    }
    catch (err) {
        res.sendStatus(400)
    }
}

export default signInController