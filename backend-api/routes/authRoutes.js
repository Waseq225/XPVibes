import express from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/Users.js'
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
