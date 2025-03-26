import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academic-department/academic-department.model';
import { AcademicFaculty } from '../academic-faculty/academic.faculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semester-registration/semester.registration.model';
import { TOfferedCourse } from './offered.course.interface';
import { OfferedCourse } from './offered.course.model';
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    faculty,
    course,
    section,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }

  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${isAcademicDepartmentExists.name} is not belong to ${isAcademicFacultyExists.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists
  const isOfferedCourseWithSameSectionWithSameRegisteredSemesterExists =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isOfferedCourseWithSameSectionWithSameRegisteredSemesterExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exists`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
