import { IPostDao } from '../../dao/interfacePost.dao'
import { PostEntity } from '../../entities/post.entity'
import { $Enums, UserStatus } from '@prisma/client'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { randomUUID } from 'node:crypto'
import { ForbiddenError } from '@/shared/errors/forbidden-error'

export type CreatePostType = {
  title: string
  content: string
  authorId: string
  privacy?: $Enums.Privacy
}

export class CreatePostService {
  constructor(
    private postDao: IPostDao,
    private userDao: IUserDao,
  ) {}

  async execute(post: CreatePostType): Promise<PostEntity> {
    try {
      const { title, content, authorId, privacy = $Enums.Privacy.PUBLIC } = post
      const user = await this.userDao.findUserById(authorId)

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

      const postId = randomUUID()
      const createdAt = new Date()

      const newPost = Object.assign(new PostEntity(), {
        postId,
        title,
        content,
        authorId,
        privacy,
        createdAt,
      })

      const createdPost = await this.postDao.createPost(newPost)
      return createdPost
    } catch (error) {
      throw error
    }
  }
}
