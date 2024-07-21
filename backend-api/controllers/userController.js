import UserModel from '../models/Users.js'
import jwt from 'jsonwebtoken'

export const userProfile = async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id, avatar, phone, dob } =
                await UserModel.findById(userData.id)
            res.json({ name, email, _id, avatar, phone, dob })
        })
    } else {
        res.json(null)
    }
}

export const updateUser = async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.json('Forbidden')
            req.user = user
            if (req.user.id !== req.params.id)
                return res.json('You can only update your own account!')

            const updateUser = await UserModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        dob: req.body.dob,
                        avatar: req.body.avatar,
                    },
                },
                { new: true }
            )
            const { password, ...rest } = updateUser._doc
            res.status(200).json(rest)
        })
    } else {
        res.json(null)
    }
}
