import { $Enums } from '@prisma/client'

import {
  IsDate,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class CreateUserDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  privacy: $Enums.Privacy
}
