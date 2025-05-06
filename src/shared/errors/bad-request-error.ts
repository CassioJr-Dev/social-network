export class BadRequestError extends Error {
  public statusCode: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = statusCode || 400
  }
}
