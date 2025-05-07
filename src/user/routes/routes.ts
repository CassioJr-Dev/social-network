import { Router } from 'express'
import { CreateUserController } from '../controllers/createUser/create-user.controller'
import { CreateUserService } from '../models/services/create/createUser.service'
import { UserDao } from '../models/dao/user.dao'
import { ValidateMiddleware } from '../../shared/middlewares/validate.middleware'
import { CreateUserDto } from '../dtos/create.user.dto'
import prisma from '../../shared/config/database/prisma.service'

const router = Router()

router.post(
  '/user',
  ValidateMiddleware.validateDto(CreateUserDto),
  async (req, res) => {
    const createUserController = new CreateUserController(
      new CreateUserService(new UserDao(prisma)),
    )
    const result = await createUserController.handle(req.body)
    res.status(201).json(result)
  },
)

export default router
