const mongoose = require('mongoose')
const { Schema } = mongoose

const EventSchema = new Schema({
    title: { type: String },

    // location: {
    //     city: String,
    //     state: String,
    //     country: String,
    // },

    venue: { String },

    photos: [String],

    description: { type: String },

    extraInfo: String,

    start: { type: Date },

    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // {
    //     name: { type: String },
    //     contact: {
    //         email: { type: String },
    //         phone: String,
    //     }, // address of org
    // },

    categories: [String],

    price: {
        type: Number,
        min: 0,
    },

    ticketsAvailable: {
        type: Number,
        min: 0,
    }, //think of open to public events

    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },

    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },
})

// EventSchema.pre('save', function (next) {
//     this.updatedAt = Date.now()
//     next()
// })

const EventModel = mongoose.model('Event', EventSchema)

module.exports = EventModel
