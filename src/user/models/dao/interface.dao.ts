import { UserEntity } from '../entities/user.entity'

export interface IUserDao {
  createUser(user: UserEntity): Promise<UserEntity>
  updateUser(user: Partial<UserEntity>): Promise<UserEntity>
  findUserById(userId: string): Promise<UserEntity | null>
  findUserByEmail(email: string): Promise<UserEntity | null>
}
