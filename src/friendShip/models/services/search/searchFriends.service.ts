import { NotFoundError } from '../../../../shared/errors/not-found-error'
import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { IUserDao } from '@/user/models/dao/interfaceUser.dao'
import { $Enums, UserStatus } from '@prisma/client'
import { ForbiddenError } from '@/shared/errors/forbidden-error'
import { IFriendShipDao } from '../../dao/interfaceFriendShip.dao'
import { FriendShipEntity } from '../../entities/friendShip.entity'

export class SearchFriendsService {
  constructor(
    private friendShipDao: IFriendShipDao,
    private userDao: IUserDao,
  ) {}

  async execute(
    userId: string,
    props: ISearchParams,
  ): Promise<ISearchResult<FriendShipEntity>> {
    try {
      const user = await this.userDao.findUserById(userId)

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

      const friends = await this.friendShipDao.searchFriends(userId, props)

      return friends
    } catch (error) {
      throw error
    }
  }
}
