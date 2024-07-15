import express from 'express'
import { google, login, logout, register } from '../controllers/authController.js'

const router = express.Router()

// Register endpoint
router.post('/register',register)

// Login endpoint
router.post('/login', login)

// Logout endpoint
router.post('/logout', logout)

// Google endpoint
router.post('/google', google)



export default router
