import express from 'express'
import { deleteUser, updateUser, userProfile } from '../controllers/userController.js'

const router = express.Router()

// Profile endpoint
router.get('/info', userProfile)

// Profile details endpoint
router.post('/update/:id', updateUser)

//User deletion
router.delete('/delete/:id', deleteUser)

export default router
