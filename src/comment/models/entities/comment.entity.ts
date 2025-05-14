import { Comment } from '@prisma/client'

export class CommentEntity implements Comment {
  commentId: string
  content: string
  authorId: string
  postId: string
  createdAt: Date
}
