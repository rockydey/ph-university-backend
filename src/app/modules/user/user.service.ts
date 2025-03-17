import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academic-semester/academic.semester.interface';
import { AcademicSemester } from '../academic-semester/academic.semester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { getStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.academicSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await getStudentId(admissionSemester as TAcademicSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserService = {
  createStudentIntoDB,
};
