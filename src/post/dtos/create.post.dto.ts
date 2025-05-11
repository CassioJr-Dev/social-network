import { $Enums } from '@prisma/client'

import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreatePostDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsIn([$Enums.Privacy.PUBLIC, $Enums.Privacy.PRIVATE], {
    message: 'privacy must be a valid value: PUBLIC OR PRIVATE.',
  })
  @IsNotEmpty()
  privacy: $Enums.Privacy
}
