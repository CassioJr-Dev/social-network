import { NotFoundError } from '@/shared/errors/not-found-error'
import { UserDao } from '../../dao/user.dao'
import { UserEntity } from '../../entities/user.entity'
import { UnprocessableEntityError } from '@/shared/errors/unprocessable-entity-error'

export class CreateUserService {
  constructor(private userDao: UserDao) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userDao.findUserByEmail(user.email)

    if (existingUser) {
      throw new UnprocessableEntityError('Email already exists')
    }

    return await this.userDao.createUser(user)
  }
}
