import { FriendShipDao } from '@/friendShip/models/dao/friendShip.dao'
import { FriendShipEntity } from '@/friendShip/models/entities/friendShip.entity'
import { FindAllFriendRequestsService } from '@/friendShip/models/services/findAllRequests/findAllFriendRequests.service'
import prisma from '@/shared/config/database/prisma.service'
import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { UserDao } from '@/user/models/dao/user.dao'
import { NextFunction } from 'express'

export class FindAllRequestsController {
  async handle(
    userId: string,
    next: NextFunction,
  ): Promise<FriendShipEntity[]> {
    try {
      const findAllRequestsService = new FindAllFriendRequestsService(
        new FriendShipDao(prisma),
        new UserDao(prisma),
      )
      return findAllRequestsService.execute(userId)
    } catch (error) {
      next(error)
    }
  }
}
