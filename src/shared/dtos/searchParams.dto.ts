import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator'
import { Type } from 'class-transformer'

export class SearchParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage?: number

  @IsOptional()
  @IsIn(['createdAt', 'title'])
  sort?: string

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDir?: string

  @IsOptional()
  @IsString()
  filter?: string
}
