const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const router = express.Router();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'kjfhdsabfnlsinc123olidfjpioasdc23';

// Register endpoint
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    })
    .then(userDoc => res.json(userDoc))
    .catch(exception => res.status(422).json(exception));
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                { email: userDoc.email, id: userDoc._id },
                jwtSecret,
                {},
                (error, token) => {
                    if (error) throw error;
                    res.cookie('token', token).json(userDoc);
                }
            );
        } else {
            res.status(422).json('wrong password');
        }
    } else {
        res.json('not found');
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

// Profile endpoint
router.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

module.exports = router;
