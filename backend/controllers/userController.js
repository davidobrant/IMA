import db from "../database.js"

const userController = {}

userController.getUsers = async (req, res) => {
    try {
        const users = await db.getAllUsers()
        res.send(users)
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
        const user = await db.createUser(firstName, lastName, email, hashedPassword)
        
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

userController.updateUser = async (req, res) => {
    const id = req.params.id
    const user = await db.getUserById(id)
    res.send(user)
}

userController.deleteUser = async (req, res) => {
    const id = req.params.id
    const user = await db.getUserById(id)
    res.send(user)
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