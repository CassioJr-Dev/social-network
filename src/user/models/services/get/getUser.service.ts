import { NotFoundError } from '@/shared/errors/not-found-error'
import { UserDao } from '../../dao/user.dao'
import { UserEntity } from '../../entities/user.entity'

export class GetUserService {
  constructor(private userDao: UserDao) {}

  async execute(userId: string): Promise<UserEntity> {
    const user = await this.userDao.findUserById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }
}
