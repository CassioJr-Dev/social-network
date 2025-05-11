import { UserDao } from '../../models/dao/user.dao'
import { CreateUserDto } from '../../dtos/create.user.dto'
import { UserEntity } from '../../models/entities/user.entity'
import { CreateUserService } from '../../models/services/create/createUser.service'
import { $Enums } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AdapterHashProvider } from '../../../shared/services/passwordHash.service'
import prisma from '../../../shared/config/database/prisma.service'
import { NextFunction } from 'express'

export class CreateUserController {
  async handle(
    createUserDto: CreateUserDto,
    next: NextFunction,
  ): Promise<UserEntity> {
    try {
      const createUserService = new CreateUserService(
        new UserDao(prisma),
        new AdapterHashProvider(),
      )

      return createUserService.execute(createUserDto)
    } catch (error) {
      next(error)
    }
  }
}
