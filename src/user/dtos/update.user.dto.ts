import { $Enums } from '@prisma/client'

import {
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class UpdateUserDto {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string

  @IsDateString()
  @IsOptional()
  birthDate: Date | null

  @IsString()
  @IsOptional()
  profilePicture: string | null

  @IsIn([$Enums.Privacy.PUBLIC, $Enums.Privacy.PRIVATE], {
    message: 'privacy must be a valid value: PUBLIC OR PRIVATE.',
  })
  @IsOptional()
  privacy: $Enums.Privacy

  @IsIn(
    [
      $Enums.UserStatus.ACTIVE,
      $Enums.UserStatus.INACTIVE,
      $Enums.UserStatus.BLOCKED,
    ],
    {
      message: 'status must be a valid value: ACTIVE, INACTIVE OR BLOCKED.',
    },
  )
  @IsOptional()
  status: $Enums.UserStatus
}
