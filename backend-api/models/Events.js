const mongoose = require('mongoose')
const { Schema } = mongoose

const EventSchema = new Schema({
    title: { type: String, required: true },
    location: {
        city: String,
        state: String,
        country: String
    },
    photos: [String],
    description: { type: String, required: true },
    extraInfo: String,
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    organizer: {
        name: { type: String, required: true },
        contact: {
            email: { type: String, required: true },
            phone: String,
        },
    },
    categories: [String],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    ticketsAvailable: {
        type: Number,
        required: true,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

EventSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

const EventModel = mongoose.model('Event', EventSchema)

module.exports = EventModel
