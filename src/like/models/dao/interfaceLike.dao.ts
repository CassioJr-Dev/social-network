import { LikeEntity } from '../entities/like.entity'

export interface ILikeDao {
  createLike(like: LikeEntity): Promise<LikeEntity>
  findAllLikes(postId: string): Promise<LikeEntity[]>
  removeLike(likeId: string, postId: string): Promise<void>
}
