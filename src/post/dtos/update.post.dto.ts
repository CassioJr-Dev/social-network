import { $Enums } from '@prisma/client'

import {
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class UpdatePostDto {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsIn([$Enums.Privacy.PUBLIC, $Enums.Privacy.PRIVATE], {
    message: 'privacy must be a valid value: PUBLIC OR PRIVATE.',
  })
  @IsOptional()
  privacy?: $Enums.Privacy
}
