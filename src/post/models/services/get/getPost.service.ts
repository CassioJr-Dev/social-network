import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { PostEntity } from '../../entities/post.entity'
import { IPostDao } from '../../dao/interface.dao'

export class GetPostService {
  constructor(private postDao: IPostDao) {}

  async execute(postId: string): Promise<PostEntity> {
    try {
      const post = await this.postDao.findPostById(postId)
      if (!post) {
        throw new NotFoundError('Post not found')
      }

      return post
    } catch (error) {
      throw error
    }
  }
}
