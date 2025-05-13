import { FriendShipDao } from '@/friendShip/models/dao/friendShip.dao'
import { FriendShipEntity } from '@/friendShip/models/entities/friendShip.entity'
import { SearchFriendsService } from '@/friendShip/models/services/search/searchFriends.service'
import prisma from '@/shared/config/database/prisma.service'
import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { UserDao } from '@/user/models/dao/user.dao'
import { NextFunction } from 'express'

export class SearchFriendShipController {
  async handle(
    userId: string,
    updateFriendShipDto: Partial<ISearchParams>,
    next: NextFunction,
  ): Promise<ISearchResult<FriendShipEntity>> {
    try {
      const searchFriendShipService = new SearchFriendsService(
        new FriendShipDao(prisma),
        new UserDao(prisma),
      )
      return searchFriendShipService.execute(userId, updateFriendShipDto)
    } catch (error) {
      next(error)
    }
  }
}
