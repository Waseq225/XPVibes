import mongoose from 'mongoose'
const { Schema } = mongoose

//Standardized schema
//Make fields required where necessary
const CartSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        numberOfTickets: { type: Number, min: 0 },
    },
    { timestamps: true }
)

const CartModel = mongoose.model('Cart', CartSchema)

export default CartModel
