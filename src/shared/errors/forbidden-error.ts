export class ForbiddenError extends Error {
  public statusCode: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'ForbiddenError'
    this.statusCode = statusCode || 403
  }
}
