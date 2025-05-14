import { CommentEntity } from '../entities/comment.entity'

export interface ICommentDao {
  createComment(comment: CommentEntity): Promise<CommentEntity>
  updateComment(comment: CommentEntity): Promise<CommentEntity>
  findAllComments(postId: string): Promise<CommentEntity[]>
  removeComment(commentId: string, postId: string): Promise<void>
  findCommentById(commentId: string): Promise<CommentEntity | null>
}
