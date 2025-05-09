import prisma from 'shared/config/database/prisma.service'
import { UserDao } from 'user/models/dao/user.dao'
import { UserEntity } from 'user/models/entities/user.entity'
import { GetUserService } from 'user/models/services/get/getUser.service'

export class GetUserController {
  async handle(userId: string): Promise<UserEntity> {
    const getUserService = new GetUserService(new UserDao(prisma))
    return getUserService.execute(userId)
  }
}
