const mongoose = require('mongoose')
const express = require('express')
const User = require('./models/Users.js')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

mongoose.connect(process.env.MONGO_URL)

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://127.0.0.1:5173",
//   })
// );

app.get('/test', (req, res) => {
    res.json('message ok')
    return res
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    User.create({
        name, email, password
    })
})

app.listen(4000)
