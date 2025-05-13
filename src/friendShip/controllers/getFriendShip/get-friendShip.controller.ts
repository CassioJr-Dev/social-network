import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { FriendShipEntity } from '@/friendShip/models/entities/friendShip.entity'
import { FriendShipDao } from '@/friendShip/models/dao/friendShip.dao'
import { GetFriendService } from '@/friendShip/models/services/get/getFriend.service'
import { UserDao } from '@/user/models/dao/user.dao'

export class GetFriendController {
  async handle(
    friendId: string,
    userId: string,
    next: NextFunction,
  ): Promise<FriendShipEntity> {
    try {
      const getFriendService = new GetFriendService(
        new FriendShipDao(prisma),
        new UserDao(prisma),
      )
      return getFriendService.execute(friendId, userId)
    } catch (error) {
      next(error)
    }
  }
}
