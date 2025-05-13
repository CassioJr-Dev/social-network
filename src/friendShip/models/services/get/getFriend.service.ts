import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { FriendShipEntity } from '../../entities/friendShip.entity'
import { IFriendShipDao } from '../../dao/interfaceFriendShip.dao'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { $Enums, UserStatus } from '@prisma/client'
import { ForbiddenError } from '@/shared/errors/forbidden-error'

export class GetFriendService {
  constructor(
    private friendShipDao: IFriendShipDao,
    private userDao: IUserDao,
  ) {}

  async execute(friendId: string, userId: string): Promise<FriendShipEntity> {
    try {
      const [user, friendShip] = await Promise.all([
        this.userDao.findUserById(userId),
        this.friendShipDao.findFriendShipById(friendId, userId),
      ])

      if (!user) {
        throw new NotFoundError('User not found')
      }

      if (!friendShip) {
        throw new NotFoundError('Friendship not found')
      }

      const inactiveStatuses: UserStatus[] = [
        $Enums.UserStatus.INACTIVE,
        $Enums.UserStatus.BLOCKED,
      ]

      if (inactiveStatuses.includes(user.status)) {
        throw new ForbiddenError(`User is ${user.status}`)
      }

      return friendShip
    } catch (error) {
      throw error
    }
  }
}
