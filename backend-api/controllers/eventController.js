import jwt from 'jsonwebtoken'
import EventModel from '../models/Events.js'

export const addEvent = async (req, res) => {
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
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err

            const photosToPass = photos.length === 0 ? undefined : photos

            EventModel.create({
                title,
                venue,
                photos: photosToPass,
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
}

export const getEvent = async (req, res) => {
    const events = await EventModel.find()
    res.json(events)
}
