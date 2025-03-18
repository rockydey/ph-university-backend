/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { TErrorSources } from '../interface/error.interface';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/HandleZodError';
import handleValidationError from '../errors/HandleValidationError';
import handleCastError from '../errors/HandleCastError';
import handleDuplicateError from '../errors/HandleDuplicateError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = error.message || 'Something went wrong!';
  let statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? error?.stack : undefined,
  });
  return;
};

export default globalErrorHandler;
