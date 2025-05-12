import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { IPostDao } from '../../dao/interfacePost.dao'
import { ForbiddenError } from '@/shared/errors/forbidden-error'
import { $Enums, UserStatus } from '@prisma/client'

export class DeletePostService {
  constructor(
    private postDao: IPostDao,
    private userDao: IUserDao,
  ) {}

  async execute(authorId: string, postId: string): Promise<void> {
    try {
      const [user, post] = await Promise.all([
        this.userDao.findUserById(authorId),
        this.postDao.findPostById(postId),
      ])

      if (!user) {
        throw new NotFoundError('User not found')
      }

      const inactiveStatuses: UserStatus[] = [
        $Enums.UserStatus.INACTIVE,
        $Enums.UserStatus.BLOCKED,
      ]

      if (inactiveStatuses.includes(user.status)) {
        throw new ForbiddenError(`User is ${user.status}`)
      }

      if (!post) {
        throw new NotFoundError('Post not found')
      }

      if (post.authorId !== authorId) {
        throw new ForbiddenError('You are not allowed to delete this post')
      }

      await this.postDao.deletePost(postId, authorId)
    } catch (error) {
      throw error
    }
  }
}
