import { Router } from 'express'
import jwt from 'jsonwebtoken'
import  EventModel  from '../models/Events.js'


const router = Router()

const jwtSecret = 'kjfhdsabfnlsinc123olidfjpioasdc23'

// Add Event endpoint
router.post('/addevent', async (req, res) => {
    const { token } = req.cookies
    const {
        title,
        venue,
        photos,
        description,
        extraInfo,
        start,
        categories,
        price,
        ticketsAvailable,
    } = req.body

    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err

            EventModel.create({
                title,
                venue,
                photos,
                description,
                extraInfo,
                start,
                organizer: userData.id, // change to actual organizer later
                categories,
                price,
                ticketsAvailable,
            })
                .then((EventDoc) => res.json(EventDoc))
                .catch((exception) => res.status(422).json(exception))
        })
    } else {
        throw new Error('Login first')
    }
})

// Homepage Events endpoint
router.get('/getevent', async (req, res) => {
    const events = await EventModel.find()
    res.json(events)
})

export default router

