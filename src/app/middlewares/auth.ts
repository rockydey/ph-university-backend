import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;

    const user = await User.isUserExists(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'User has been deleted');
    }

    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User has been blocked');
    }

    if (
      user.passwordChangedAt &&
      (await User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    }

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    }

    req.user = decoded as JwtPayload;
    next();

    // jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decoded) {
    //     if (err) {
    //       throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    //     }

    //     const role = (decoded as JwtPayload)?.role;
    //     if (requiredRole.length && !requiredRole.includes(role)) {
    //       throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
    //     }

    //     req.user = decoded as JwtPayload;
    //     next();
    //   },
    // );
  });
};

export default auth;
