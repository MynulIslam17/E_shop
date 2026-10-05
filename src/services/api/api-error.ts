export class ApiError extends Error {
  public statusCode: number;
  public errors?: Record<string, string[]>;
  public isNetworkError: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: Record<string, string[]>,
    isNetworkError: boolean = false
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isNetworkError = isNetworkError;
  }
}
