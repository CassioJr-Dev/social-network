import prisma from '../../../shared/config/database/prisma.service'
import { UserDao } from '../../models/dao/user.dao'
import { DeleteUserService } from '../../models/services/delete/deleteUser.service'
import { NextFunction } from 'express'

export class DeleteUserController {
  async handle(userId: string, next: NextFunction): Promise<void> {
    try {
      const deleteUserService = new DeleteUserService(new UserDao(prisma))
      await deleteUserService.execute(userId)
    } catch (error) {
      next(error)
    }
  }
}
