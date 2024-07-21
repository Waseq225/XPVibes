import mongoose from 'mongoose'
const { Schema } = mongoose

//Standardized schema
const EventSchema = new Schema(
    {
        organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        title: { type: String },

        // location: {
        //     city: String,
        //     state: String,
        //     country: String,
        // },

        venue: { String },

        photos: {
            type: [String],
            default: [
                'https://plus.unsplash.com/premium_photo-1682265676364-5838a427dee2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
        },

        description: { type: String },

        extraInfo: String,

        start: { type: Date },

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

        //verification{}

        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // },

        // updatedAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    { timestamps: true }
)

// EventSchema.pre('save', function (next) {
//     this.updatedAt = Date.now()
//     next()
// })

const EventModel = mongoose.model('Event', EventSchema)

export default EventModel
