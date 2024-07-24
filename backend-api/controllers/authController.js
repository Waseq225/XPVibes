import UserModel from '../models/Users.js'
import RolesModel from '../models/Roles.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/errors.js'

const bcryptSalt = bcryptjs.genSaltSync(10)

//REGISTER
export const register = async (req, res, next) => {
    const { name, email, password } = req.body

    UserModel.create({
        name,
        email,
        password: bcryptjs.hashSync(password, bcryptSalt),
    })
        .then((userDoc) => res.json(userDoc))
        .catch((exception) => {
            if (exception.code === 11000)
                next(errorHandler(422, 'Already registered email'))
        })
}

//LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body
    const userDoc = await UserModel.findOne({ email })

    if (userDoc) {
        const passOk = bcryptjs.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign(
                { email: userDoc.email, id: userDoc._id },
                process.env.JWT_SECRET,
                {},
                (error, token) => {
                    if (error) throw error
                    res.cookie('token', token, { httpOnly: true }).json(userDoc)
                }
            )
        } else {
            res.status(422).json('wrong password')
        }
    } else {
        res.json('User not found')
    }
}

//LOGOUT
export const logout = (req, res) => {
    res.clearCookie('token', '').json(true)
}

//GOOGLE
export const google = async (req, res) => {
    const userDoc = await UserModel.findOne({ email: req.body.email })
    if (userDoc) {
        jwt.sign(
            { email: userDoc.email, id: userDoc._id },
            process.env.JWT_SECRET,
            {},
            (error, token) => {
                if (error) throw error
                res.cookie('token', token, { httpOnly: true }).json(userDoc)
            }
        )
    } else {
        const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            avatar: req.body.photo,
        })
        await newUser.save()
        if (newUser) {
            jwt.sign(
                { email: newUser.email, id: newUser._id },
                process.env.JWT_SECRET,
                {},
                (error, token) => {
                    if (error) throw error
                    res.cookie('token', token, { httpOnly: true }).json(newUser)
                }
            )
        }
    }
}

//Authorising permission for users
export const checkPermission = async (req, res) => {
    const { token } = req.cookies

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err

            UserModel.findById(userData.id)
                .then((userDoc) => {
                    RolesModel.findById(userDoc.role)
                        .then((roleDoc) => {
                            res.json(
                                roleDoc.permission.includes(
                                    req.params.permission
                                )
                            )
                        })
                        .catch(() => res.json(false))
                })
                .catch((exception) => {
                    res.status(422).json(exception)
                })
        })
    } else {
        res.json(false)
    }
}
