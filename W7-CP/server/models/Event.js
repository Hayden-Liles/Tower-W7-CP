import { Schema } from "mongoose";


export const EventSchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 50, minLength: 3},
        description: {type: String, required: true, maxLength: 900, minLength: 3},
        coverImg: {type: String, required: true, maxLength: 900, minLength: 3},
        location: {type: String, required: true, maxLength: 900, minLength: 3},
        capacity: {type: Number, required: true, maxLength: 900, minLength: 3},
        type: {type: String, required: true, maxLength: 900, minLength: 3,
            enum: ['concert', 'convention', 'sport', 'digital',]},
        isCanceled: {type: Boolean, default: false},
        startDate: {type: Date, required: true, maxLength: 100, minLength: 3},

        creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('allTickets', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket'
})