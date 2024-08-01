import jwt from 'jsonwebtoken'
import EventModel from '../models/Events.js'
import CartModel from '../models/Cart.js'

export const addToCart = async (req, res) => {
    const { token } = req.cookies
    const { eventId, numberOfTickets } = req.body

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err

            CartModel.create({
                user: userData.id,
                event: eventId,
                numberOfTickets,
            })
                .then((CartDoc) => res.json(CartDoc))
                .catch((exception) => res.status(422).json(exception))
        })
    } else {
        res.status(403).json('unauthorized')
    }
}

export const getCart = async (req, res) => {
    const { token } = req.cookies

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err

            CartModel.find({ user: userData.id })
                .populate('event')
                .exec()
                .then((CartDoc) => {

                    res.json(CartDoc)
                })
                .catch((exception) => res.status(422).json(exception))
        })
    } else {
        res.status(403).json('unauthorized')
    }
}
