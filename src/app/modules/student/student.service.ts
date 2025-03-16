import mongoose from 'mongoose';
import { Student } from './student.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllStudentFromDB = async () => {
  const studentData = await Student.find()
    .populate('user')
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return studentData;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isUserExist = await User.findOne({ id }).session(session);
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    const isStudentExist = await Student.findOne({ id }).session(session);
    if (!isStudentExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist');
    }

    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();

    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const StudentService = {
  getAllStudentFromDB,
  deleteStudentFromDB,
};
