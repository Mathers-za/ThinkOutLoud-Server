export interface iCustomError extends Error {
  name: string;
  status: number;
}

export default class CustomError extends Error implements iCustomError {
  constructor(
    public name: string,
    public message: string,
    public status: number
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
