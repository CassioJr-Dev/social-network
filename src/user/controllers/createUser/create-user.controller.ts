import { CreateUserDto } from '@/user/dtos/create.user.dto'
import { UserEntity } from '@/user/models/entities/user.entity'
import { CreateUserService } from '@/user/models/services/create/createUser.service'
import { $Enums } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const createdAt = new Date()
    const status = $Enums.UserStatus.ACTIVE
    const userId = randomUUID()

    const createUser = await this.createUserService.execute(
      Object.assign(new UserEntity(), createUserDto, {
        userId,
        createdAt,
        status,
      }),
    )
    return createUser
  }
}
