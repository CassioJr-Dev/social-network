import { Router } from 'express'
import { ValidateMiddleware } from '../../shared/middlewares/validate.middleware'
import { isUUID } from 'class-validator'
import { CreateLikeDto } from '../dtos/create.like.dto'
import { CreateLikeController } from '../controllers/createLike/create-like.controller'
import { DeleteLikeController } from '../controllers/deleteLike/delete-like.controller'
import { GetAllLikesController } from '../controllers/getAllLikes/get-like.controller'

const router = Router()

router.post(
  '/like',
  ValidateMiddleware.validateDto(CreateLikeDto),
  async (req, res, next) => {
    const { body } = req

    const createLikeController = new CreateLikeController()
    const result = await createLikeController.handle(body, next)
    res.status(201).json(result)
  },
)

router.delete('/like/:likeId/:postId', async (req, res, next) => {
  const { params } = req

  if (!isUUID(params.likeId) || !isUUID(params.postId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const deleteLikeController = new DeleteLikeController()
  await deleteLikeController.handle(params.likeId, params.postId, next)
  res.status(204).send()
})

router.get('/like/:postId', async (req, res, next) => {
  const { params } = req

  if (!isUUID(params.postId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const getAllLikesController = new GetAllLikesController()
  const result = await getAllLikesController.handle(params.postId, next)
  res.status(200).json(result)
})

export default router
