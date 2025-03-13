import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentService } from './academic-department.service';
import httpStatus from 'http-status';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments fetched successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
    departmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
