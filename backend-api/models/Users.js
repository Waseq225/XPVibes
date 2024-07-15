import mongoose, { Schema } from 'mongoose'

//Standardize schemas

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        avatar: {
            type: String,
            default:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
            // required: true,
        },

        // phone or facebook/IG(firebase):
        // NID in profile completion for PG-18 events
    },
    { timestamps: true }
)
const UserModel = mongoose.model('User', UserSchema)

export default UserModel
