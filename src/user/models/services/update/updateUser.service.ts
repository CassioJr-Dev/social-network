import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { UserEntity } from '../../entities/user.entity'
import { BadRequestError } from '../../../../shared/errors/bad-request-error'
import { UnprocessableEntityError } from '../../../../shared/errors/unprocessable-entity-error'
import { IUserDao } from '../../dao/interface.dao'
import { AdapterHashProvider } from '../../../../shared/services/passwordHash.service'

export class UpdateUserService {
  constructor(
    private userDao: IUserDao,
    private hashProvider: AdapterHashProvider,
  ) {}

  async execute(
    userId: string,
    userEntity: Partial<UserEntity>,
  ): Promise<UserEntity> {
    try {
      const existingUser = await this.userDao.findUserById(userId)

      const hasAtLeastOneProperty = this.hasAtLeastOneProperty(userEntity)

      if (!hasAtLeastOneProperty) {
        throw new BadRequestError('At least one property must be provided')
      }

      if (!existingUser) {
        throw new NotFoundError('User not found')
      }

      if (userEntity.email) {
        const existingUserWithEmail = await this.userDao.findUserByEmail(
          userEntity.email,
        )

        if (existingUserWithEmail && existingUserWithEmail.userId !== userId) {
          throw new UnprocessableEntityError('Email already exists')
        }

        if (existingUserWithEmail && existingUserWithEmail.userId === userId) {
          throw new BadRequestError('Email already in use')
        }
      }

      if (userEntity.password) {
        const comparePassword = await this.hashProvider.compareHash(
          userEntity.password,
          existingUser.password,
        )

        if (comparePassword) {
          throw new UnprocessableEntityError('Password already in use')
        }

        const hashedPassword = await this.hashProvider.generateHash(
          userEntity.password,
        )

        existingUser.password = hashedPassword
      }

      if (userEntity.birthDate) {
        userEntity.birthDate = new Date(userEntity.birthDate)
      }

      const updatedUser = await this.userDao.updateUser(
        Object.assign(existingUser, userEntity),
      )
      delete updatedUser.password

      return updatedUser
    } catch (error) {
      throw error
    }
  }

  private hasAtLeastOneProperty(obj: Partial<UserEntity>): boolean {
    const { userId, ...rest } = obj
    return Object.values(rest).some(value => value !== undefined)
  }
}
