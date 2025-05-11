import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { SearchParamsDto } from '../dtos/searchParams.dto'
import { validate } from 'class-validator'

export class ValidateQueryParamsMiddleware {
  static validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const queryObj: unknown[] = plainToInstance(dtoClass, req.query)
      const errors = await validate(queryObj, { whitelist: true })

      if (errors.length > 0) {
        res.status(400).json({
          errors: errors.map(err => ({
            property: err.property,
            constraints: err.constraints,
          })),
        })
        return
      }

      ;(req as any).validatedQuery = queryObj

      next()
    }
  }
}
