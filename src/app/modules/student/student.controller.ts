import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentService } from './student.service';
import httpStatus from 'http-status';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
};
