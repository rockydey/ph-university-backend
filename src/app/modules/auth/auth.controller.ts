import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePasswordIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const AuthController = {
  userLogin,
  changePassword,
};
