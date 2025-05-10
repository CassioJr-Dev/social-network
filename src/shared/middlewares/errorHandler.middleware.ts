import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  statusCode?: number
}

export class ErrorHandlerMiddleware {
  static errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const status = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    const name = err.name || 'Error'

    console.error(`[ERROR] ${req.method} ${req.url} - ${message}`)

    res.status(status).json({
      name,
      success: false,
      error: message,
      statusCode: status,
    })
  }
}
