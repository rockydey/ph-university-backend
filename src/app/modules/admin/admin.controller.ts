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

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getSingleAdminFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.deleteAdminFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  const result = await AdminService.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully!',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
