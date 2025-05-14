import { PrismaClient } from '@prisma/client'
import { ICommentDao } from './interfaceComment.dao'
import { CommentEntity } from '../entities/comment.entity'

export class CommentDao implements ICommentDao {
  constructor(private prismaService: PrismaClient) {}

  async createComment(comment: CommentEntity): Promise<CommentEntity> {
    return this.prismaService.comment.create({
      data: comment,
    })
  }

  async updateComment(comment: CommentEntity): Promise<CommentEntity> {
    return this.prismaService.comment.update({
      where: {
        commentId: comment.commentId,
      },
      data: comment,
    })
  }

  async findAllComments(postId: string): Promise<CommentEntity[]> {
    return this.prismaService.comment.findMany({
      where: {
        postId,
      },
    })
  }
  async findCommentById(commentId: string): Promise<CommentEntity | null> {
    return this.prismaService.comment.findUnique({
      where: {
        commentId,
      },
    })
  }
  async removeComment(commentId: string): Promise<void> {
    await this.prismaService.comment.delete({
      where: {
        commentId,
      },
    })
  }
}
