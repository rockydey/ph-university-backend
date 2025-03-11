/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = error.message || 'Something went wrong';

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    error,
  });
  return;
};

export default globalErrorHandler;
