import { $Enums, UserStatus } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ILikeDao } from '../../dao/interfaceLike.dao'
import { IPostDao } from '@/post/models/dao/interfacePost.dao'
import { LikeEntity } from '../../entities/like.entity'
import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { ForbiddenError } from '@/shared/errors/forbidden-error'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'

export type CreateLikeType = {
  userId: string
  postId: string
}

export class CreateLikeService {
  constructor(
    private likeDao: ILikeDao,
    private userDao: IUserDao,
    private postDao: IPostDao,
  ) {}

  async execute(like: CreateLikeType): Promise<LikeEntity> {
    try {
      const [user, post] = await Promise.all([
        this.userDao.findUserById(like.userId),
        this.postDao.findPostById(like.postId),
      ])

      if (!user) {
        throw new NotFoundError('User not found')
      }

      if (!post) {
        throw new NotFoundError('Post not found')
      }

      const inactiveStatuses: UserStatus[] = [
        $Enums.UserStatus.INACTIVE,
        $Enums.UserStatus.BLOCKED,
      ]

      if (inactiveStatuses.includes(user.status)) {
        throw new ForbiddenError(`User is ${user.status}`)
      }

      if (post.privacy === $Enums.Privacy.PRIVATE) {
        throw new ForbiddenError('Post is private')
      }

      const likeId = randomUUID()
      const createdAt = new Date()

      const createdLike = await this.likeDao.createLike({
        likeId,
        userId: like.userId,
        postId: like.postId,
        createdAt,
      })
      return createdLike
    } catch (error) {
      throw error
    }
  }
}
