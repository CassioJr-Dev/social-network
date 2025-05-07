import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { UserEntity } from '../../entities/user.entity'
import { BadRequestError } from '../../../../shared/errors/bad-request-error'
import { UnprocessableEntityError } from '../../../../shared/errors/unprocessable-entity-error'
import { IUserDao } from '../../dao/interface.dao'

export class UpdateUserService {
  constructor(private userDao: IUserDao) {}

  async execute(user: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.userDao.findUserById(user.userId)

    const hasAtLeastOneProperty = this.hasAtLeastOneProperty(user)

    if (!hasAtLeastOneProperty) {
      throw new BadRequestError('At least one property must be provided')
    }

    if (!existingUser) {
      throw new NotFoundError('User not found')
    }

    if (user.email) {
      const existingUserWithEmail = await this.userDao.findUserByEmail(
        user.email,
      )

      if (
        existingUserWithEmail &&
        existingUserWithEmail.userId !== user.userId
      ) {
        throw new UnprocessableEntityError('Email already exists')
      }

      if (
        existingUserWithEmail &&
        existingUserWithEmail.userId === user.userId
      ) {
        throw new BadRequestError('Email already in use')
      }
    }

    if (user.password) {
      if (existingUser.password === user.password) {
        throw new UnprocessableEntityError('Password already in use')
      }
    }
    return await this.userDao.updateUser(user)
  }

  private hasAtLeastOneProperty(obj: Partial<UserEntity>): boolean {
    const { userId, ...rest } = obj
    return Object.values(rest).some(value => value !== undefined)
  }
}
