import { DeletePostService } from '@/post/models/services/delete/deletePost.service'
import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { PostDao } from '@/post/models/dao/post.dao'
import { UserDao } from '@/user/models/dao/user.dao'

export class DeletePostController {
  async handle(
    authorId: string,
    postId: string,
    next: NextFunction,
  ): Promise<void> {
    try {
      const deletePostService = new DeletePostService(
        new PostDao(prisma),
        new UserDao(prisma),
      )
      await deletePostService.execute(authorId, postId)
    } catch (error) {
      next(error)
    }
  }
}
