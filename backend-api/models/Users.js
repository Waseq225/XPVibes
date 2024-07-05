const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,

    // phone or gmail/facebook/IG(firebase):
    // NID in profile completion for PG-18 events
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
