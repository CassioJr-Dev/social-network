import { PostDao } from '@/post/models/dao/post.dao'
import { PostEntity } from '@/post/models/entities/post.entity'
import { SearchPostsService } from '@/post/models/services/search/searchPost.service'
import prisma from '@/shared/config/database/prisma.service'
import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { UserDao } from '@/user/models/dao/user.dao'
import { NextFunction } from 'express'

export class SearchPostController {
  async handle(
    authorId: string,
    updatePostDto: Partial<ISearchParams>,
    next: NextFunction,
  ): Promise<ISearchResult<PostEntity>> {
    try {
      const searchPostService = new SearchPostsService(
        new PostDao(prisma),
        new UserDao(prisma),
      )
      return searchPostService.execute(authorId, updatePostDto)
    } catch (error) {
      next(error)
    }
  }
}
