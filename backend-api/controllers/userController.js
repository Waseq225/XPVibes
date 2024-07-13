export const userProfile = async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id } = await UserModel.findById(userData.id)
            res.json({ name, email, _id })
        })
    } else {
        res.json(null)
    }
}