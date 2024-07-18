import express from 'express'
import { updateUser, userProfile } from '../controllers/userController.js'

const router = express.Router()

// Profile endpoint
router.get('/profile', userProfile)

// Profile details endpoint
router.post('/update/:id', updateUser)


export default router
