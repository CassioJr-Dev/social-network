import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'
import { UserDao } from '@/user/models/dao/user.dao'
import { CreateFriendShipService } from '@/friendShip/models/services/create/createFriendShip.service'
import { FriendShipDao } from '@/friendShip/models/dao/friendShip.dao'
import { CreateFriendShipDto } from '@/friendShip/dtos/create.friendShip.dto'
import { FriendShipEntity } from '@/friendShip/models/entities/friendShip.entity'

export class CreateFriendShipController {
  async handle(
    createFriendShipDto: CreateFriendShipDto,
    next: NextFunction,
  ): Promise<FriendShipEntity> {
    try {
      const createFriendShipService = new CreateFriendShipService(
        new FriendShipDao(prisma),
        new UserDao(prisma),
      )

      return createFriendShipService.execute(createFriendShipDto)
    } catch (error) {
      next(error)
    }
  }
}
