/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { TErrorSource } from '../interface/error.interface';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/HandleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = error.message || 'Something went wrong!';
  let statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === 'development' ? error?.stack : undefined,
  });
  return;
};

export default globalErrorHandler;
