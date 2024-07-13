import express from 'express'
import { userProfile } from '../controllers/userController.js'

const router = express.Router()

// Profile endpoint
router.get('/profile', userProfile)

export default router
