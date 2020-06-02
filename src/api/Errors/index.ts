export class ValidationError extends Error {
  public name: string;
  public status: number;
  public message: string;

  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
    this.status = 400;
  }
}

export class NotFoundError extends Error {
  public name: string;
  public status: number;
  public message: string;

  constructor() {
    super();
    this.name = 'NotFoundError';
    this.message = 'User Not Found';
    this.status = 404;
  }
}

export class InternalServerError extends Error {
  public name: string;
  public status: number;
  public message: string;

  constructor() {
    super();
    this.name = 'InternalServerError';
    this.message = 'Internal Server Error';
    this.status = 500;
  }
}

export class DataBaseError extends Error {
  public name: string;
  public status: number;
  public message: string;

  constructor() {
    super();
    this.name = 'DataBaseError';
    this.message = 'Internal Server Error';
    this.status = 500;
  }
}
