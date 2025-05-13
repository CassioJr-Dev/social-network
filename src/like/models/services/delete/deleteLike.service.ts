import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { ILikeDao } from '../../dao/interfaceLike.dao'
import { IPostDao } from '@/post/models/dao/interfacePost.dao'

export class DeleteLikeService {
  constructor(
    private likeDao: ILikeDao,
    private postDao: IPostDao,
  ) {}

  async execute(likeId: string, postId: string): Promise<void> {
    try {
      const [like, post] = await Promise.all([
        this.likeDao.findLikeById(likeId),
        this.postDao.findPostById(postId),
      ])

      if (!like) {
        throw new NotFoundError('Like not found')
      }

      if (!post) {
        throw new NotFoundError('Post not found')
      }

      await this.likeDao.removeLike(likeId, postId)
    } catch (error) {
      throw error
    }
  }
}
