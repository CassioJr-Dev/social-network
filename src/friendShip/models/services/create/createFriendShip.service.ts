import { $Enums, UserStatus } from '@prisma/client'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { randomUUID } from 'node:crypto'
import { ForbiddenError } from '@/shared/errors/forbidden-error'
import { IFriendShipDao } from '../../dao/interfaceFriendShip.dao'
import { FriendShipEntity } from '../../entities/friendShip.entity'
import { BadRequestError } from '@/shared/errors/bad-request-error'

export type CreateFriendShipType = {
  requesterId: string
  addresseeId: string
}

export class CreateFriendShipService {
  constructor(
    private friendShipDao: IFriendShipDao,
    private userDao: IUserDao,
  ) {}

  async execute(friendShip: CreateFriendShipType): Promise<FriendShipEntity> {
    try {
      const [requester, addressee, findFriendShip] = await Promise.all([
        this.userDao.findUserById(friendShip.requesterId),
        this.userDao.findUserById(friendShip.addresseeId),
        this.friendShipDao.findFriendShip(
          friendShip.requesterId,
          friendShip.addresseeId,
        ),
      ])

      if (!requester || !addressee) {
        throw new NotFoundError(
          `${requester ? 'Addressee' : 'Requester'} not found`,
        )
      }
      const inactiveStatuses: UserStatus[] = [
        $Enums.UserStatus.INACTIVE,
        $Enums.UserStatus.BLOCKED,
      ]

      if (
        inactiveStatuses.includes(requester.status) ||
        inactiveStatuses.includes(addressee.status)
      ) {
        throw new ForbiddenError(
          `${requester ? 'Addressee' : 'Requester'} is ${[
            requester?.status,
            addressee?.status,
          ].join(', ')}`,
        )
      }

      if (findFriendShip) {
        throw new BadRequestError('Friendship already exists')
      }
      const friendId = randomUUID()
      const createdAt = new Date()
      const status = $Enums.FriendshipStatus.PENDING

      const newFriendShip = Object.assign(new FriendShipEntity(), {
        friendId,
        requesterId: friendShip.requesterId,
        addresseeId: friendShip.addresseeId,
        status,
        createdAt,
      })

      const createdFriendShip =
        await this.friendShipDao.createFriendShip(newFriendShip)
      return createdFriendShip
    } catch (error) {
      throw error
    }
  }
}
