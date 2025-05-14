import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { PostDao } from '@/post/models/dao/post.dao'
import { DeleteLikeService } from '@/like/models/services/delete/deleteLike.service'
import { LikeDao } from '@/like/models/dao/like.dao'

export class DeleteLikeController {
  async handle(
    likeId: string,
    postId: string,
    next: NextFunction,
  ): Promise<void> {
    try {
      const deleteLikeService = new DeleteLikeService(
        new LikeDao(prisma),
        new PostDao(prisma),
      )
      await deleteLikeService.execute(likeId, postId)
    } catch (error) {
      next(error)
    }
  }
}
