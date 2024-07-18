import UserModel from '../models/Users.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const userProfile = async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id , avatar } = await UserModel.findById(userData.id)
            res.json({ name, email, _id, avatar })
        })
    } else {
        res.json(null)
    }
}


export const updateUser = async (req, res, next) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.json("Forbidden")
            req.user = user
            if (req.user.id !== req.params.id) return res.json("You can only update your own account!")

            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password, 10)
            }
            const updateUser = await UserModel.findByIdAndDelete(req.params.id, {
                $set:{
                    username : req.body. username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }

            }, {new: true})
            const{password, ...rest} = updateUser._doc
            res.status(200).json(rest)
        })
    } else {
        res.json(null)
    }
}