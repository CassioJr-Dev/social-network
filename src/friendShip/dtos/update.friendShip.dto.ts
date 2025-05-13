import { $Enums } from "@prisma/client"
import { IsIn, IsNotEmpty, IsString } from "class-validator"
export class UpdateFriendShipDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(
    [
      $Enums.FriendshipStatus.PENDING,
      $Enums.FriendshipStatus.ACCEPTED,
      $Enums.FriendshipStatus.BLOCKED,
    ],
    {
      message: 'status must be a valid value: ACTIVE, INACTIVE OR BLOCKED.',
    },
  )
  status: $Enums.FriendshipStatus
}
