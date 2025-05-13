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

  findFriendShip(
    requesterId: string,
    addresseeId: string,
  ): Promise<FriendShipEntity | null>

  findFriendShipById(
    friendId: string,
    userId: string,
  ): Promise<FriendShipEntity | null>
  searchFriends(
    userId: string,
    props: ISearchParams,
  ): Promise<ISearchResult<FriendShipEntity>>

  listFriendsBlocked(userId: string): Promise<FriendShipEntity[]>

  listFriendRequests(addresseeId: string): Promise<FriendShipEntity[]>

  deleteFriendShip(friendId: string, userId: string): Promise<void>
}
