import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
        }

        const role = (decoded as JwtPayload)?.role;
        if (requiredRole.length && !requiredRole.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
