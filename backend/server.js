import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import signInRoutes from './routes/signInRoutes.js'
import stationRoutes from './routes/stationRoutes.js'
import computorRoutes from './routes/computorRoutes.js'
import actionsRoutes from './routes/actionsRoutes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000;

const BASE_URL = `http://localhost:${PORT}`
const allowedOrigins = ['http://localhost:3000']

app.use(cors({ credentials: true, origin: allowedOrigins }))  
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/signin', signInRoutes)
app.use('/api/stations', stationRoutes)
app.use('/api/computors', computorRoutes)
app.use('/api/actions', actionsRoutes)

app.listen(PORT, () => console.log(`[${BASE_URL}] Server 's up 'n running.. ;)`))