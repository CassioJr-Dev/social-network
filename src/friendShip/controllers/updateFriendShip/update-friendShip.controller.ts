import { UpdateFriendShipDto } from '@/friendShip/dtos/update.friendShip.dto'
import { FriendShipDao } from '@/friendShip/models/dao/friendShip.dao'
import { FriendShipEntity } from '@/friendShip/models/entities/friendShip.entity'
import { UpdateStatusFriendShipService } from '@/friendShip/models/services/update/updateStatusFriendShip.service'
import prisma from '@/shared/config/database/prisma.service'
import { UserDao } from '@/user/models/dao/user.dao'
import { NextFunction } from 'express'

/**
 *cjbakfalkclkalcaçlcnçl
 */
export class UpdateFriendShipController {
  async handle(
    friendId: string,
    userId: string,
    updateFriendShipDto: UpdateFriendShipDto,
    next: NextFunction,
  ): Promise<FriendShipEntity> {
    try {
      const updateFriendShipService = new UpdateStatusFriendShipService(
        new FriendShipDao(prisma),
        new UserDao(prisma),
      )
      return updateFriendShipService.execute(
        friendId,
        userId,
        updateFriendShipDto.status,
      )
    } catch (error) {
      next(error)
    }
  }
}
