import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateFriendShipDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  addresseeId: string

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  requesterId: string
}

