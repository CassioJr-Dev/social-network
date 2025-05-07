import { UserEntity } from '../../entities/user.entity'
import { UnprocessableEntityError } from '@/shared/errors/unprocessable-entity-error'
import { IUserDao } from '../../dao/interface.dao'

export class CreateUserService {
  constructor(private userDao: IUserDao) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userDao.findUserByEmail(user.email)

    if (existingUser) {
      throw new UnprocessableEntityError('Email already exists')
    }

    return this.userDao.createUser(user)
  }
}
