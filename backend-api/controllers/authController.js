import UserModel from '../models/Users.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


const jwtSecret = 'kjfhdsabfnlsinc123olidfjpioasdc23'
const bcryptSalt = bcryptjs.genSaltSync(10)


//REGISTER
export const register =  async (req, res) => {
    const { name, email, password } = req.body

    UserModel.create({
        name,
        email,
        password: bcryptjs.hashSync(password, bcryptSalt),
    })
        .then((userDoc) => res.json(userDoc))
        .catch((exception) => res.status(422).json(exception))
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
                jwtSecret,
                {},
                (error, token) => {
                    if (error) throw error
                    res.cookie('token', token).json(userDoc)
                }
            )
        } else {
            res.status(422).json('wrong password')
        }
    } else {
        res.json('not found')
    }
}

//LOGOUT
export const logout = (req, res) => {
    res.cookie('token', '').json(true)
}
