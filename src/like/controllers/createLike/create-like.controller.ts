import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { PostDao } from '@/post/models/dao/post.dao'
import { UserDao } from '@/user/models/dao/user.dao'
import { CreateLikeService } from '@/like/models/services/create/createLike.service'
import { LikeEntity } from '@/like/models/entities/like.entity'
import { LikeDao } from '@/like/models/dao/like.dao'
import { CreateLikeDto } from '@/like/dtos/create.like.dto'

export class CreateLikeController {
  async handle(
    createLikeDto: CreateLikeDto,
    next: NextFunction,
  ): Promise<LikeEntity> {
    try {
      const createLikeService = new CreateLikeService(
        new LikeDao(prisma),
        new UserDao(prisma),
        new PostDao(prisma),
      )

      return createLikeService.execute(createLikeDto)
    } catch (error) {
      next(error)
    }
  }
}
