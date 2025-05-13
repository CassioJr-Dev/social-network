import { IFriendShipDao } from '../../dao/interfaceFriendShip.dao'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { FriendShipEntity } from '../../entities/friendShip.entity'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { $Enums, UserStatus } from '@prisma/client'
import { ForbiddenError } from '@/shared/errors/forbidden-error'

export class FindAllFriendRequestsService {
  constructor(
    private friendShipDao: IFriendShipDao,
    private userDao: IUserDao,
  ) {}

  async execute(userId: string): Promise<FriendShipEntity[]> {
    try {
      const [user, friendRequests] = await Promise.all([
        this.userDao.findUserById(userId),
        this.friendShipDao.listFriendRequests(userId),
      ])

      if (!user) {
        throw new NotFoundError('User not found')
      }

      const inactiveStatuses: UserStatus[] = [
        $Enums.UserStatus.INACTIVE,
        $Enums.UserStatus.BLOCKED,
      ]

      if (inactiveStatuses.includes(user.status)) {
        throw new ForbiddenError(`User is ${user.status}`)
      }

      return friendRequests
    } catch (error) {
      throw error
    }
  }
}
