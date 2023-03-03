import { AppState } from "../AppState"
import { api } from "./AxiosService"




class CommentsService{
    async createComment(formData){
        const comment = await api.post('/api/comments', formData)
        AppState.curEvent.comments.push(comment.data)
    }

    async deleteComment(commentId){
        const comment = await api.delete(`/api/comments/${commentId}`)
        const commentIndex = AppState.curEvent.comments.findIndex(e => e.id == commentId)
        AppState.curEvent.comments.splice(commentIndex, 1)
    }
}

export const commentsService = new CommentsService()