/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req,
  res,
  next,
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
