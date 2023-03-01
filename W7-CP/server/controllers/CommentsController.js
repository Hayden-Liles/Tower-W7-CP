import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsServices } from '../services/CommentsServices'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController{
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:commentId', this.deleteComment)
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const commentData = req.body
            const comment = await commentsServices.createComment(commentData)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    
    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId
            const userId = req.userInfo.id
            const comment = await commentsServices.deleteComment(commentId, userId)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}