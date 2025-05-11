import { UserEntity } from '../../entities/user.entity'
import { UnprocessableEntityError } from '../../../../shared/errors/unprocessable-entity-error'
import { IUserDao } from '../../dao/interface.dao'
import { AdapterHashProvider } from '../../../../shared/services/passwordHash.service'
import { $Enums } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export type CreateUserType = {
  name: string
  email: string
  password: string
  birthDate?: Date
  profilePicture?: string
}

export class CreateUserService {
  constructor(
    private userDao: IUserDao,
    private hashProvider: AdapterHashProvider,
  ) {}

  async execute(user: CreateUserType): Promise<UserEntity> {
    try {
      const existingUser = await this.userDao.findUserByEmail(user.email)

      if (existingUser) {
        throw new UnprocessableEntityError('Email already exists')
      }

      const createdAt = new Date()
      const status = $Enums.UserStatus.ACTIVE
      const privacy = $Enums.Privacy.PUBLIC
      const userId = randomUUID()

      const hashedPassword = await this.hashProvider.generateHash(user.password)

      user.password = hashedPassword

      if (user.birthDate) {
        user.birthDate = new Date(user.birthDate)
      }

      const createdUser = await this.userDao.createUser(
        Object.assign(new UserEntity(), user, {
          userId,
          createdAt,
          status,
          privacy,
        }),
      )

      delete createdUser.password

      return createdUser
    } catch (error) {
      throw error
    }
  }
}
