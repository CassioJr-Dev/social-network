import { $Enums, Friendship } from '@prisma/client'

export class FriendShip implements Friendship {
  friendId: string
  requesterId: string
  addresseeId: string
  status: $Enums.FriendshipStatus
  createdAt: Date
}
