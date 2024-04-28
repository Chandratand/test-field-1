export class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export class BadRequestError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
