import { UpdateUserDto } from 'user/dtos/update.user.dto'
import { UserEntity } from '../../models/entities/user.entity'
import { UpdateUserService } from 'user/models/services/update/updateUser.service'
import { UserDao } from 'user/models/dao/user.dao'
import prisma from 'shared/config/database/prisma.service'
import { AdapterHashProvider } from 'shared/services/passwordHash.service'

export class UpdateUserController {
  async handle(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const updateUserService = new UpdateUserService(
      new UserDao(prisma),
      new AdapterHashProvider(),
    )
    return updateUserService.execute(updateUserDto)
  }
}
