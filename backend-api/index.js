const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const User = require('./models/Users.js')
const Ticket = require('./models/Events.js') // for now named it ticket instead of event
const cookieParser = require('cookie-parser')

require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'kjfhdsabfnlsinc123olidfjpioasdc23'

//Middleware for parsing request body
const app = express()
app.use(express.json())
app.use(cookieParser())

//Middleware for handling CORS POLICY
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

mongoose.connect(process.env.MONGO_URL)

//Register endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    })
        .then((userDoc) => res.json(userDoc))
        .catch((exception) => {
            res.status(422).json(exception)
        })
})

//Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userDoc = await User.findOne({ email })

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign(
                { email: userDoc.email, id: userDoc._id },
                jwtSecret,
                {},
                (error, token) => {
                    if (error) throw err
                    res.cookie('token', token).json(userDoc)
                }
            )
        } else {
            res.status(422).json('wrong password')
        }
    } else {
        res.json('not found')
    }
})

//Logout endpoint
app.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true)
})

//Profile endpoint
app.get('/profile', async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id })
        })
    } else {
        res.json(null)
    }
})

//AddEvent endpoint
app.post('/addevent', async (req, res) => {
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

            Ticket.create({
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
                .catch((exception) => {
                    res.status(422).json(exception)
                })

        })
    } else {
        throw new Error('Invalid login')
    }
})
app.listen(4000)
