import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { CreatePostService } from '@/post/models/services/create/createPost.service'
import { PostDao } from '@/post/models/dao/post.dao'
import { UserDao } from '@/user/models/dao/user.dao'
import { CreatePostDto } from '@/post/dtos/create.post.dto'
import { PostEntity } from '@/post/models/entities/post.entity'
import { CreateLikeService } from '@/like/models/services/create/createLike.service'
import { LikeEntity } from '@/like/models/entities/like.entity'
import { LikeDao } from '@/like/models/dao/user.dao'
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
