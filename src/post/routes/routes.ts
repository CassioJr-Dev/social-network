import { Router } from 'express'
import { ValidateMiddleware } from '../../shared/middlewares/validate.middleware'
import { isUUID } from 'class-validator'
import { CreatePostDto } from '../dtos/create.post.dto'
import { CreatePostController } from '../controllers/createPost/create-post.controller'
import { UpdatePostDto } from '../dtos/update.post.dto'
import { UpdatePostController } from '../controllers/updatePost/update-post.controller'
import { DeletePostController } from '../controllers/deletePost/delete-post.controller'
import { SearchPostController } from '../controllers/searchPost/search-post.controller'
import { GetPostController } from '../controllers/getPost/get-post.controller'
import { ValidateQueryParamsMiddleware } from '@/shared/middlewares/validateQueryParams.middleware'
import { SearchParamsDto } from '@/shared/dtos/searchParams.dto'

const router = Router()

router.post(
  '/post/:userId',
  ValidateMiddleware.validateDto(CreatePostDto),
  async (req, res, next) => {
    const { body, params } = req

    if (!isUUID(params.userId)) {
      res.status(400).json({ error: 'invalid id' })
      return
    }

    const createPostController = new CreatePostController()
    const result = await createPostController.handle(params.userId, body, next)
    res.status(201).json(result)
  },
)

router.put(
  '/post/:userId/:postId',
  ValidateMiddleware.validateDto(UpdatePostDto),
  async (req, res, next) => {
    const { body, params } = req

    if (!isUUID(params.userId) || !isUUID(params.postId)) {
      res.status(400).json({ error: 'invalid id' })
      return
    }

    const updatePostController = new UpdatePostController()
    const result = await updatePostController.handle(
      params.userId,
      params.postId,
      body,
      next,
    )
    res.status(200).json(result)
  },
)

router.delete('/post/:userId/:postId', async (req, res, next) => {
  const { params } = req

  if (!isUUID(params.userId) || !isUUID(params.postId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const deletePostController = new DeletePostController()
  await deletePostController.handle(params.userId, params.postId, next)
  res.status(204).send()
})

router.get('/post/:postId', async (req, res, next) => {
  const { params } = req

  if (!isUUID(params.postId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const getPostController = new GetPostController()
  const result = await getPostController.handle(params.postId, next)
  res.status(200).json(result)
})

router.get(
  '/post/search/:authorId',
  ValidateQueryParamsMiddleware.validateDto(SearchParamsDto),
  async (req, res, next) => {
    const { params } = req

    if (!isUUID(params.authorId)) {
      res.status(400).json({ error: 'invalid id' })
      return
    }

    const searchPostController = new SearchPostController()
    const result = await searchPostController.handle(
      params.authorId,
      (req as any).validatedQuery,
      next,
    )
    res.status(200).json(result)
  },
)

export default router
