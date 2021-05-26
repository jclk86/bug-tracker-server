// when used in controller, this error could be handled at controller or, if a next() is added, it can be passed to app.ts errorhandler
class CustomError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export default CustomError;
