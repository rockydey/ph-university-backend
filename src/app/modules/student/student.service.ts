import mongoose from 'mongoose';
import { Student } from './student.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

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

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...studentData } = payload;

  const modifiedStudentData: Record<string, unknown> = {
    ...studentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { id },
    modifiedStudentData,
    { new: true, runValidators: true },
  );
  return updatedStudent;
};

export const StudentService = {
  getAllStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
