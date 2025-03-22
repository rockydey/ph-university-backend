import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';
import httpStatus from 'http-status';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are fetched successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
};
