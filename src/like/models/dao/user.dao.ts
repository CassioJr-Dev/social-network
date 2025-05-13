import { PrismaClient } from '@prisma/client'
import { ILikeDao } from './interfaceLike.dao'
import { LikeEntity } from '../entities/like.entity'

export class LikeDao implements ILikeDao {
  constructor(private prismaService: PrismaClient) {}

  async createLike(like: LikeEntity): Promise<LikeEntity> {
    return this.prismaService.like.create({
      data: like,
    })
  }
  async findAllLikes(postId: string): Promise<LikeEntity[]> {
    return this.prismaService.like.findMany({
      where: {
        postId,
      },
    })
  }
  async removeLike(likeId: string): Promise<void> {
    await this.prismaService.like.delete({
      where: {
        likeId,
      },
    })
  }
}
