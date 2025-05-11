import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { CreatePostService } from '@/post/models/services/create/createPost.service'
import { PostDao } from '@/post/models/dao/post.dao'
import { UserDao } from '@/user/models/dao/user.dao'
import { CreatePostDto } from '@/post/dtos/create.post.dto'
import { PostEntity } from '@/post/models/entities/post.entity'

export class CreatePostController {
  async handle(
    authorId: string,
    createPostDto: CreatePostDto,
    next: NextFunction,
  ): Promise<PostEntity> {
    try {
      const createPostService = new CreatePostService(
        new PostDao(prisma),
        new UserDao(prisma),
      )

      return createPostService.execute({
        ...createPostDto,
        authorId,
      })
    } catch (error) {
      next(error)
    }
  }
}
