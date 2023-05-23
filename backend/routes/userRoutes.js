import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/active', userController.getActiveUsers)
router.get('/inactive', userController.getInactiveUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router