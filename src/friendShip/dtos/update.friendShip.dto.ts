import { $Enums } from '@prisma/client'
import { IsIn, IsNotEmpty, IsString } from 'class-validator'
export class UpdateFriendShipDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([$Enums.FriendshipStatus.ACCEPTED, $Enums.FriendshipStatus.BLOCKED], {
    message: 'status must be a valid value: ACCEPTED OR BLOCKED.',
  })
  status: $Enums.FriendshipStatus
}
