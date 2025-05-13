import { $Enums, PrismaClient } from '@prisma/client'
import { IFriendShipDao } from './interfaceFriendShip.dao'
import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { FriendShipEntity } from '../entities/friendShip.entity'

export class FriendShipDao implements IFriendShipDao {
  readonly sortableFields: string[] = ['name', 'createdAt']

  constructor(private prismaService: PrismaClient) {}

  async createFriendShip(
    friendShip: FriendShipEntity,
  ): Promise<FriendShipEntity> {
    return this.prismaService.friendship.create({
      data: friendShip,
    })
  }

  async updateStatus(
    friendId: string,
    status: $Enums.FriendshipStatus,
  ): Promise<FriendShipEntity> {
    return this.prismaService.friendship.update({
      where: { friendId },
      data: { status },
    })
  }

  async rejectFriendRequest(friendId: string, userId: string): Promise<void> {
    await this.prismaService.friendship.delete({
      where: { friendId, status: 'PENDING', addresseeId: userId },
    })
  }

  async findFriendShip(
    requesterId: string,
    addresseeId: string,
  ): Promise<FriendShipEntity | null> {
    return this.prismaService.friendship.findFirst({
      where: {
        requesterId,
        addresseeId,
      },
    })
  }

  async findFriendShipById(
    friendId: string,
    userId: string,
  ): Promise<FriendShipEntity | null> {
    return this.prismaService.friendship.findUnique({
      where: {
        friendId,
        OR: [{ addresseeId: userId }, { requesterId: userId }],
      },
    })
  }

  async searchFriends(
    userId: string,
    props: ISearchParams,
  ): Promise<ISearchResult<FriendShipEntity>> {
    const sortable = this.sortableFields?.includes(props.sort) || false
    const orderByField = sortable ? props.sort : 'createdAt'
    const orderByDir = sortable ? props.sortDir : 'desc'
    const filter = props.filter?.trim()
    const page = props.page && props.page > 0 ? props.page : 1
    const perPage = props.perPage && props.perPage > 0 ? props.perPage : 15

    const count = await this.prismaService.friendship.count({
      where: {
        status: 'ACCEPTED',
        OR: [
          {
            requesterId: userId,
            ...(props.filter && {
              addressee: {
                name: {
                  contains: props.filter,
                  mode: 'insensitive',
                },
              },
            }),
          },
          {
            addresseeId: userId,
            ...(props.filter && {
              requester: {
                name: {
                  contains: props.filter,
                  mode: 'insensitive',
                },
              },
            }),
          },
        ],
      },
    })

    const models = await this.prismaService.friendship.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [
          {
            requesterId: userId,
            ...(filter && {
              addressee: {
                name: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
            }),
          },
          {
            addresseeId: userId,
            ...(filter && {
              requester: {
                name: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
            }),
          },
        ],
      },
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return {
      items: models,
      total: count,
      currentPage: page,
      perPage: perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    }
  }

  async listFriendRequests(addresseeId: string): Promise<FriendShipEntity[]> {
    return this.prismaService.friendship.findMany({
      where: {
        addresseeId,
        status: 'PENDING',
      },
    })
  }

  async listFriendsBlocked(userId: string): Promise<FriendShipEntity[]> {
    return this.prismaService.friendship.findMany({
      where: {
        addresseeId: userId,
        status: 'BLOCKED',
      },
    })
  }

  async deleteFriendShip(friendShipId: string, userId: string): Promise<void> {
    await this.prismaService.friendship.deleteMany({
      where: {
        friendId: friendShipId,
        OR: [{ addresseeId: userId }, { requesterId: userId }],
        status: 'ACCEPTED',
      },
    })
  }
}
