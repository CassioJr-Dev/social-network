import { PostDao } from '@/post/models/dao/post.dao'
import prisma from '../../../shared/config/database/prisma.service'
import { GetAllLikesService } from '../../models/services/getAll/getAllLikes.service'
import { NextFunction } from 'express'
import { LikeEntity } from '@/like/models/entities/like.entity'
import { LikeDao } from '@/like/models/dao/like.dao'

export class GetAllLikesController {
  async handle(postId: string, next: NextFunction): Promise<LikeEntity[]> {
    try {
      const getAllLikesService = new GetAllLikesService(
        new LikeDao(prisma),
        new PostDao(prisma),
      )
      return getAllLikesService.execute(postId)
    } catch (error) {
      next(error)
    }
  }
}
