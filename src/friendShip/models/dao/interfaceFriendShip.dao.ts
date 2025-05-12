import { ISearchParams, ISearchResult } from '@/shared/models/dao/searchType'
import { FriendShipEntity } from '../entities/friendShip.entity'
import { $Enums } from '@prisma/client'

export interface IFriendShipDao {
  sortableFields: string[]

  createFriendShip(friendShip: FriendShipEntity): Promise<FriendShipEntity>
  updateStatus(
    friendId: string,
    status: $Enums.FriendshipStatus,
  ): Promise<FriendShipEntity>
  findFriendShipById(friendId: string): Promise<FriendShipEntity | null>
  searchFriends(
    userId: string,
    props: ISearchParams,
  ): Promise<ISearchResult<FriendShipEntity>>

  listFriendRequests(addresseeId: string): Promise<FriendShipEntity[]>

  deleteFriendShip(friendShipId: string, userId: string): Promise<void>
}
