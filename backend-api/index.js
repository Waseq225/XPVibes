import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
dotenv.config()

const app = express()

// Middleware for parsing request body
app.use(express.json())
app.use(cookieParser())

// Middleware for handling CORS POLICY
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

mongoose.connect(process.env.MONGO_URL)

// Use routes
app.use('/auth', authRoutes)
app.use('/events', eventRoutes)

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})

//Middleware for handling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
