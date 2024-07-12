import mongoose, {Schema} from 'mongoose'

//Standardize schemas

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,

    // phone or gmail/facebook/IG(firebase):
    // NID in profile completion for PG-18 events
}, {timestamps:true})
;

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
