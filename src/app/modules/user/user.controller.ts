import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
