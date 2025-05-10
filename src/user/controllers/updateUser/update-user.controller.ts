import prisma from "@/shared/config/database/prisma.service"
import { AdapterHashProvider } from "@/shared/services/passwordHash.service"
import { UpdateUserDto } from "@/user/dtos/update.user.dto"
import { UserDao } from "@/user/models/dao/user.dao"
import { UserEntity } from "@/user/models/entities/user.entity"
import { UpdateUserService } from "@/user/models/services/update/updateUser.service"
import { NextFunction } from "express"


export class UpdateUserController {
  async handle(userId: string, updateUserDto: UpdateUserDto, next: NextFunction): Promise<UserEntity> {
    try {
      const updateUserService = new UpdateUserService(
        new UserDao(prisma),
        new AdapterHashProvider(),
      )
      return updateUserService.execute(userId, updateUserDto)
    } catch (error) {
      next(error)
    }
  }
}
