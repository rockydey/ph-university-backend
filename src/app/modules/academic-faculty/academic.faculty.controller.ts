import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyService } from './academic.faculty.service';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties fetched successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result =
    await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
