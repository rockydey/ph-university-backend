/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder<TAdmin>(
    Admin.find().populate('user'),
    query,
  )
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.queryModel;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id).populate('user');

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isUserExist = await Admin.isUserExists(id);
    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty doesn't exist");
    }

    const deleteFaculty = await Admin.findByIdAndUpdate(
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

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...adminData } = payload;

  const isUserExist = await Admin.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty doesn't exists!");
  }

  const modifiedAdminData: Record<string, unknown> = {
    ...adminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedAdminData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedAdminData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const AdminService = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB,
};
