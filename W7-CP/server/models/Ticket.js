import { Schema } from "mongoose";



export const TicketSchema = new Schema(
    {
        confirmer: {type: String, default: 'ticket'},
        eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
        accountId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},

    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account'
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'Event'
})