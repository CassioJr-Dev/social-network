import { NotFoundError } from '@/shared/errors/not-found-error'
import { UserDao } from '../../dao/user.dao'
import { UserEntity } from '../../entities/user.entity'
import { BadRequestError } from '@/shared/errors/bad-request-error'

export class UpdateUserService {
  constructor(private userDao: UserDao) {}

  async execute(user: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.userDao.findUserById(user.userId)

    const hasAtLeastOneProperty = this.hasAtLeastOneProperty(user)

    if (!hasAtLeastOneProperty) {
      throw new BadRequestError('At least one property must be provided')
    }

    if (!existingUser) {
      throw new NotFoundError('User not found')
    }

    return await this.userDao.updateUser(user)
  }

  private hasAtLeastOneProperty(obj: Partial<UserEntity>): boolean {
    const { userId, ...rest } = obj
    return Object.values(rest).some(value => value !== undefined)
  }
}
