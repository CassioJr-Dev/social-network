export class UnprocessableEntityError extends Error {
  public statusCode: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'UnprocessableEntityError'
    this.statusCode = statusCode || 422
  }
}
