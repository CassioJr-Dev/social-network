import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { BadRequestError } from '../../../../shared/errors/bad-request-error'
import { IPostDao } from '../../dao/interfacePost.dao'
import { $Enums, UserStatus } from '@prisma/client'
import { PostEntity } from '../../entities/post.entity'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { ForbiddenError } from '@/shared/errors/forbidden-error'

export type UpdatePostType = {
  title?: string
  content?: string
  privacy?: $Enums.Privacy
}

export class UpdatePostService {
  constructor(
    private postDao: IPostDao,
    private userDao: IUserDao,
  ) {}

  async execute(
    postId: string,
    authorId: string,
    postType: UpdatePostType,
  ): Promise<PostEntity> {
    try {
      const [user, post] = await Promise.all([
        this.userDao.findUserById(authorId),
        this.postDao.findPostById(postId),
      ])

      if (!post) {
        throw new NotFoundError('Post not found')
      }

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

      if (post.authorId !== authorId) {
        throw new ForbiddenError('You are not allowed to update this post')
      }

      const hasAtLeastOneProperty = this.hasAtLeastOneProperty(postType)

      if (!hasAtLeastOneProperty) {
        throw new BadRequestError('At least one property must be provided')
      }

      const updatedPost = await this.postDao.updatePost(
        postId,
        authorId,
        postType,
      )
      return updatedPost
    } catch (error) {
      throw error
    }
  }

  private hasAtLeastOneProperty(obj: UpdatePostType): boolean {
    return Object.values(obj).some(value => value !== undefined)
  }
}
