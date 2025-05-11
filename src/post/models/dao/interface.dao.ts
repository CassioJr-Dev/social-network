import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { PostEntity } from '../entities/post.entity'

export interface IPostDao {
  sortableFields: string[]

  createPost(post: PostEntity): Promise<PostEntity>
  updatePost(
    postId: string,
    authorId: string,
    post: Partial<PostEntity>,
  ): Promise<PostEntity>
  findPostById(postId: string): Promise<PostEntity | null>
  search(
    authorId: string,
    props: ISearchParams,
  ): Promise<ISearchResult<PostEntity>>
  deletePost(postId: string, authorId: string): Promise<void>
}
