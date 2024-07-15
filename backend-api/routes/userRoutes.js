import express from 'express'
import { userProfile } from '../controllers/userController.js'

const router = express.Router()

// Profile Details endpoint
router.get('/profileDetails', userProfile)

// Profile payement endpoint



export default router
