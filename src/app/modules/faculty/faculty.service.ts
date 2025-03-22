/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder<TFaculty>(
    Faculty.find()
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      })
      .populate('user'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.queryModel;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id)
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('user');

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isUserExist = await Faculty.isUserExists(id);

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty doesn't exist");
    }

    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    const userId = deleteFaculty.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();

    return deleteFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(error);
  } finally {
    session.endSession();
  }
};

export const FacultyService = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
};
