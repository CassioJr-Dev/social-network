import { UpdatePostDto } from '@/post/dtos/update.post.dto'
import { PostDao } from '@/post/models/dao/post.dao'
import { PostEntity } from '@/post/models/entities/post.entity'
import { UpdatePostService } from '@/post/models/services/update/updatePost.service'
import prisma from '@/shared/config/database/prisma.service'
import { AdapterHashProvider } from '@/shared/services/passwordHash.service'
import { UpdateUserDto } from '@/user/dtos/update.user.dto'
import { UserDao } from '@/user/models/dao/user.dao'
import { UserEntity } from '@/user/models/entities/user.entity'
import { UpdateUserService } from '@/user/models/services/update/updateUser.service'
import { NextFunction } from 'express'

export class UpdatePostController {
  async handle(
    authorId: string,
    postId: string,
    updatePostDto: UpdatePostDto,
    next: NextFunction,
  ): Promise<PostEntity> {
    try {
      const updatePostService = new UpdatePostService(
        new PostDao(prisma),
        new UserDao(prisma),
      )
      return updatePostService.execute(postId, authorId, updatePostDto)
    } catch (error) {
      next(error)
    }
  }
}
