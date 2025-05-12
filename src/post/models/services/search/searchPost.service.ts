import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { PostEntity } from '../../entities/post.entity'
import { IPostDao } from '../../dao/interfacePost.dao'
import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { $Enums, UserStatus } from '@prisma/client'
import { ForbiddenError } from '@/shared/errors/forbidden-error'

export class SearchPostsService {
  constructor(
    private postDao: IPostDao,
    private userDao: IUserDao,
  ) {}

  async execute(
    authorId: string,
    props: ISearchParams,
  ): Promise<ISearchResult<PostEntity>> {
    try {
      const author = await this.userDao.findUserById(authorId)

      if (!author) {
        throw new NotFoundError('Author not found')
      }

      const inactiveStatuses: UserStatus[] = [
        $Enums.UserStatus.INACTIVE,
        $Enums.UserStatus.BLOCKED,
      ]

      if (inactiveStatuses.includes(author.status)) {
        throw new ForbiddenError(`Author is ${author.status}`)
      }

      const posts = await this.postDao.search(authorId, props)
      return posts
    } catch (error) {
      throw error
    }
  }
}
