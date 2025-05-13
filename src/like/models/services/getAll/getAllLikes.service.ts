import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { ILikeDao } from '../../dao/interfaceLike.dao'
import { LikeEntity } from '../../entities/like.entity'
import { IPostDao } from '@/post/models/dao/interfacePost.dao'

export class GetAllLikesService {
  constructor(
    private likeDao: ILikeDao,
    private postDao: IPostDao,
  ) {}

  async execute(postId: string): Promise<LikeEntity[]> {
    try {
      const post = await this.postDao.findPostById(postId)

      if (!post) {
        throw new NotFoundError('Post not found')
      }

      const likes = await this.likeDao.findAllLikes(postId)


      return likes
    } catch (error) {
      throw error
    }
  }
}
