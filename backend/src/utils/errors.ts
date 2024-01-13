export const errorHandler = (statusCode: number, message: string): Error => {
    const error: Error & { statusCode?: number } = new Error(message);
    error.statusCode = statusCode;
    return error;
  };