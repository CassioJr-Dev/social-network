import { UserEntity } from '../../entities/user.entity'
import { UnprocessableEntityError } from '../../../../shared/errors/unprocessable-entity-error'
import { IUserDao } from '../../dao/interface.dao'
import { AdapterHashProvider } from '../../../../shared/services/passwordHash.service'

export class CreateUserService {
  constructor(
    private userDao: IUserDao,
    private hashProvider: AdapterHashProvider,
  ) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    try {
      const existingUser = await this.userDao.findUserByEmail(user.email)

      if (existingUser) {
        throw new UnprocessableEntityError('Email already exists')
      }

      const hashedPassword = await this.hashProvider.generateHash(user.password)

      user.password = hashedPassword

      if (user.birthDate) {
        user.birthDate = new Date(user.birthDate)
      }

      const createdUser = await this.userDao.createUser(user)
      delete createdUser.password

      return createdUser
    } catch (error) {
      throw error
    }
  }
}
