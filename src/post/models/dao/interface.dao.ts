import { PostEntity } from '../entities/post.entity'

export interface IPostDao {
  createPost(post: PostEntity): Promise<PostEntity>
  updatePost(post: Partial<PostEntity>): Promise<PostEntity>
  findPostById(postId: string): Promise<PostEntity | null>
  findAllPostsByAuthorId(authorId: string): Promise<PostEntity[]>
  deletePost(postId: string): Promise<void>
}
