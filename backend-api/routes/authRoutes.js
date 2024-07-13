import express from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/Users.js'
import { login, logout, register } from '../controllers/authController.js'

const router = express.Router()

// Register endpoint
router.post('/register',register)

// Login endpoint
router.post('/login', login)

// Logout endpoint
router.post('/logout', logout)

// Profile endpoint
router.get('/profile', async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id } = await UserModel.findById(userData.id)
            res.json({ name, email, _id })
        })
    } else {
        res.json(null)
    }
})

export default router
