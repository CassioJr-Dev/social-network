import { $Enums } from '@prisma/client'
import {
  IsDate,
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

  @IsDate()
  @IsOptional()
  birthDate: Date | null

  @IsString()
  @IsOptional()
  profilePicture: string | null

  @MaxLength(6)
  @IsIn([$Enums.Privacy], {
    message: 'privacy must be a valid value: PUBLIC OR PRIVATE.',
  })
  @IsNotEmpty()
  @IsNotEmpty()
  privacy: $Enums.Privacy
}
