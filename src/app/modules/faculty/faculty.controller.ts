import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyService } from './faculty.service';
import httpStatus from 'http-status';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieved successfully',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
};
