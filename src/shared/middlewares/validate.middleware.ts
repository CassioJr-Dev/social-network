// middlewares/validate.ts
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

export class ValidateMiddleware {
  static validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const dtoObj = plainToInstance(dtoClass, req.body)
      const errors = await validate(dtoObj, { whitelist: true })

      if (errors.length > 0) {
        const messages = errors.map(err => ({
          property: err.property,
          errors: Object.values(err.constraints || {}),
        }))
        res.status(400).json({ errors: messages })
        return
      }

      req.body = dtoObj // corpo validado e transformado
      next()
    }
  }
}
