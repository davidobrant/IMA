import express from 'express'
import userController from '../controllers/userController.js'
import { authAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/active', userController.getActiveUsers)
router.get('/inactive', userController.getInactiveUsers)
router.get('/admins', userController.getAdminUsers)
router.put('/admins/toggle', authAdmin, userController.toggleAdmin)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.post('/add', userController.addUser)
router.put('/:userId', userController.updateUser)
router.delete('/delete/:userId', authAdmin, userController.deleteUser)

export default router