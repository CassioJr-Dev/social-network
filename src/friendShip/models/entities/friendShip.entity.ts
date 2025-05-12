import { $Enums, Friendship } from '@prisma/client'

export class FriendShipEntity implements Friendship {
  friendId: string
  requesterId: string
  addresseeId: string
  status: $Enums.FriendshipStatus
  createdAt: Date
}
