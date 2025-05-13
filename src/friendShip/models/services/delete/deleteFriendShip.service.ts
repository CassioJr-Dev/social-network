import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { ForbiddenError } from '@/shared/errors/forbidden-error'
import { $Enums, UserStatus } from '@prisma/client'
import { IFriendShipDao } from '../../dao/interfaceFriendShip.dao'

export class DeleteFriendShipService {
  constructor(
    private friendShipDao: IFriendShipDao,
    private userDao: IUserDao,
  ) {}

  async execute(userId: string, friendId: string): Promise<void> {
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

      await this.friendShipDao.deleteFriendShip(friendId, userId)
    } catch (error) {
      throw error
    }
  }
}
