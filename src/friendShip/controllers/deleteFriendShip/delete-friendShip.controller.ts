import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { UserDao } from '@/user/models/dao/user.dao'
import { FriendShipDao } from '@/friendShip/models/dao/friendShip.dao'
import { DeleteFriendShipService } from '@/friendShip/models/services/delete/deleteFriendShip.service'

export class DeleteFriendShipController {
  async handle(
    userId: string,
    friendId: string,
    next: NextFunction,
  ): Promise<void> {
    try {
      const deleteFriendShipService = new DeleteFriendShipService(
        new FriendShipDao(prisma),
        new UserDao(prisma),
      )
      await deleteFriendShipService.execute(userId, friendId)
    } catch (error) {
      next(error)
    }
  }
}
