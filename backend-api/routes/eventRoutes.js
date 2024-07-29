import { Router } from 'express'
import { addEvent, getEvent } from '../controllers/eventController.js'

const router = Router()


// Add Event endpoint
router.post('/addevent', addEvent)

// Get Events endpoint
router.get('/getevent', getEvent)

export default router

