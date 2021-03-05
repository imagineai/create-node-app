class BaseError extends Error {
  constructor(type, statusCode, message) {
    super();
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { BaseError };
