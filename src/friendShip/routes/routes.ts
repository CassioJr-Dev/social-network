import { Router } from 'express'
import { ValidateMiddleware } from '../../shared/middlewares/validate.middleware'
import { isUUID } from 'class-validator'
import { ValidateQueryParamsMiddleware } from '@/shared/middlewares/validateQueryParams.middleware'
import { SearchParamsDto } from '@/shared/dtos/searchParams.dto'
import { CreateFriendShipDto } from '../dtos/create.friendShip.dto'
import { CreateFriendShipController } from '../controllers/createFriendShip/create-friendShip.controller'
import { UpdateFriendShipDto } from '../dtos/update.friendShip.dto'
import { UpdateFriendShipController } from '../controllers/updateFriendShip/update-friendShip.controller'
import { DeleteFriendShipController } from '../controllers/deleteFriendShip/delete-friendShip.controller'
import { GetFriendController } from '../controllers/getFriendShip/get-friendShip.controller'
import { SearchFriendShipController } from '../controllers/searchFriendShip/search-friendShip.controller'
import { FindAllRequestsController } from '../controllers/findAllRequests/findAll-requests.controller'
import { GetFriendsBlockedController } from '../controllers/friendsBlocked/get-friendsBlocked.controller'

const router = Router()

router.post(
  '/friendShip',
  ValidateMiddleware.validateDto(CreateFriendShipDto),
  async (req, res, next) => {
    const { body } = req
    const createfriendShip = new CreateFriendShipController()
    const result = await createfriendShip.handle(body, next)
    res.status(201).json(result)
  },
)

router.put(
  '/friendShip/:userId/:friendShipId',
  ValidateMiddleware.validateDto(UpdateFriendShipDto),
  async (req, res, next) => {
    const { body, params } = req

    if (!isUUID(params.userId) || !isUUID(params.friendShipId)) {
      res.status(400).json({ error: 'invalid id' })
      return
    }

    const updateFriendShip = new UpdateFriendShipController()
    const result = await updateFriendShip.handle(
      params.friendShipId,
      params.userId,
      body,
      next,
    )
    res.status(200).json(result)
  },
)

router.delete('/friendShip/:userId/:friendShipId', async (req, res, next) => {
  const { params } = req

  if (!isUUID(params.userId) || !isUUID(params.friendShipId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const deleteFriendShip = new DeleteFriendShipController()
  await deleteFriendShip.handle(params.userId, params.friendShipId, next)
  res.status(204).send()
})

router.get('/friendShip/:userId/:friendShipId', async (req, res, next) => {
  const { params } = req
  if (!isUUID(params.userId) || !isUUID(params.friendShipId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const getFriendShip = new GetFriendController()
  const result = await getFriendShip.handle(
    params.friendShipId,
    params.userId,
    next,
  )
  res.status(200).json(result)
})

router.get('/friendShipRequests/:userId', async (req, res, next) => {
  const { params } = req
  if (!isUUID(params.userId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const findAllRequests = new FindAllRequestsController()
  const result = await findAllRequests.handle(params.userId, next)
  res.status(200).json(result)
})

router.get('/blocked/friendShip/:userId', async (req, res, next) => {
  const { params } = req
  if (!isUUID(params.userId)) {
    res.status(400).json({ error: 'invalid id' })
    return
  }

  const getFriendsBlocked = new GetFriendsBlockedController()
  const result = await getFriendsBlocked.handle(params.userId, next)
  res.status(200).json(result)
})

router.get(
  '/search/friendShip/:userId',
  ValidateQueryParamsMiddleware.validateDto(SearchParamsDto),
  async (req, res, next) => {
    const { params } = req

    if (!isUUID(params.userId)) {
      res.status(400).json({ error: 'invalid id' })
      return
    }

    const searchFriendShip = new SearchFriendShipController()
    const result = await searchFriendShip.handle(
      params.userId,
      (req as any).validatedQuery,
      next,
    )
    res.status(200).json(result)
  },
)

export default router
