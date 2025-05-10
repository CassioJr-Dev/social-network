import { PrismaClient } from '@prisma/client'
import { UserEntity } from '../entities/user.entity'
import { IUserDao } from './interface.dao'

export class UserDao implements IUserDao {
  constructor(private prismaService: PrismaClient) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({
      data: user,
    })
  }

  async updateUser(user: Partial<UserEntity>): Promise<UserEntity> {
    const update = await this.prismaService.user.update({
      data: user,
      where: {
        userId: user.userId,
      },
    })

    return update
  }

  async findUserById(userId: string): Promise<UserEntity | null> {
    return await this.prismaService.user.findUnique({
      where: {
        userId,
      },
    })
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })
  }

  async deleteUser(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        userId,
      },
    })
  }
}
