export interface AppError {
  message: string;
  statusCode?: number;
  code?: string;
}

export function normalizeError(error: unknown): AppError {
  if (typeof error === "string") {
    return { message: error };
  }

  if (error && typeof error === "object") {
    const err = error as {
      response?: { data?: { message?: string }; status?: number };
      message?: string;
      statusCode?: number;
    };
    if (err.response?.data?.message) {
      return {
        message: err.response.data.message,
        statusCode: err.response.status,
      };
    }
    if (err.message) {
      return {
        message: err.message,
        statusCode: err.statusCode || 500,
      };
    }
  }

  return { message: "An unexpected error occurred. Please try again." };
}
