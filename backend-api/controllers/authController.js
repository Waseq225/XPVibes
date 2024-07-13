import UserModel from '../models/Users.js'
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
                    res
                    .cookie('token', token, {httpOnly: true})
                    .json(userDoc)
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
    res.cookie('token', '').json(true)
}
