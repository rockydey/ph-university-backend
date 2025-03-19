/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists!`,
    },
  ];

  const statusCode = 409;

  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
