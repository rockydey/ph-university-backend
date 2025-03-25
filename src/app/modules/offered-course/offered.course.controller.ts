import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { OfferedCourseService } from './offered.course..service';
import sendResponse from '../../utils/sendResponse';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
};
