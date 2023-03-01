import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class CommentsServices{
    async createComment(commentData) {
        let comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }

    async getEventComments(eventId) {
        let comments = await dbContext.Comments.find({eventId}).populate('creator')
        return comments
    }

    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if(!comment){
            throw new BadRequest('Invalid Comment id')
        }
        if(comment.creatorId != userId){
            throw new BadRequest('You are not Authorized to remove this comment')
        }
        comment.remove()
        return comment
    }

}

export const commentsServices = new CommentsServices()