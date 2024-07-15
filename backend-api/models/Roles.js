import mongoose, { Schema } from 'mongoose'

//Standardize schemas

const RolesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permission: {
        required: true,
        type: [String],
    },
})

const RolesModel = mongoose.model('Role', RolesSchema)

export default RolesModel
