import { Router } from 'express'
import { CreateUserController } from '../controllers/createUser/create-user.controller'
import { ValidateMiddleware } from '../../shared/middlewares/validate.middleware'
import { CreateUserDto } from '../dtos/create.user.dto'
import { UpdateUserDto } from '../dtos/update.user.dto'
import { UpdateUserController } from '../controllers/updateUser/update-user.controller'
import { DeleteUserController } from '../controllers/deleteUser/delete-user.controller'
import { GetUserController } from '../controllers/getUser/get-user.controller'
import { isUUID } from 'class-validator'

const router = Router()

router.post(
  '/user',
  ValidateMiddleware.validateDto(CreateUserDto),
  async (req, res, next) => {
    const createUserController = new CreateUserController()
    const result = await createUserController.handle(req.body, next)
    res.status(201).json(result)
  },
)

router.put(
  '/user/:id',
  ValidateMiddleware.validateDto(UpdateUserDto),
  async (req, res, next) => {
    const { body, params } = req

    if (!isUUID(params.id)) {
      res.status(400).json({ error: 'invalid id' })
      return
    }

    const updateUserController = new UpdateUserController()
    const result = await updateUserController.handle(params.id, body, next)
    res.status(200).json(result)
  },
)

router.delete('/user/:id', async (req, res, next) => {
  const { params } = req

  if (!isUUID(params.id)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const deleteUserController = new DeleteUserController()
  await deleteUserController.handle(params.id, next)
  res.status(204).send()
})

router.get('/user/:id', async (req, res, next) => {
  const { params } = req

  if (!isUUID(params.id)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const getUserController = new GetUserController()
  const result = await getUserController.handle(params.id, next)
  res.status(200).json(result)
})
export default router
