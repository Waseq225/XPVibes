import express from 'express'
import { checkPermission, google, login, logout, register } from '../controllers/authController.js'
import RolesModel from '../models/Roles.js'

const router = express.Router()

// Register endpoint
router.post('/register',register)

// Login endpoint
router.post('/login', login)

// Logout endpoint
router.get('/logout', logout)

// Google endpoint
router.post('/google', google)

//Role creation endpoint

// router.get('/enterRoles', async (req, res) => {
//     RolesModel.create({
//        name: "organizer",
//        permission: ["manageEvent"] // ["manageEvent", "viewEvent", "manageUsers"] //change later if applicable
//     })
//         .then((EventDoc) => res.json(EventDoc))
//         .catch((exception) => res.status(422).json(exception))
//


router.get('/hasPermission/:permission', checkPermission)


export default router
