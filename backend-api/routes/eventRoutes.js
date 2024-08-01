import { Router } from 'express'
import {
    addEvent,
    getEvent,
    getEventsByIds,
} from '../controllers/eventController.js'

const router = Router()

// Add Event endpoint
router.post('/addevent', addEvent)

// Get Events endpoint
router.get('/getevent', getEvent)

router.get('/geteventsbyids', getEventsByIds)

export default router
