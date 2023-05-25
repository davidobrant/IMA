import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const auth = (req, res, next) => {
    const token = req.cookies.IMA_token
    if(!token) return res.sendStatus(401)
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = data.userId
        req.email = data.email
        req.roles = data.roles
        return next()
    }
    catch (err) {
        return res.status(401).json(err)
    }
}

const authTeamLeader = (req, res, next) => {
    const token = req.cookies.IMA_token
    if(!token) return res.sendStatus(401)
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!data.roles.includes('TEAMLEADER')) {
            return res.status(403).json({message: "Need teamleader access"})
        } 
        req.userId = data.userId
        req.email = data.email
        req.roles = data.roles
        return next()
    }
    catch (err) {
        return res.status(401).json(err)
    }
}


const authAdmin = (req, res, next) => {
    const token = req.cookies.IMA_token
    if(!token) return res.sendStatus(401)
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!data.roles.includes('ADMIN')) {
            return res.status(403).json({message: "Need admin access"})
        } 
        req.userId = data.userId
        req.email = data.email
        req.roles = data.roles
        return next()
    }
    catch (err) {
        return res.status(401).json(err)
    }

}

export { auth, authTeamLeader, authAdmin }