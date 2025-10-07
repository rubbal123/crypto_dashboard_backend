// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging (you can customize it)
  
  // Send a generic message for internal server errors
  res.status(500).json({
    message: 'Internal Server Error',
    // Optionally include the error message for development (do not in production)
    error: process.env.NODE_ENV === 'production' ? null : err.message,
  });
};
