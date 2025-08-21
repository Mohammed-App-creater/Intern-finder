import { Request, Response, NextFunction } from 'express';

// Custom error interface to extend Error
interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

// Global error handler middleware
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error values
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error for debugging (stack always logged)
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode,
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    message = 'Invalid input data';
  } else if (err.name === 'UnauthorizedError') {
    message = 'Authentication failed';
  } else if (err.name === 'NotFoundError') {
    message = 'Resource not found';
  }

  // Send error response WITHOUT stack
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
};

// Helper function to create custom errors
export const createError = (
  statusCode: number,
  message: string,
  code?: string
): CustomError => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  if (code) error.code = code;
  return error;
};

export default errorHandler;
