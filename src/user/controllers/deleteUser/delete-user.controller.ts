import prisma from 'shared/config/database/prisma.service'
import { UserDao } from 'user/models/dao/user.dao'
import { DeleteUserService } from 'user/models/services/delete/deleteUser.service'

export class DeleteUserController {
  async handle(userId: string): Promise<void> {
    const deleteUserService = new DeleteUserService(new UserDao(prisma))
    await deleteUserService.execute(userId)
  }
}
