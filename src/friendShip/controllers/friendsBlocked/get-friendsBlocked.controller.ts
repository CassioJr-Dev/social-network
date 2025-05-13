import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { FriendShipEntity } from '@/friendShip/models/entities/friendShip.entity'
import { FriendShipDao } from '@/friendShip/models/dao/friendShip.dao'
import { UserDao } from '@/user/models/dao/user.dao'
import { FindAllFriendsBlockedService } from '@/friendShip/models/services/friendsBlocked/findallFriendsBlocked.service'

export class GetFriendsBlockedController {
  async handle(
    userId: string,
    next: NextFunction,
  ): Promise<FriendShipEntity[]> {
    try {
      const getFriendsBlockedService = new FindAllFriendsBlockedService(
        new FriendShipDao(prisma),
        new UserDao(prisma),
      )
      return getFriendsBlockedService.execute(userId)
    } catch (error) {
      next(error)
    }
  }
}
