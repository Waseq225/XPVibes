const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(cookieParser());

// Middleware for handling CORS POLICY
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL);

// Use routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
