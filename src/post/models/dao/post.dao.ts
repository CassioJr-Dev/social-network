import { PrismaClient } from '@prisma/client'
import { IPostDao } from './interface.dao'
import { PostEntity } from '../entities/post.entity'
import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'

export class PostDao implements IPostDao {
  readonly sortableFields: string[] = ['title', 'createdAt']

  constructor(private prismaService: PrismaClient) {}

  async createPost(post: PostEntity): Promise<PostEntity> {
    return this.prismaService.post.create({
      data: post,
    })
  }
  async updatePost(
    postId: string,
    authorId: string,
    post: Partial<PostEntity>,
  ): Promise<PostEntity> {
    return this.prismaService.post.update({
      where: { postId, authorId },
      data: post,
    })
  }
  async findPostById(postId: string): Promise<PostEntity | null> {
    return this.prismaService.post.findUnique({
      where: { postId },
    })
  }
  async deletePost(postId: string, authorId: string): Promise<void> {
    await this.prismaService.post.delete({
      where: { postId, authorId },
    })
  }

  async search(
    authorId: string,
    props: ISearchParams,
  ): Promise<ISearchResult<PostEntity>> {
    const sortable = this.sortableFields?.includes(props.sort) || false
    const orderByField = sortable ? props.sort : 'createdAt'
    const orderByDir = sortable ? props.sortDir : 'desc'

    const count = await this.prismaService.post.count({
      where: {
        authorId,
      },
    })

    const models = await this.prismaService.post.findMany({
      where: {
        authorId,
      },
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    })

    const findTeste = await this.prismaService.user.findMany({
      where: {
        userId: authorId,
      },
    })

    return {
      items: models,
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
    }
  }
}
