import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { UserDao } from '../../dao/user.dao'

export class DeleteUserService {
  constructor(private userDao: UserDao) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userDao.findUserById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    await this.userDao.deleteUser(userId)
  }
}
