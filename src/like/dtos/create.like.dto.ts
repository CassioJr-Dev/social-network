import { $Enums } from '@prisma/client'

import { IsIn, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  postId: string
}
