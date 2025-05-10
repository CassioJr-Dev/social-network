import prisma from '../../../shared/config/database/prisma.service'
import { UserDao } from '../../models/dao/user.dao'
import { UserEntity } from '../../models/entities/user.entity'
import { GetUserService } from '../../models/services/get/getUser.service'
import { NextFunction } from 'express'

export class GetUserController {
  async handle(userId: string, next: NextFunction): Promise<UserEntity> {
    try {
      const getUserService = new GetUserService(new UserDao(prisma))
      return getUserService.execute(userId)
    } catch (error) {
      next(error)
    }
  }
}
