import { PostDao } from '@/post/models/dao/post.dao'
import prisma from '../../../shared/config/database/prisma.service'
import { GetPostService } from '../../models/services/get/getPost.service'
import { NextFunction } from 'express'
import { PostEntity } from '@/post/models/entities/post.entity'

export class GetPostController {
  async handle(postId: string, next: NextFunction): Promise<PostEntity> {
    try {
      const getPostService = new GetPostService(new PostDao(prisma))
      return getPostService.execute(postId)
    } catch (error) {
      next(error)
    }
  }
}
