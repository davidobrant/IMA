import db from "../database.js"

let profileController = {}

profileController.getProfile = async (req, res) => {
    const userId = req.userId
    const user = await db.getUserById(Number(userId))
    const roles = await db.getUserRoles(Number(userId))
    const payload = {
        ...user, 
        roles: roles.map(role => role.rolename)
    }
    res.status(200).json(payload)
}

export default profileController