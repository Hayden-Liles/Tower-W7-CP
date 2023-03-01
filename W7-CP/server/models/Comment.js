import { Schema } from "mongoose";


export const CommentSchema = new Schema(
    {
        body: {type: String, required: true, maxLength: 1000, minLength: 10},

        eventId: {type: Schema.Types.ObjectId, required: true, ref: 'Event'},
        creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true,
})